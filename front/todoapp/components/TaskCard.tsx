import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import CompleteModal from './CompleteModal'
import DeleteModal from './DeleteModal'

// 型定義
type Props = {
  task_id: number,
  title: string,
  date: string,
  detail: string,
  importance: string,
  progress_id: number,
}

const TaskCard = ({date, title, task_id, detail, progress_id, importance }: Props) => {
  return (
    <Card sx={{ m: 2 }}>
      <CardContent sx={{ mb: -1 }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {date}まで {importance}、{progress_id}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>

      <CardActions>
        <Link  href={`./posts/detail/${task_id}`}>
          <Button size="small">Detail</Button>
        </Link>
        <DeleteModal title={title} task_id={task_id} ></DeleteModal>
        {progress_id !== 1 ? null : <CompleteModal title={title} task_id={task_id} detail={detail} progress_id={progress_id} importance={importance} date={date}></CompleteModal>}
      </CardActions>
    </Card>
  )
}

export default TaskCard