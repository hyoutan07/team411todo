import * as React from 'react';
import Box from '@mui/material/Box';
import AddButton from './AddButton';
import ReportButton from './ReportButton';
import CalendarButton from './CalendarButton';


export default function GroupOrientation() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}
        >
            <AddButton />
            <ReportButton />
            <CalendarButton />

        </Box>
    );
}