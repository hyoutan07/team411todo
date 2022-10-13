import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TaskList from './TaskList';
import axios from 'axios';
import Router from 'next/router';
import { jwtTokenContext } from '../pages/JwtContext';
import { API_URL, SAVE_TOKEN_KEY, TaskContext } from '../pages/_app';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// TaskDataの型定義
type TaskData = {
  task_id: number,
  title: string,
  date: string,
  detail: string,
  importance: string,
  progress_id: number,
}


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const ctx = React.useContext(jwtTokenContext)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const ctxTask = React.useContext(TaskContext);

  // useEffectで表示されたときに一度だけ呼び出す
  React.useEffect(() => {
    // console.log(window.localStorage.getItem(SAVE_TOKEN_KEY));

    axios.get(API_URL + `tasks/`, { headers: { Authorization: "JWT " + window.localStorage.getItem(SAVE_TOKEN_KEY) } })
      .then(res => {
        ctxTask.setData(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.status === 401) {
          Router.push('/posts/login')
          // console.log("401 Error Unauthorized")
        } else if (error.response.status === 400) {
          // console.log("400 Error BadRequestError")
          window.alert("入力に不備があります")
        }
      })
  }, [])

  return (
    <Box sx={{ width: '100%', height: "100%", mt: -1 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="ProgressTab" centered>
          <Tab label="進行中" {...a11yProps(0)} style={{ minWidth: "33%" }} />
          <Tab label="完了" {...a11yProps(1)} style={{ minWidth: "33%" }} />
          <Tab label="未完了" {...a11yProps(2)} style={{ minWidth: "33%" }} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TaskList data={ctxTask.data.filter((data) => data.progress_id === 1)} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TaskList data={ctxTask.data.filter((data) => data.progress_id === 2)} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TaskList data={ctxTask.data.filter((data) => data.progress_id === 3)} />
      </TabPanel>
    </Box>
  );
}
