import React, { useEffect, useState, useContext } from 'react'
import TaskCard from './TaskCard'
import axios from 'axios';
import { Box, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type Props = {
    task_id: number,
    title: string,
    date: string,
    detail: string,
    importance: string,
    progress_id: number,
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

// []をつけて配列化
// const sampleData: TaskData[] = [
//     {
//         date: "2022年9月13日",
//         title: "Nextjsの基本をマスターする"
//     },
//     {
//         date: "2022年9月14日",
//         title: "Nextjsの基本をマスターする"
//     },
//     {
//         date: "2022年9月15日",
//         title: "Nextjsの基本をマスターする"
//     },
// ]

// const numbers = [1, 2, 3, 4, 5];
// const result = numbers.map(value => value * 2)
// // [2, 4, 6, 8, 10]

//  ? ? ? ?
//  ? ? ?

// http://localhost:3000/api/test

const TaskList = ({data}) => {

    function ScrollWindow() {
        var element = document.getElementById('to');
        var rect = element.getBoundingClientRect();
        var elemtop = rect.top + window.pageYOffset;
        document.documentElement.scrollTop = elemtop;

        window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
    }

    // mapメソッドでループする,　keyを指定することで速度向上(idが決まり次第追加)
    const result = data.map((data, index) => <TaskCard date={data.date} title={data.title} key={index} task_id={data.task_id} detail={data.detail} importance={data.importance} progress_id={data.progress_id} />)
    return (
        <Box component="div" sx={{ display: 'block', width: '100%', height: "100%", maxHeight: "100vh" }}>
            {result}
        </Box>

    )
}


export default TaskList