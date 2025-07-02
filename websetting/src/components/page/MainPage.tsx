"use client"
import { GetCar, GetCarDev } from '@/src/server/Get/Data'
import Grid from '@mui/material/Grid'
import React, { FC, useEffect, useState } from 'react'
import ViewData from './View/ViewData'
import ViewSetting from './Dev/ViewSetting'
import useMediaQuery from '@mui/material/useMediaQuery'

interface MainPageProps {
}


const MainPage: FC<MainPageProps> = ({ }) => {

    const matches = useMediaQuery('(min-width:600px)');

    const [data, setData] = useState<Brand[]>([])
    const [jsonView, setJsonView] = useState<JsonViewData[]>([])

    const loadData = async () => {
        const GetItem = await GetCar()
        const GetItemDev = await GetCarDev()
        setData(GetItemDev)
        setJsonView(GetItem)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <Grid container>
                <Grid size={{ xs: 12, md: 6 }} overflow={'auto'} height={{ xs: '45dvh', md: '90dvh' }}>
                    <ViewSetting data={data} reload={loadData} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} overflow={'auto'} height={{ xs: '45dvh', md: '90dvh' }}>
                    <ViewData data={jsonView} />
                </Grid>
            </Grid>
        </>
    )
}

export default MainPage
