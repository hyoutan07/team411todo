import React from 'react'
import { Box, Button } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import Link from 'next/link'

type Props = {}

const AddButton = (props: Props) => {
  return (
    <Box sx={{m: "auto", mt: 2, mb: 2}}>
        <Link href="/posts/create?detail=0">
          <Button variant="outlined" startIcon={<CreateIcon/>} size="large">
            Create
          </Button>
        </Link>
    </Box>
  )
}

export default AddButton