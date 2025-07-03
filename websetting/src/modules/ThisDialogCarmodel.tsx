import { FC, useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import Stack from "@mui/material/Stack"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DialogTitle from "@mui/material/DialogTitle"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import CancelIcon from '@mui/icons-material/Cancel';
import styled from "@emotion/styled"
import CardMedia from "@mui/material/CardMedia"
import { instance } from "../server/server"
import { enqueueSnackbar } from "notistack"

interface ThisDialogCarmodelProps {
    data: CarModel
    url: string
    onClose: (item: CarModel) => void
    onLoad: () => void
}

const ThisDialogCarmodel: FC<ThisDialogCarmodelProps> = ({ data, url, onClose, onLoad }) => {

    const [images, setImages] = useState<string | null>(url.replace('/api', '').trim() + data.imagePath)
    const [load, setLoad] = useState<boolean>(false)

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const UploadImageCarmodelApi = async (id: number, data: object): Promise<boolean> => {
        const value = await sessionStorage.getItem('auth_ecu') as string
        if (value === null) return false
        const item = JSON.parse(value) as TokenApi
        const url = `car-model/upload/${id}`
        const result = await instance.patch(url, data, {
            headers: {
                'Authorization': `Bearer ${item.access_token}`
            }
        }).then(() => true).catch(() => false)
        return result
    }

    const uploadImage = async (file: React.ChangeEvent<HTMLInputElement>) => {
        setLoad(true)
        const image = file.target.files
        if (image && image.length > 0) {
            const formData = new FormData();
            formData.append("image", image[0]);
            const result = await UploadImageCarmodelApi(data.id, formData).finally(() => setLoad(false))
            if (!result) {
                enqueueSnackbar('Cannot update image', {
                    variant: 'error'
                })
                throw new Error('Cannot upload image')
            } else {
                enqueueSnackbar('Success update image', {
                    variant: 'success'
                })
                onLoad()
            }
        }
    }

    const newLoadData = () => {
        setLoad(true)
        setImages(null)
        setImages(url.replace('/api', '').trim() + data.imagePath)
        setLoad(false)
    }

    useEffect(() => {
        newLoadData()
    }, [data])

    return (
        <>
            <Dialog slotProps={{ paper: { sx: { borderRadius: 4 } } }} open={true} onClose={() => onClose(data)} fullWidth maxWidth='sm'>
                <DialogTitle>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography fontWeight={'bold'}>{data.name}</Typography>
                        <IconButton sx={{ color: 'red' }} aria-label="delete" onClick={() => onClose(data)}>
                            <CancelIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    {data && data && (
                        <Card elevation={0} sx={{ borderRadius: 3 }}>
                            <Stack sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                flexDirection: 'column',
                            }}>
                                <CardMedia
                                    component="img"
                                    image={images ?? ''}
                                    sx={{
                                        objectFit: images !== 'unknowCar.png' ? 'cover' : 'contain',
                                    }}
                                    onError={() => setImages('unknowCar.png')}
                                    alt="green iguana"
                                />
                                <Box width={'100%'} justifyContent={'right'}>
                                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                                        <Button
                                            disabled={load}
                                            component="label"
                                            role={undefined}
                                            variant='outlined'
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                            sx={{ borderRadius: 3 }}
                                        >
                                            Upload files
                                            <VisuallyHiddenInput
                                                type='file'
                                                accept="image/*"
                                                onChange={uploadImage}
                                            />
                                        </Button>
                                    </CardActions>
                                </Box>
                            </Stack>
                        </Card>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ThisDialogCarmodel