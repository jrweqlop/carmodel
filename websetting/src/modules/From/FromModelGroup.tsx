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
import React, { FC, useState } from 'react'
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
        const result = await instance.post('model-group', data).then((res) => res.data as ModelGroupDefault).catch(() => null).finally(() => setLoad(false))
        return result
    }

    const onSubmit = async (item: brandType) => {
        if (type === 'add') {
            setLoad(true)
            const result = await CreateModelGroupdApi(item)
            if (!result) throw new Error('Cannot create brand')
            else {
                stateClear()
            }
        }
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
