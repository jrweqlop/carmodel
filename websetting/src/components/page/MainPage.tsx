'use client'
import { GetCar, GetCarDev } from '@/src/server/Get/Data'
import Grid from '@mui/material/Grid'
import React, { FC, useEffect, useState } from 'react'
import ViewData from './View/ViewData'
import ViewSetting from './Dev/ViewSetting'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack'
import { instance } from '@/src/server/server'
import NotificationProvider from '@/src/provider/NotificationProvider'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation'
interface MainPageProps {
}

const MainPage: FC<MainPageProps> = ({ }) => {

    const matches = useMediaQuery('(min-width:600px)');

    const router = useRouter()

    const [dataAuth, setDataAuth] = useState<boolean>(true)

    const [data, setData] = useState<Brand[]>([])
    const [jsonView, setJsonView] = useState<JsonViewData[]>([])

    const loadData = async () => {
        const GetItem = await GetCar()
        const GetItemDev = await GetCarDev()
        setData(GetItemDev)
        setJsonView(GetItem)
    }

    const check = async () => {
        const value = await sessionStorage.getItem('auth_ecu') as string | null
        setDataAuth(true)
        if (value !== null) {
            const item = JSON.parse(value) as TokenApi
            const result = await instance.get('auth/profile', {
                headers: {
                    Authorization: `Bearer ${item.access_token}`
                }
            }).then((res) => res.data).catch(() => null)
            if (!result) {
                router.replace("/")
            }
            setDataAuth(false)
        } else {
            await signOut()
        }
    }

    const signOut = async () => {
        const clearValue = await sessionStorage.removeItem('auth_ecu')
        router.replace("/")
    }

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        check()
    }, [])

    return (
        <>
            <NotificationProvider>

                {!dataAuth && (
                    <>
                        <Box sx={{ flexGrow: 1 }} pb={1}>
                            <AppBar position="static" sx={{ background: "  #777777 " }} >
                                <Toolbar>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1} width={'100%'}>
                                        <img src="/LOGO.svg" width={40} />
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                            Carmodel
                                        </Typography>
                                    </Stack>
                                    <Button endIcon={<ExitToAppIcon />} onClick={signOut} variant='contained' color='warning'>Logout</Button>
                                </Toolbar>
                            </AppBar>
                        </Box>
                        <Grid container>
                            <Grid size={{ xs: 12, md: 6 }} overflow={'auto'} height={{ xs: '45dvh', md: '90dvh' }}>
                                <ViewSetting data={data} reload={loadData} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }} overflow={'auto'} height={{ xs: '45dvh', md: '90dvh' }}>
                                <ViewData data={jsonView} />
                            </Grid>
                        </Grid>
                    </>
                )}
            </NotificationProvider>
        </>
    )
}

export default MainPage
