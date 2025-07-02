import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from "react";

interface CustomTreeViewMenuProps {
    title: string;
    data: object;
    // selectFirstChildren?: (event: React.MouseEvent) => void;
    disableAdd?: boolean
    addColor: string
    deleteColor: string
    disableDelete: boolean
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: object, status: 'delete' | 'add') => void
}

const CustomTreeViewMenu: FC<CustomTreeViewMenuProps> = ({ title, data, onClick, disableAdd, disableDelete,
    addColor,
    deleteColor
}) => {
    return (
        <>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography>{title}</Typography>
                <Stack direction={'row'} alignItems={'center'}>
                    {!disableAdd && (
                        <IconButton sx={{ color: addColor }} aria-label="delete" size='medium' onClick={(event) => {
                            event.stopPropagation()
                            onClick(event, data, 'add')
                        }}>
                            <AddIcon fontSize="inherit" />
                        </IconButton>
                    )}
                    <IconButton sx={{ color: deleteColor }} disabled={disableDelete} aria-label="delete" size='medium' onClick={(event) => {
                        event.stopPropagation()
                        onClick(event, data, 'delete')
                    }}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Stack>

            </Stack>
        </>
    )
}
export default CustomTreeViewMenu