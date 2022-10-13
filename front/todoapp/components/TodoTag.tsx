import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';


export default function LimitTags() {
    // Top 100 films as rated by IMDb users. 
    return (
        <Box
            sx={{
                mt: 2,
                mb: 2,
                m: 1,
                bgcolor: 'background.paper',
                p: 1,
            }}>
                
            
            <Autocomplete
                multiple
                limitTags={100}
                id="multiple-limit-tags"
                options={tagLists}
                getOptionLabel={(option) => {
                    if (typeof option === "string") {
                        return option
                    }
                    return option.title
                }}
                defaultValue={[...tagLists]}
                renderInput={(params) => (
                    <TextField {...params} label="Tag Search"/>
                )}
                sx={{ width: '100%' , m:"auto", height: "100%"}}
            />
        </Box>
    );
}

const tagLists = [
    { title: '学校'},
    { title: '仕事'},
    { title: '事務'},
    { title: '資格勉強'},
    { title: '家事'},
];

