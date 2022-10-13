import { Box, Button } from '@mui/material';
import React from 'react';
import Header from '../components/Header';
import IndexButtonGroup from '../components/IndexButtonGroup';
import ProgressTab from '../components/ProgressTab';
import StaticAdd from '../components/StaticAdd';
import TodoTag from '../components/TodoTag';
// import TodoTag from '../components/TodoTag';
import UpStaticButton from '../components/UpStaticButton';
// alt+f+shift

export default function ButtonAppBar() {

  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ margin: 0 }}>
      <Header flgOpen={setOpen} mainContent={
        <div>
          <Box sx={{ display: 'flex' }} >
            <Box sx={{ bgcolor: '#eceff1', mt: -1, width: open ? "20%" : '25%', height: "90vh", position: "fixed"}}>
              <TodoTag />
              <IndexButtonGroup />
            </Box>
            <Box sx={{width: "75%", ml: "auto"}}>
              <ProgressTab />
            </Box>
            {/* <TaskList /> */}
          </Box>
          <StaticAdd />
          <UpStaticButton />
        </div>
      } />
    </Box>
  );
}