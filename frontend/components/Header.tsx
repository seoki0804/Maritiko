// frontend/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1e2124', borderBottom: '1px solid #333', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Navigation Simulation
        </Typography>
        {/* TODO: 여기에 시나리오 이름, 사용자 정보 등을 추가할 수 있습니다. */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

