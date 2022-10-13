import { Alert, Avatar, Box, Button, Card, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material'
import { teal } from '@mui/material/colors'
import React, { useContext } from 'react'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';
import { jwtTokenContext } from '../pages/JwtContext';
import { API_URL, SAVE_TOKEN_KEY } from '../pages/_app';

type Props = {}


const LoginForm = (props: Props) => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const usernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const ctx = useContext(jwtTokenContext)

    const [errorFlg, setErrorFlg] = React.useState(false);
    


    return (
        <Grid>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: "350px",
                    m: "10vh auto"
                }}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start" //多分、デフォルトflex-startなので省略できる。
                    alignItems="center"
                >
                    <Avatar sx={{ bgcolor: teal[400] }}>
                        <LockOpenOutlinedIcon />
                    </Avatar>
                    <Typography variant={"h5"} sx={{ m: "30px" }}>
                        Sign In
                    </Typography>
                </Grid>
                <TextField
                    label="Username"
                    variant="standard"
                    fullWidth required
                    value={username}
                    onChange={usernameChange} />
                <TextField
                    type="password"
                    label="Password"
                    variant="standard"
                    fullWidth
                    required
                    value={password}
                    onChange={passwordChange}
                />
                {/* ラベルとチェックボックス */}
                {/* <FormControlLabel
                    labelPlacement="end"
                    label="パスワードを忘れました"
                    control={<Checkbox name="checkboxA" size="small" color="primary" />}
                /> */}
                <Box mt={3}>
                    <Button type="submit" color="primary" variant="contained" fullWidth 
                    sx={{ mb : 2}}
                    onClick={() => {
                        setErrorFlg(false);
                        const sendJson = {
                            username: username,
                            password: password,
                        }

                        // console.log(JSON.stringify(sendJson));

                        axios.post(API_URL + 'auth/jwt/create/', sendJson)
                            .then((res) => {
                                // console.log(res.data)
                                window.localStorage.setItem(SAVE_TOKEN_KEY, res.data.access);
                                // console.log(window.localStorage.getItem(SAVE_TOKEN_KEY));
                                Router.push('/')
                            })
                            .catch((err) => {
                                setErrorFlg(true);
                            });

                    }}>
                        サインイン
                    </Button>

                    {errorFlg ? <Alert severity="error">ユーザー名またはパスワードが違います。</Alert> : null}

                    {/* <Typography variant="caption">
                        <Link href="#">パスワードを忘れましたか？</Link>
                    </Typography> */}
                    <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Typography variant="caption" display="block">
                            アカウントを持っていますか？<br />
                        </Typography>
                        <Link href="/posts/register">
                            <Button size="small" variant="outlined">アカウントを作成</Button>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Grid>
    )
}

export default LoginForm
