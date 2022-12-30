import axios from 'axios';
import Swal from 'sweetalert2'

import React, {useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminAppBar from '../components/AdminAppBar';
const theme = createTheme();
export default function RegisterUser() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            username: data.get('username'),
            password: data.get('password'),
            totalCredits: data.get('totalcredits'),
            remainingCredits: data.get('totalcredits')
        }

        axios.post("/api/admin/registerUser", userData).then(function (response) {
            console.log(response);
            if (response.data.success) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    };

    useEffect(() => {
        if ((localStorage.getItem("token") === null) || (localStorage.getItem("token") === "")) {
            window.location.href = "/admin/login"
        }
    },[])

    return (
        <ThemeProvider theme={theme}>

            <AdminAppBar />
            <Container component="main" maxWidth="xs">

                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register User
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="totalcredits"
                                    label="Total Credits"
                                    type="number"
                                    id="totalcredits"
                                    autoComplete="totalcredits" />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}