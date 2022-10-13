import { Button, Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import TextField from '@mui/material/TextField/TextField'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Router from 'next/router';
import { jwtTokenContext } from '../pages/JwtContext';
import { API_URL } from '../pages/_app';

type Task = {
    task_id: number,
    date: string,
    progress_id: number,
    title: string,
    detail: string,
    importance: string,
}

type Props = {
    task: Task,
    setTask: (task: Task) => void
    editing: boolean,
}
type ProgressMaster = {
    progress_id: number,
    name: string,
}

const FastTaskAutoline = ({ task, setTask, editing }: Props) => {

    const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, title: event.target.value });
    };
    const dueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, date: event.target.value });
    };
    const progressChange = (event: SelectChangeEvent) => {
        setTask({ ...task, progress_id: Number(event.target.value) });
    };

    const TaskDateSet = () => {
        if (task.date !== null) {
            // console.log(task.date);
            // console.log(typeof (task.date));
            const str = task.date.replace(":00Z", "");
            return str;
        }
    }

    const [progress_master, setProgressMaster] = useState<ProgressMaster[]>([]);
    const ctx = React.useContext(jwtTokenContext)


    useEffect(() => {
        // axios.get(API_URL + `progress_master/`)
        //     .then((response) => {
        //         setProgressMaster(response.data);
        //     })
        setProgressMaster(
            [
                {
                    progress_id: 1,
                    name: "進行中",
                },
                {
                    progress_id: 2,
                    name: "完了",
                },
                {
                    progress_id: 3,
                    name: "未完了",
                },
            ]
        )
    }, [])

    return (

        <Card>
            <CardContent >
                <Box sx={{ m: "auto" }} alignItems="center">
                    <Grid container>
                        <Grid item xs={12}>
                            {/* タイトルテキストフィールド */}
                            <TextField
                                required
                                id="TitleTextField"
                                sx={{ width: "100%", mt: 1, mb: 1 }}
                                label="Title" variant="outlined"
                                value={task.title}
                                onChange={titleChange}
                                disabled={!editing}
                            />
                        </Grid>
                        {/* 締め切りテキストフィールド */}
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="DueTextField"
                                label="Due Date"
                                type="datetime-local"
                                sx={{ width: 250, mt: 1, mb: 1 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={TaskDateSet()}
                                onChange={dueChange}
                                disabled={!editing}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ Width: 250, mt: 1, mb: 1 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Progress</InputLabel>
                                    <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={String(task.progress_id)}
                                        label="Progress"
                                        onChange={progressChange}
                                        disabled={!editing}
                                    >
                                        {progress_master.map((data, index) => {
                                            return <MenuItem value={data.progress_id}>{data.name}</MenuItem>;
                                        })}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>

    )
}

export default FastTaskAutoline