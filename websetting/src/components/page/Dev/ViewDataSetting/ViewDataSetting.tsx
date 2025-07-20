'use client'
import CustomTreeViewMenu from '@/src/modules/CustomTreeViewMenu'
import FromCarmodel from '@/src/modules/From/FromCarmodel'
import FromModelGroup from '@/src/modules/From/FromModelGroup'
import ThisDialogAlert from '@/src/modules/ThisDialogAlert'
import ThisDialogCarmodel from '@/src/modules/ThisDialogCarmodel'
import { instance } from '@/src/server/server'
import { blue, green, orange } from '@mui/material/colors'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import { enqueueSnackbar } from 'notistack'
import React, { FC, useEffect, useState } from 'react'

interface ViewDataSettingProps {
    data: Brand
    onLoad: () => void
}

const ViewDataSetting: FC<ViewDataSettingProps> = ({ data, onLoad }) => {

    const url = process.env.NEXT_PUBLIC_API || 'http://localhost:4500/api/v1'

    const [load, setLoad] = useState<boolean>(false)

    const [dataBrand, setDataBrand] = useState<Brand | null>(null)
    const [dataModelGroup, setDataModelGroup] = useState<ModelGroup | null>(null)
    const [dataCarmodel, setDataCarmodel] = useState<CarModel | null>(null)

    const [removeBrand, setRemoveBrand] = useState<boolean>(false)

    const [addModelGroup, setAddModelGroup] = useState<boolean>(false)
    const [removeModelGroup, setRemoveModelGroup] = useState<boolean>(false)

    const [addCarmodel, setAddCarmodel] = useState<boolean>(false)
    const [removeCarmodel, setRemoveCarmodel] = useState<boolean>(false)


    const RemoveBrandApi = async (id: number): Promise<boolean> => {
        const value = await sessionStorage.getItem('auth_ecu') as string
        if (value === null) return false
        const item = JSON.parse(value) as TokenApi
        const param = `brand/${id}`
        const result = await instance.delete(param, {
            headers: {
                Authorization: `Bearer ${item.access_token}`
            }
        }).then((res) => true).catch(() => false)
        return result
    }

    const RemoveModelGroupApi = async (id: number): Promise<boolean> => {
        const value = await sessionStorage.getItem('auth_ecu') as string
        if (value === null) return false
        const item = JSON.parse(value) as TokenApi
        const param = `model-group/${id}`
        const result = await instance.delete(param, {
            headers: {
                Authorization: `Bearer ${item.access_token}`
            }
        }).then((res) => true).catch(() => false)
        return result
    }

    const RemoveCarmodelApi = async (id: number): Promise<boolean> => {
        const value = await sessionStorage.getItem('auth_ecu') as string
        if (value === null) return false
        const item = JSON.parse(value) as TokenApi
        const param = `car-model/${id}`
        const result = await instance.delete(param, {
            headers: {
                Authorization: `Bearer ${item.access_token}`
            }
        }).then((res) => true).catch(() => false)
        return result
    }

    const handleDeleteBrand = async () => {
        setLoad(true)
        if (dataBrand) {
            const result = await RemoveBrandApi(dataBrand.id).finally(() => setLoad(false))
            if (result) {
                enqueueSnackbar('Success remove brand', {
                    variant: 'success'
                })
                onLoad()
            } else {
                enqueueSnackbar('Cannot remove brand', {
                    variant: 'error'
                })
            }
        }
        stateClear()
    }

    const handleDeleteModelGroup = async () => {
        setLoad(true)
        if (dataModelGroup) {
            const result = await RemoveModelGroupApi(dataModelGroup.id).finally(() => setLoad(false))
            if (result) {
                enqueueSnackbar('Success remove model group', {
                    variant: 'success'
                })
                onLoad()
            } else {
                enqueueSnackbar('Cannot remove model group', {
                    variant: 'error'
                })
            }
        }
        stateClear()
    }

    const handleDeleteCarmodel = async () => {
        setLoad(true)
        if (dataCarmodel) {
            const result = await RemoveCarmodelApi(dataCarmodel.id).finally(() => setLoad(false))
            if (result) {
                enqueueSnackbar('Success remove car model', {
                    variant: 'success'
                })
                onLoad()
            } else {
                enqueueSnackbar('Cannot remove car model', {
                    variant: 'error'
                })
            }
        }
        stateClear()
    }

    const handleBrandModelSetting = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: object, status: 'delete' | 'add') => {
        setDataBrand(value as Brand)
        switch (status) {
            case 'add':
                setAddModelGroup(true)
                break;
            case 'delete':
                setRemoveBrand(true)
                break;
            default:
                break;
        }
    }

    const handleModelGroupSetting = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: object, status: 'delete' | 'add') => {
        setDataModelGroup(value as ModelGroup)
        setDataBrand(data)
        switch (status) {
            case 'add':
                setAddCarmodel(true)
                break;
            case 'delete':
                setRemoveModelGroup(true)
                break;
            default:
                break;
        }
    }

    const handleCarModelSetting = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: object, status: 'delete' | 'add') => {
        setDataCarmodel(value as CarModel)
        switch (status) {
            case 'delete':
                setRemoveCarmodel(true)
                break;
            default:
                break;
        }
    }

    const stateClear = () => {
        setLoad(false)
        setDataBrand(null)
        setDataModelGroup(null)
        setDataCarmodel(null)
        setRemoveBrand(false)
        setAddModelGroup(false)
        setRemoveModelGroup(false)
        setAddCarmodel(false)
        setRemoveCarmodel(false)
    }

    useEffect(() => {
        if (dataCarmodel) {
            const findItemCar = data.ModelGroup.find((item) => item.id === dataCarmodel.modelGroupId) as ModelGroup
            if (findItemCar) {
                const result = findItemCar.CarModel.find((item) => item.id === dataCarmodel.id) as CarModel
                if (result) setDataCarmodel(result)

            }
        }
    }, [data])

    return (
        <>
            <TreeItem itemId={data.name} label={
                <CustomTreeViewMenu disableDelete={data.ModelGroup.length !== 0} addColor={green[900]} deleteColor={orange[900]} data={data} title={data.name} onClick={handleBrandModelSetting} />
            } >
                {data.ModelGroup.map((item, indexs) => {
                    return (
                        <TreeItem itemId={item.code} key={indexs}
                            label={<CustomTreeViewMenu disableDelete={item.CarModel.length !== 0} addColor={green[600]} deleteColor={orange[600]} data={item} title={item.code} onClick={handleModelGroupSetting} />} >
                            {item.CarModel.map((itemsx) => {
                                return (
                                    <TreeItem itemId={itemsx.id.toString()} key={itemsx.id} label={
                                        <CustomTreeViewMenu disableDelete={false} addColor={green[300]} deleteColor={orange[300]} data={itemsx} disableAdd title={itemsx.name} onClick={handleCarModelSetting} />
                                    } onClick={() => setDataCarmodel(itemsx)} />
                                )
                            })}
                        </TreeItem>
                    )
                })}
            </TreeItem>

            {dataCarmodel && removeCarmodel === false && (
                <ThisDialogCarmodel data={dataCarmodel} url={url} onClose={stateClear} onLoad={onLoad} />
            )}

            {removeBrand && dataBrand !== null && (
                <ThisDialogAlert
                    open={removeBrand && dataBrand !== null}
                    load={load}
                    titleText={`Remove brand`}
                    contentText={`Are you sure remove brand ${dataBrand.name} !`}
                    onClose={() => { setRemoveBrand(false), setDataBrand(null) }}
                    onSubmt={handleDeleteBrand}
                />
            )}

            {addModelGroup && dataBrand && (
                <FromModelGroup name='Add model group'
                    type='add'
                    brandData={dataBrand}
                    open={addModelGroup && dataBrand !== null}
                    onClose={stateClear}
                    onLoad={onLoad}
                    defultValues={null} />
            )}

            {removeModelGroup && dataModelGroup !== null && (
                <ThisDialogAlert
                    open={removeModelGroup && dataModelGroup !== null}
                    load={load}
                    titleText={`Remove model group`}
                    contentText={`Are you sure remove model group ${dataModelGroup.code} !`}
                    onClose={stateClear}
                    onSubmt={handleDeleteModelGroup}
                />
            )}

            {addCarmodel && dataModelGroup !== null && (
                <FromCarmodel name='Add car name'
                    type='add'
                    modelData={dataModelGroup}
                    open={addCarmodel && dataModelGroup !== null}
                    onClose={stateClear}
                    onLoad={onLoad}
                    defultValues={null} />
            )}

            {removeCarmodel && dataCarmodel !== null && (
                <ThisDialogAlert
                    open={removeCarmodel && dataCarmodel !== null}
                    load={load}
                    titleText={`Remove car model`}
                    contentText={`Are you sure remove car model ${dataCarmodel.name} !`}
                    onClose={stateClear}
                    onSubmt={handleDeleteCarmodel}
                />
            )}
        </>
    )
}

export default ViewDataSetting
