import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheegTab from './components/CheegTab';
import QuizLetTab from './components/QuizLetTab';
import BrainleyTab from './components/BrainleyTab'
import CustomerNavbar from './components/CustomerNavbar';
import StatisticsCard from './components/StatisticsCard';

import Container from '@mui/material/Container';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function CustomerDashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <CustomerNavbar />
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >

        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider', width: "200px" }}>
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Chegg" {...a11yProps(1)} />
          <Tab label="Quizlet" {...a11yProps(2)} />
          <Tab label="Brainley" {...a11yProps(3)} />
          <Tab label="Item Four" {...a11yProps(4)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Container maxWidth="sm">
            <Box
              sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
            >
              <StatisticsCard title={"Total Credits"} count={500} color={"danger"} />
              <StatisticsCard title={"Used Credits"} count={300} />
              <StatisticsCard title={"Remaining Credits"} count={200} />
            </Box>
          </Container>

        </TabPanel>
        <TabPanel value={value} index={1}>
          <CheegTab />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <QuizLetTab />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <BrainleyTab />
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Four
        </TabPanel>
      </Box>
    </>
  );
}