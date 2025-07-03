import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface LoginFormProps {
    loading: boolean
    onSubmit: SubmitHandler<FormData>;
}

const FromLogin: FC<LoginFormProps> = ({ onSubmit, loading }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    return (
        <>
            <Grid container component={'form'} onSubmit={handleSubmit(onSubmit)}>
                <Grid size={12}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        disabled={loading}
                        margin="normal"
                        {...register("username", { required: "กรุณากรอกชื่อผู้ใช้" })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        disabled={loading}
                        margin="normal"
                        {...register("password", { required: "กรุณากรอกรหัสผ่าน" })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </Grid>
                <Grid size={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default FromLogin
