import { instance } from '@/src/server/server'
import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { enqueueSnackbar } from 'notistack'
import React, { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
    modelGroupId: yup.number().required(),
    name: yup.string().nullable().default(null)
})

interface carmodelType extends yup.InferType<typeof schema> { };

interface FromCarmodelProps {
    name: string
    type: 'add' | 'edit'
    open: boolean
    onClose: () => void
    onLoad: () => void
    modelData: ModelGroup
    data?: ModelGroup
    defultValues: carmodelType | null
}

const FromCarmodel: FC<FromCarmodelProps> = ({ name, type, open, onClose, onLoad, modelData, data, defultValues }) => {

    const [load, setLoad] = useState<boolean>(false)

    const { handleSubmit, control, reset, formState: { errors, isLoading } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defultValues || { modelGroupId: modelData.id, name: null }
    })

    const CreateCarModelApi = async (data: object): Promise<CarModel | null> => {
        const value = await sessionStorage.getItem('auth_ecu') as string
        if (value === null) return null
        const item = JSON.parse(value) as TokenApi
        const result = await instance.post('car-model', data, {
            headers: {
                Authorization: `Bearer ${item.access_token}`
            }
        }).then((res) => res.data as CarModel).catch(() => null)
        return result
    }

    const onSubmit = async (item: carmodelType) => {
        if (type === 'add') {
            setLoad(true)
            const result = await CreateCarModelApi(item).finally(() => setLoad(false))
            if (result) {
                enqueueSnackbar('Success create car mocel', {
                    variant: 'success'
                })
            } else {
                enqueueSnackbar('Cannot create car model', {
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
                                    name="name"
                                    control={control}
                                    render={({ field: { value, ...field } }) => (
                                        <TextField
                                            {...field}
                                            value={value ?? ''}
                                            label="Car name"
                                            placeholder='Car name'
                                            variant="outlined"
                                            disabled={isLoading}
                                            error={!!errors.name}
                                            helperText={errors.name ? errors.name.message : ''}
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

export default FromCarmodel
