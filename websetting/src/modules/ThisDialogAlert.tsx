'use client'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import React, { FC, useEffect, useState } from 'react'

interface ThisDialogAlertProps {
    open: boolean
    titleText: string
    contentText: string
    load: boolean
    onClose: () => void
    onSubmt: () => void
}

const ThisDialogAlert: FC<ThisDialogAlertProps> = ({ open, titleText, contentText, load, onClose, onSubmt }) => {

    const [count, setCount] = useState<number>(10)

    useEffect(() => {
        const countDown = setInterval(() => {
            if (count !== 0) {
                setCount(count - 1)
            } else {
                onClose()
            }
        }, 1000)
        return () => clearInterval(countDown)
    }, [count])

    return (
        <>
            <Dialog slotProps={{ paper: { sx: { borderRadius: 4 } } }} open={open} onClose={onClose} fullWidth maxWidth='sm'>
                <DialogTitle variant='h5' fontWeight={'bold'}>
                    {titleText}
                </DialogTitle>
                <DialogContent>
                    <Typography variant='h6'>{contentText}</Typography>
                    <Typography>close in {count}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ borderRadius: 3 }} disabled={load} variant='contained' onClick={onClose}>Cancel</Button>
                    <Button sx={{ borderRadius: 3 }} disabled={load} variant='outlined' onClick={onSubmt}>Submit</Button>
                </DialogActions>
            </Dialog >
        </>
    )
}

export default ThisDialogAlert
