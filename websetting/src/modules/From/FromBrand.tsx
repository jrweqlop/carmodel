import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import React, { FC, useState } from 'react'
import { useForm, Controller } from "react-hook-form"
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; // Import yupResolver
import Box from '@mui/material/Box'
import { instance } from '@/src/server/server'
import Grid from '@mui/material/Grid'
import { enqueueSnackbar } from 'notistack'

const schema = yup.object().shape({
    name: yup.string().nullable().default(null)
})

interface brandType extends yup.InferType<typeof schema> { };

interface FromBrandProps {
    name: string
    type: 'add' | 'edit'
    data?: Brand
    open: boolean
    onClose: () => void
    onLoad: () => void
    defultValues: brandType | null
}

const FromBrand: FC<FromBrandProps> = ({ name, type, open, data, onClose, defultValues, onLoad }) => {

    const [load, setLoad] = useState<boolean>(false)

    const { handleSubmit, control, reset, formState: { errors, isLoading, isSubmitSuccessful } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defultValues || { name: null }
    })

    const CreateBrandApi = async (data: object): Promise<BrandDefault | null> => {
        const value = await sessionStorage.getItem('auth_ecu') as string
        if (value === null) return null
        const item = JSON.parse(value) as TokenApi
        const result = await instance.post('brand', data, {
            headers: {
                Authorization: `Bearer ${item.access_token}`
            }
        }).then((res) => res.data as BrandDefault).catch(() => null).finally(() => setLoad(false))
        return result
    }

    const onSubmit = async (item: object) => {
        setLoad(true)
        if (type === 'add') {
            const result = await CreateBrandApi(item)
            if (!result) {
                enqueueSnackbar('Cannot create brand', {
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
                                            label='Brand name car'
                                            placeholder='Brand name car'
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
                        <Button disabled={isLoading || load} variant='outlined' color='error' sx={{ borderRadius: 3 }} onClick={onClose}>Cancel</Button>
                        <Button disabled={isLoading || load} sx={{ borderRadius: 3 }} variant='contained' type='submit'>{type}</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}

export default FromBrand
