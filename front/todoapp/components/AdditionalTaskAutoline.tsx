import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useState } from 'react'

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
    setTask: (task: Task) => void,
    editing: boolean
}

const AdditionalTaskAutoline = ({ task, setTask, editing }: Props) => {

    const detailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, detail: event.target.value });
    };

    const importanceChange = (event: SelectChangeEvent) => {
        setTask({ ...task, importance: event.target.value });
    };
    
    // console.log(editing)
    return (
        <Box>
            {/* 重要度記入テキストフィールド */}
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Importance</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={task.importance}
                    label="Importance"
                    onChange={importanceChange}
                    disabled={!editing}
                >
                    <MenuItem value={"Must"}>Must</MenuItem>
                    <MenuItem value={"Should"}>Should</MenuItem>
                    <MenuItem value={"May"}>May</MenuItem>
                </Select>
            </FormControl>
            {/* 詳細記入テキストフィールド */}
            <TextField
                id="DetailTextField"
                sx={{ width: "100%", mt: 1, mb: 1 }}
                label="Detail"
                multiline
                rows={6}
                defaultValue=""
                value={task.detail}
                onChange={detailChange}
                disabled={!editing}
            />
        </Box>
    )
}

export default AdditionalTaskAutoline