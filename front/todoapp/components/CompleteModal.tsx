import { Box, Button, Modal, Typography } from '@mui/material'
import axios from 'axios';
import Router from 'next/router';
import React, { useEffect, useState } from 'react'
import { jwtTokenContext } from '../pages/JwtContext';
import { API_URL, SAVE_TOKEN_KEY, TaskContext, UserContext } from '../pages/_app';


type Props = {
    task_id: number,
    title: string,
    date: string,
    detail: string,
    importance: string,
    progress_id: number,
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

const DeleteModal = ({ date, title, task_id, detail, progress_id, importance }: Props) => {
    const [open, setOpen] = useState(false)
    const { user_id, setId } = React.useContext(UserContext)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const clickedNo = () => {
        handleClose()
    }
    const ctx = React.useContext(jwtTokenContext)
    const ctxTask = React.useContext(TaskContext);

    useEffect(() => {
        axios.get(API_URL + "auth/users/me/", { headers: { Authorization: "JWT " + window.localStorage.getItem(SAVE_TOKEN_KEY) } })
            .then((response) => {
                setId(response.data.id);
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
            });

    }, [])

    const clickedYes = () => {

        const sendJson = {
            task_id: task_id,
            title: title,
            date: date,
            detail: detail,
            progress_id: 2,
            importance: importance,
            user_id: user_id
        }

        // console.log(JSON.stringify(sendJson))

        // post通信
        axios
            .patch(API_URL + `tasks/${task_id}/`, sendJson, { headers: { Authorization: "JWT " + window.localStorage.getItem(SAVE_TOKEN_KEY) } })
            .then(function (response) {
                // console.log(response);

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
            <Button onClick={handleOpen} variant="contained">Complete</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        タスク『{title}』を完了にしますか？
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