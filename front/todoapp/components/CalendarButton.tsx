import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, Button } from '@mui/material';
import Link from 'next/link';


type Props = {}

const AddButton = (props: Props) => {
  return (
    <Box sx={{m: "auto", mt: 2, mb: 2}}>
      <Link href="/posts/calendar">
        <Button variant="outlined" startIcon={<CalendarMonthIcon/>} size="large">
          Calendar
        </Button>
      </Link>
    </Box>
  )
}

export default AddButton