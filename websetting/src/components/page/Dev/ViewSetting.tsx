"use client"
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import React, { FC, useState } from 'react'
import FromBrand from '@/src/modules/From/FromBrand'
import ViewDataSetting from './ViewDataSetting/ViewDataSetting'
import AddIcon from '@mui/icons-material/Add';
interface ViewSettingProps {
    data: Brand[]
    reload: () => void
}

const ViewSetting: FC<ViewSettingProps> = ({ data, reload }) => {

    const [addBrand, setAddBrand] = useState<boolean>(false)

    return (
        <>
            <Grid container size={12}>
                <Grid size={12} pb={2}>
                    <Button variant='contained' startIcon={<AddIcon />} onClick={() => setAddBrand(true)}>เพิ่ม Brand</Button >
                </Grid>
                <Grid size={12}>
                    <SimpleTreeView>
                        {data.map((item, index) => {
                            return (
                                <ViewDataSetting key={item.name} data={item} onLoad={reload} />
                            )
                        })}
                    </SimpleTreeView>
                </Grid>
            </Grid>
            {addBrand && (
                <FromBrand data={data} name='Add Brand' type='add' open={addBrand} onClose={() => setAddBrand(false)} defultValues={null} onLoad={reload} />
            )}
        </>
    )
}

export default ViewSetting