"use client"
import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import React, { FC, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel';

interface ViewSettingProps {
    url: string
    data: Brand[]
}

interface CustomLabelProps {
    children: string;
    className: string;
    selectFirstChildren?: (event: React.MouseEvent) => void;
}

function CustomLabel({
    children,
    className,
    selectFirstChildren,
}: CustomLabelProps) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
            flexGrow={1}
            className={className}
        >
            <Typography>{children}</Typography>
            {!!selectFirstChildren && (
                <Button
                    size="small"
                    variant="text"
                    sx={{ position: 'absolute', right: 0, top: 0 }}
                    onClick={selectFirstChildren}
                >
                    Select child
                </Button>
            )}
        </Stack>
    );
}

const ViewSetting: FC<ViewSettingProps> = ({ data, url }) => {

    const [carmodel, setCarmodel] = useState<CarModel | null>(null)

    return (
        <>
            <Box>
                <Grid container>
                    <Grid size={12}>
                        <Button>เพิ่ม Brand</Button>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ minHeight: 352, minWidth: 250 }}>
                <SimpleTreeView>
                    {data.map((item, index) => {
                        return (
                            <TreeItem key={index} itemId={item.name} label={item.name} slots={{ label: CustomLabel }}>
                                {item.ModelGroup.map((items, indexs) => {
                                    return (
                                        <TreeItem itemId={items.code} key={indexs} label={items.code} >
                                            {items.CarModel.map((itemsx) => {
                                                return (
                                                    <TreeItem itemId={itemsx.name} key={itemsx.id} label={itemsx.name} onClick={() => setCarmodel(itemsx)} />
                                                )
                                            })}
                                        </TreeItem>
                                    )
                                })}
                            </TreeItem>
                        )
                    })}
                </SimpleTreeView>
            </Box>
            {carmodel && (
                <DialogCarmodel data={carmodel} url={url} onClose={(e) => setCarmodel(null)} />
            )}
        </>
    )
}

export default ViewSetting


interface DialogCarmodelProps {
    data: CarModel
    url: string
    onClose: (item: CarModel) => void
}

const DialogCarmodel: FC<DialogCarmodelProps> = ({ data, url, onClose }) => {

    const [images, setImages] = useState<string | null>(url.replace('/api', '').trim() + data.imagePath)

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

    const uploadImage = async (file: React.ChangeEvent<HTMLInputElement>) => {
        console.log(file.target.files)

    }

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
                    {/* <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <img src={url.replace('/api', '').trim() + data.imagePath} width={200} />
                    </Box> */}
                    <Card elevation={0} sx={{ borderRadius: 3 }}>
                        <Stack sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                        }}>
                            <CardMedia
                                component="img"
                                // height="140"
                                image={images ?? ''}
                                sx={{
                                    objectFit: images !== 'device.png' ? 'cover' : 'contain',
                                }}
                                onError={() => setImages('device.png')}
                                alt="green iguana"
                            />
                            <Box width={'100%'} justifyContent={'right'}>
                                <CardActions sx={{ justifyContent: 'flex-end' }}>
                                    {/* <Button sx={{ borderRadius: 2 }} onClick={handleClickOpenDialog} variant='outlined' size="small" color="primary">
                                        Open
                                    </Button> */}
                                    <Button
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
                                        // multiple
                                        />
                                    </Button>
                                </CardActions>
                            </Box>
                        </Stack>
                    </Card>
                </DialogContent>
            </Dialog>
        </>
    )
}


// {
//     jsonView.map((item: object, index: number) => {
//         const { brand, model } = item as { brand: string, model: object[] }
//         return (
//             <div key={index}>
//                 <Button onClick={() => console.log(model)}>{brand}</Button>
//                 {model.map((items, indexs: number) => {
//                     return (
//                         <div key={indexs}>
//                             {Object.entries(items).map((value, numx: number) => {
//                                 const thisData = value[1]
//                                 return (
//                                     <div key={numx}>
//                                         <div>{JSON.stringify(value[0])}</div>
//                                         {Object.entries(thisData).map((itemx, numy: number) => {
//                                             const { name, imagePath } = itemx[1] as { name: string, imagePath: string }
//                                             return (
//                                                 <div key={numy}>
//                                                     <img src={url.replace('/api', '').trim() + imagePath} width={100} />
//                                                     {JSON.stringify(itemx[1])}
//                                                 </div>
//                                             )
//                                         })}
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     )
//                 })}
//             </div>
//         )
//     })
// }