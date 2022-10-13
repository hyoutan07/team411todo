import { Box, Button, Modal, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

import Router from 'next/router';
import { jwtTokenContext } from '../pages/JwtContext';
import { API_URL, SAVE_TOKEN_KEY, TaskContext } from '../pages/_app';

type Props = {
    title: string;
    task_id: number;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const DeleteModal = ({ title, task_id }: Props) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const clickedNo = () => {
        handleClose()
    }
    const ctx = React.useContext(jwtTokenContext)
    const ctxTask = React.useContext(TaskContext)

    const clickedYes = () => {
        axios.delete(API_URL + `tasks/${task_id}/`, { headers: { Authorization: "JWT " + window.localStorage.getItem(SAVE_TOKEN_KEY) } })
            .then((res) => {
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
                // console.log(error);
                if (error.response.status === 401) {
                    Router.push('/posts/login')
                    // console.log("401 Error Unauthorized")
                  } else if (error.response.status === 400) {
                    // console.log("400 Error BadRequestError")
                    window.alert("入力に不備があります")
                  }
            })
        handleClose()
    }

    return (
        <div>
            <Button onClick={handleOpen} color="error">DELETE</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        タスク『{title}』を削除しますか?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Button size='small' onClick={clickedYes}>Yes</Button>
                        <Button size='small' onClick={clickedNo}>No</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default DeleteModal