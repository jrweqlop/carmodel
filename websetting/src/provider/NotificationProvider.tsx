'use client'
import React, { FC } from 'react'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

interface NotificationProviderProps {
    children: React.ReactNode
}

const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
    return (
        <>
            <SnackbarProvider maxSnack={2} autoHideDuration={2000}>
                {children}
            </SnackbarProvider>
        </>
    )
}

export default NotificationProvider
