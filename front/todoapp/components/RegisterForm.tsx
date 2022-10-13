import { Grid, Paper, Avatar, Typography, TextField, Box, Button, Alert } from '@mui/material'
import React, { useContext } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';
import { jwtTokenContext } from '../pages/JwtContext';
import { API_URL, SAVE_TOKEN_KEY } from '../pages/_app';

type Props = {}

const registar = (props: Props) => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");

    const usernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const passwordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(event.target.value);
    };

    const ctx = useContext(jwtTokenContext)

    const [errorBlank, setErrorBlank] = React.useState(false);
    const [errorPassword, setErrorPassword] = React.useState(false);
    const [errorregiser, setErrorRegister] = React.useState(false);

    return (
        <Grid>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: "350px",
                    m: "10vh auto",
                }}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start" //多分、デフォルトflex-startなので省略できる。
                    alignItems="center"
                >
                    <Avatar sx={{ bgcolor: "#0091ea" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant={"h5"} sx={{ m: "30px" }}>
                        Registar
                    </Typography>
                </Grid>
                <TextField
                    label="Username"
                    variant="standard"
                    fullWidth required
                    value={username}
                    onChange={usernameChange}
                />
                <TextField
                    type="password"
                    label="Password"
                    variant="standard"
                    fullWidth
                    required
                    value={password}
                    onChange={passwordChange}
                />

                <TextField
                    type="password"
                    label="Password確認"
                    variant="standard"
                    fullWidth
                    required
                    value={passwordConfirm}
                    onChange={passwordConfirmChange}
                />

                {/* ラベルとチェックボックス */}
                {/* <FormControlLabel
                    labelPlacement="end"
                    label="パスワードを忘れました"
                    control={<Checkbox name="checkboxA" size="small" color="primary" />}
                /> */}
                <Box mt={3}>
                    <Button type="submit" color="primary" variant="contained" fullWidth
                        sx={{ mb: 2 }}
                        onClick={() => {
                            setErrorBlank(false);
                            setErrorPassword(false);
                            setErrorRegister(false);

                            if(username === "" || password === "" || passwordConfirm === "") {
                                setErrorBlank(true);
                                return;
                            }


                            if (password !== passwordConfirm) {
                                setErrorPassword(true);
                                return;
                            }

                            const sendAdmin = {
                                username: "root",
                                password: "root",
                            }

                            // console.log(JSON.stringify(sendAdmin));

                            axios.post(API_URL + 'auth/jwt/create/', sendAdmin)
                                .then((res) => {
                                    // console.log(res.data)
                                    window.localStorage.setItem(SAVE_TOKEN_KEY, res.data.access)


                                    const sendJson = {
                                        username: username,
                                        password: password,
                                    }

                                    // console.log(JSON.stringify(sendJson));

                                    axios.post(API_URL + 'register/', sendJson, { headers: { Authorization: "JWT " + window.localStorage.getItem(SAVE_TOKEN_KEY) } })
                                        .then((res) => {
                                            // console.log(res);
                                            // console.log(res.data);
                                            Router.push("/posts/login");

                                        })
                                        .catch((err) => {
                                            // console.log(err);
                                            setErrorRegister(true);
                                        });
                                });
                        }}>
                        登録
                    </Button>
                    

                    {errorBlank ? <Alert severity="error">ユーザー名とパスワードを正しく入力してください。</Alert> : null}
                    {errorPassword ? <Alert severity="error">パスワードが異なります。</Alert> : null}
                    {errorregiser ? <Alert severity="error">既にユーザー名が存在します。</Alert> : null}

                    {/* <Typography variant="caption">
                        <Link href="#">パスワードを忘れましたか？</Link>
                    </Typography> */}
                    <Box sx={{ mt: 2, textAlign: "center" }}>
                        <Typography variant="caption" display="block">
                            アカウントを持っていますか？<br />
                        </Typography>
                        <Link href="/posts/login">
                            <Button size="small" variant="outlined" sx={{ ml: "auto", mr: "auto" }}>ログインページへ</Button>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Grid>
    )
}

export default registar