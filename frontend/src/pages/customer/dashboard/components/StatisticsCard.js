import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function StatisticsCard(props) {
  return (
    <Card sx={{ minWidth: 275, margin: '5px' }}>
      <CardContent>
        <Typography sx={{ fontSize: 15 }} color={"text.secondary"} gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h4" component="div">
            {props.count}
        </Typography>
      </CardContent>
    </Card>
  );
}
