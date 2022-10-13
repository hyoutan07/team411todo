import { Alert, Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FastTaskAutoline from "./FastTaskAutoline";
import Router from 'next/router';
import { jwtTokenContext } from "../pages/JwtContext";
import { API_URL, SAVE_TOKEN_KEY, TaskContext, UserContext } from "../pages/_app";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
}

type Task = {
  task_id: number,
  date: string,
  progress_id: number,
  title: string,
  detail: string,
  importance: string,
}


const FastCreateModal = ({ open, setOpen }: Props) => {
  const handleClose = () => { setOpen(false); }
  const router = useRouter()
  const [alert, setAlert] = useState(false)
  const ctx = React.useContext(jwtTokenContext)
  const { user_id, setId } = React.useContext(UserContext)
  const ctxTask = React.useContext(TaskContext)

  const [task, setTask] = useState<Task>({
    task_id: 0,
    date: '',
    progress_id: 2,
    title: '',
    detail: '__',
    importance: "Must",
  })

  useEffect(() => {
    axios.get(API_URL + "auth/users/me/", { headers: { Authorization: "JWT " + window.localStorage.getItem(SAVE_TOKEN_KEY) } })
      .then((response) => {
        setId(response.data.id);
      });
  }, [])

  const clickedSave = () => {
    const sendJson = {
      title: task.title,
      date: task.date,
      detail: task.detail,
      user_id: user_id,
      progress_id: task.progress_id,
    }

    // console.log(JSON.stringify(sendJson))

    // post通信
    axios.post(API_URL + "tasks/", sendJson, { headers: { Authorization: "JWT " + window.localStorage.getItem(SAVE_TOKEN_KEY) } })
      .then(response => {

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
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Router.push('/posts/login')
          // console.log("401 Error Unauthorized")
        } else if (error.response.status === 400) {
          // console.log("400 Error BadRequestError")
          window.alert("入力に不備があります")
        }
      });

    // .then(response => {
        // console.log(response.status);
    //     if(response.status === 201) {
    //         router.push("/")
    //     }else{
    //         setAlert(true)
    //     }
    // }
    // )
    // Router.reload();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FastTaskAutoline task={task}
            setTask={setTask}
            editing={true}></FastTaskAutoline>
          <Button size='small' onClick={handleClose}>Close</Button>
          <Button size='small' onClick={clickedSave}>Save</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default FastCreateModal;