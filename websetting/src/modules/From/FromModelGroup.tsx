import { instance } from '@/src/server/server'
import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { enqueueSnackbar } from 'notistack'
import React, { FC, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
    brandId: yup.number().required(),
    code: yup.string().nullable().default(null)
})

interface brandType extends yup.InferType<typeof schema> { };

interface FromModelGroupProps {
    name: string
    type: 'add' | 'edit'
    open: boolean
    onClose: () => void
    onLoad: () => void
    brandData: Brand
    data?: ModelGroup
    defultValues: brandType | null
}

const FromModelGroup: FC<FromModelGroupProps> = ({ name, type, open, onClose, onLoad, brandData, data, defultValues }) => {

    const [load, setLoad] = useState<boolean>(false)

    const { handleSubmit, control, reset, formState: { errors, isLoading } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defultValues || { brandId: brandData.id, code: null }
    })

    const CreateModelGroupdApi = async (data: object): Promise<ModelGroupDefault | null> => {
        const value = await sessionStorage.getItem('auth_ecu') as string
        if (value === null) return null
        const item = JSON.parse(value) as TokenApi
        const result = await instance.post('model-group', data, {
            headers: {
                Authorization: `Bearer ${item.access_token}`
            }
        }).then((res) => res.data as ModelGroupDefault).catch(() => null)
        return result
    }

    const checkModelGroup = async (item: object) => {
        const { brandId, code } = item as { brandId: number, code: string }
        const check = brandData['ModelGroup'].filter((item) => item.code === code)
        if (check.length > 0) {
            return true
        }
        return false
    }

    const onSubmit = async (item: brandType) => {

        const check = await checkModelGroup(item)
        if (check) {
            enqueueSnackbar('You have model group name', {
                variant: 'error'
            })
            stateClear()
            throw new Error('Cannot create model group')
        }
        if (type === 'add') {
            setLoad(true)
            const result = await CreateModelGroupdApi(item).finally(() => setLoad(false))
            if (result) {
                enqueueSnackbar('Success create model group', {
                    variant: 'success'
                })
            } else {
                enqueueSnackbar('Cannot create model group', {
                    variant: 'error'
                })
                throw new Error('Cannot create brand')
            }
        }
        stateClear()
    }

    const stateClear = () => {
        onLoad()
        onClose()
        reset()
    }

    return (
        <>
            <Dialog open={open} slotProps={{ paper: { sx: { borderRadius: 4 } } }} fullWidth maxWidth='sm' onClose={onClose}>
                <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>
                        {name}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container>
                            <Grid size={12} pt={2}>
                                <Controller
                                    name="code"
                                    control={control}
                                    render={({ field: { value, ...field } }) => (
                                        <TextField
                                            {...field}
                                            value={value ?? ''}
                                            // size='small'
                                            label="Model group name"
                                            placeholder='Model group name'
                                            variant="outlined"
                                            disabled={isLoading}
                                            error={!!errors.code}
                                            helperText={errors.code ? errors.code.message : ''}
                                            fullWidth
                                            required
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={isLoading} variant='outlined' color='error' sx={{ borderRadius: 3 }} onClick={onClose}>Cancel</Button>
                        <Button disabled={isLoading} sx={{ borderRadius: 3 }} variant='contained' type='submit'>{type}</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}

export default FromModelGroup
