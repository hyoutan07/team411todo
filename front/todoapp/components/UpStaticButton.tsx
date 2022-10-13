import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fab } from '@mui/material';


export default function UpStaticButton() {
    const [open, setOpen] = React.useState(false);
    const returnTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
    };
    return (
        // postion fixedで固定
        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1, zIndex: 'tooltip', right: "10vw", bottom: 20 }} position="fixed">
            <Fab size="small" color="secondary" aria-label="add" onClick={returnTop}>
                <KeyboardArrowUpIcon />
            </Fab>
        </Box>
    );
}
