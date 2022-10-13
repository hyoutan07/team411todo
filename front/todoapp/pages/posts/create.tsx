import { Box, Button, CardActions, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import AdditionalTaskAutoline from '../../components/AdditionalTaskAutoline'
import Router from 'next/router';
import FastTaskAutoline from '../../components/FastTaskAutoline'
import Header from '../../components/Header'
import TaskDetailAccordion from '../../components/TaskDetailAccordion'
import Link from 'next/link'
import { jwtTokenContext } from '../JwtContext'
import { API_URL, SAVE_TOKEN_KEY, UserContext } from '../_app'

type Props = {}

type Task = {
  task_id: number,
  date: string,
  progress_id: number,
  title: string,
  detail: string,
  importance: string,
}

const t_create = (props: Props) => {
  const { user_id, setId } = React.useContext(UserContext)

  const [task, setTask] = useState<Task>({
    task_id: 0,
    date: '',
    progress_id: 0,
    title: '',
    detail: '',
    importance: '',
  })
  const router = useRouter()
  const ctx = React.useContext(jwtTokenContext)

  useEffect(() => {
    axios.get(API_URL + "auth/users/me/", { headers: { 'Authorization': 'JWT ' + window.localStorage.getItem(SAVE_TOKEN_KEY) } })
      .then(res => setId(res.data.id));
  }, [])

  if (router.query.detail === undefined) {
    return (
      <div>loading...</div>
    )
  }
  return (
    <Box>
      <Header mainContent={<Box sx={{ width: "80%", m: "auto" }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Create
        </Typography>
        <FastTaskAutoline
          task={task}
          editing={true}
          setTask={setTask}
        ></FastTaskAutoline>
        <TaskDetailAccordion
          detailMode={true}>
          <AdditionalTaskAutoline
            editing={true}
            task={task}
            setTask={setTask}
          ></AdditionalTaskAutoline>
        </TaskDetailAccordion>
        <CardActions>
          <Link href='/'>
            <Button>
              キャンセル
            </Button>
          </Link>
          <Button onClick={() => {
            const sendJson = {
              title: task.title,
              date: task.date,
              detail: task.detail,
              user_id: user_id,
              progress_id: task.progress_id,
              importance: task.importance,
            }

            // console.log(user_id)
            // post通信
            axios
              .post(API_URL + "tasks/", sendJson, { headers: { Authorization: "JWT " + window.localStorage.getItem(SAVE_TOKEN_KEY) } })
              .then(function (response) {
                Router.push("/");
              })
              .catch((error) => {
                // console.log(error)
                if (error.response.status === 401) {
                  Router.push('/posts/login')
                  // console.log("401 Error Unauthorized")
                } else if (error.response.status === 400) {
                  // console.log("400 Error BadRequestError")
                  window.alert("入力に不備があります")
                }
              })
          }}>
            送信
          </Button>
        </CardActions>
      </Box>} flgOpen={undefined}></Header>
    </Box>
  )
}

export default t_create