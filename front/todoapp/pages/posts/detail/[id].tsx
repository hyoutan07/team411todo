import { Box, Button, CardActions, Typography } from '@mui/material'
import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import AdditionalTaskAutoline from '../../../components/AdditionalTaskAutoline'
import FastTaskAutoline from '../../../components/FastTaskAutoline'
import Header from '../../../components/Header'
import StaticAdd from '../../../components/StaticAdd'
import Router from 'next/router';
import TaskDetailAccordion from '../../../components/TaskDetailAccordion'
import Link from 'next/link'
import { jwtTokenContext } from '../../JwtContext'
import { API_URL, SAVE_TOKEN_KEY } from '../../_app'

type Task = {
  task_id: number,
  date: string,
  progress_id: number,
  title: string,
  detail: string,
  importance: string,
}

const detailPage: NextPage = () => {
  const [task, setTask] = useState<Task>({
    task_id: 0,
    date: null,
    progress_id: 0,
    title: '',
    detail: '',
    importance: '',
  })
  const ctx = React.useContext(jwtTokenContext)
  const router = useRouter()
  const { id } = router.query
  const [editing, setEditing] = useState(false);


  useEffect(() => {
    router.isReady ?
      axios.get(API_URL + `tasks/${id}/`, { headers: { Authorization: "JWT " + window.localStorage.getItem(SAVE_TOKEN_KEY) } })
        .then(res => {
          setTask(res.data)
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
      : {}
  }, [id, router])

  if (task === undefined) {
    return (
      <div>loading...</div>
    )
  }



  return (
    <div>
      <StaticAdd></StaticAdd>
      <Header mainContent={<Box sx={{ width: "80%", m: "auto" }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Detail
        </Typography>
        <FastTaskAutoline
          task={task}
          editing={editing}
          setTask={setTask}
        ></FastTaskAutoline>
        <TaskDetailAccordion detailMode={false}>
          <AdditionalTaskAutoline
            editing={editing}
            task={task}
            setTask={setTask}
          ></AdditionalTaskAutoline>
        </TaskDetailAccordion>
        <CardActions>
          <Button size="small" onClick={() => {
            if (editing === true) {
              // console.log(task);
              axios
                .patch(API_URL + `tasks/${task.task_id}/`, task, { headers: { Authorization: "JWT " + window.localStorage.getItem(SAVE_TOKEN_KEY) } })
                .then(function (response) {
                  // console.log(response)
                  Router.push("/")
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
            }
          }}>
            {editing ? "変更を保存" : "もどる"}
          </Button>

          <Link href="#">
            <Button size="small" onClick={() => {
              setEditing(!editing)
              // console.log(task)
            }}>
              {editing ? "キャンセル" : "編集"}
            </Button>
          </Link>
        </CardActions>
      </Box>} flgOpen={undefined}></Header>
    </div>
  )
}

export default detailPage;
