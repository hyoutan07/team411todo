import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import FastCreateModal from './FastCreateModal';


export default function ControlledOpenSpeedDial() {
    const [open, setOpen] = React.useState(false);
    const [modal, setModal] = React.useState(false);

    return (
        // postion fixedで固定
        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, zIndex: 'tooltip', right: 20, bottom: 20 }} position="fixed">
            {/* aでcreateページに遷移 */}
                {/* +ボタンの部分 */}
                {modal ? <></> : <SpeedDial
                    ariaLabel="SpeedDial controlled open example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    open={open}
                    onClick={() =>{
                        setModal(true)
                    }}
                >
                </SpeedDial>}
                <FastCreateModal open={modal} setOpen={setModal}></FastCreateModal>
        </Box>
    );
}
