import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminAppBar from '../components/AdminAppBar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useParams } from "react-router-dom";
const theme = createTheme();

export default function UpdateUser() {
    const userData = {}
    const {uid} = useParams();
    const handleChange = (event) => {
        // setUserData(...event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('username'),
            password: data.get('password'),
            userRole: data.get('userrole'),
            totalCredits: data.get('totalcredits'),
            usedCredits: data.get('usedCredits'),
            remainingCredits: data.get('remainingCredits'),
        });
    };

    useEffect(() => {
        axios.post("/api/admin/getsingleuserbyid", {uid: uid}).then((res) => {
            if(res.data.success) {
                userData = res.data.data;
                console.log(userData)
            }
        })
    }, []);

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
                        Update User
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password" />
                        <FormControl fullWidth>
                            <InputLabel id="userrole-label">Role</InputLabel>
                            <Select
                                labelId="userrole"
                                id="userrole"
                                // value={userData.userRole}
                                label="Role"
                            // onChange={handleChange}
                            >
                                <MenuItem value={0}>Admin</MenuItem>
                                <MenuItem value={1}>Customer</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="totalcredits"
                            label="Total Credits"
                            type="Number"
                            value={userData.totalCredits}
                            id="totalcredits" />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="usedcredits"
                            label="Used Credits"
                            type="Number"
                            id="usedcredits" />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="remainingcredits"
                            label="Remaining Credits"
                            type="Number"
                            id="remainingcredits" />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            Update User
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}