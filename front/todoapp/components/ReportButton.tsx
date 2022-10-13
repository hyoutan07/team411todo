import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import Link from 'next/link';

type Props = {}

const AddButton = (props: Props) => {
  return (
    <Box sx={{m: "auto", mt: 2, mb: 2}}>
      <Link href="/posts/report">
        <Button variant="outlined" startIcon={<ArticleIcon/>} size="large">
          Report
        </Button>
      </Link>
    </Box>
  )
}

export default AddButton