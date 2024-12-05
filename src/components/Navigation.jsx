import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{flexGrow: 1}}>
          Personal Training
        </Typography>
        <Button color="default" onClick={() => navigate('/customers')}>Customers</Button>
        <Button color="default" onClick={() => navigate('/trainings')}>Trainings</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
