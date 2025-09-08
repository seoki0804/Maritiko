// frontend/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1e2124', borderBottom: '1px solid #333', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Navigation Simulation
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

