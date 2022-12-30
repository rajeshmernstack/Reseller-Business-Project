import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function StatisticsCard(props) {
  return (
    <Card sx={{ minWidth: 200, margin: '10px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h5" component="div">
          {props.count}
        </Typography>
      </CardContent>
    </Card>
  );
}
