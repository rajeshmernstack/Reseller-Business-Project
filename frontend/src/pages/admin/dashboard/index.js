import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AdminAppBar from '../components/AdminAppBar';
import StatisticsCard from '../components/StatisticsCard';
export default function AdminDashboard() {
    const [statistics, setStatistics] = useState({})
    useEffect(() => {
        if ((localStorage.getItem("token") === null) || (localStorage.getItem("token") === "")) {
            
            window.location.href = "/admin/login"
        } else {
            axios.get("/api/admin/getStatisticsForDashboard").then(response => {
                console.log(response)
                setStatistics(response.data.statistics[1] ? response.data.statistics[1] : response.data.statistics[0]);
            })
        }

    }, [])

    return (
        <React.Fragment>
            <CssBaseline />
            <AdminAppBar />
            <Container maxWidth="xxl">
                <Box sx={{ height: '100vh', margin: '10px' }}>
                    <StatisticsCard title="Total Users" count={statistics.grandTotalUsers} />
                    <StatisticsCard title="Total Credits" count={statistics.grandTotalCredits} />
                    <StatisticsCard title="Used Credits" count={statistics.grandUsedCredits} />
                    <StatisticsCard title="Remaining Credits" count={statistics.grandRemainingCredits} />

                </Box>
            </Container>
        </React.Fragment>
    );
}
