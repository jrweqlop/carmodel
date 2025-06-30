import Grid from '@mui/material/Grid'
import JsonView from '@uiw/react-json-view'
import { darkTheme } from '@uiw/react-json-view/dark'
import React, { FC } from 'react'

interface ViewDataProps {
    data: JsonViewData[]
}

const ViewData: FC<ViewDataProps> = ({ data }) => {
    return (
        <>
            <JsonView value={data} style={darkTheme} />
        </>
    )
}

export default ViewData
