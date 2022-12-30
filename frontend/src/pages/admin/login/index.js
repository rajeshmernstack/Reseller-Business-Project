import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2'

const theme = createTheme();

export default function AdminLogin() {
  const [token, setToken] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const adminData = {
      email: data.get('username'),
      password: data.get('password'),
    };
    axios.post("/api/admin/login", adminData).then((response) => {
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        window.location.href = "/admin"
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
    setToken(localStorage.getItem('token'));
  }, [token])

  if (!token) {
    return (
      <ThemeProvider theme={theme}>
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
              Admin Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Admin Login
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  } else {
    window.location.href = "/admin"
  }
}