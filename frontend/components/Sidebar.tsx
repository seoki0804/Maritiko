// frontend/components/Sidebar.tsx
import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Tooltip } from '@mui/material';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import EngineeringIcon from '@mui/icons-material/Engineering';
import WidgetsIcon from '@mui/icons-material/Widgets';
import GavelIcon from '@mui/icons-material/Gavel';

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // 현재 선택된 메뉴의 인덱스를 관리합니다.

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    // TODO: 실제로 해당 모듈 페이지로 이동하는 라우팅 로직을 추가해야 합니다.
  };

  const modules = [
    { text: 'Navigation', icon: <DirectionsBoatIcon /> },
    { text: 'Engine Room', icon: <EngineeringIcon /> },
    { text: 'Cargo Ops', icon: <WidgetsIcon /> },
    { text: 'Regulations', icon: <GavelIcon /> },
  ];

  return (
    <Box sx={{ 
      width: 240, 
      height: '100vh', 
      bgcolor: '#1e2124', // 약간 더 밝은 다크 색상
      color: '#e0e0e0', 
      borderRight: '1px solid #333',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <List sx={{ p: 0 }}>
        <ListItem sx={{ height: '64px', display: 'flex', alignItems: 'center', pl: 2 }}>
          <ListItemText 
            primary="Maritiko" 
            primaryTypographyProps={{ 
              fontSize: '1.6rem', 
              fontWeight: 'bold', 
              letterSpacing: '1px',
              color: '#00aaff' 
            }} 
          />
        </ListItem>
        <Divider sx={{ bgcolor: '#444' }} />
        {modules.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <Tooltip title={item.text} placement="right" arrow>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index)}
                sx={{
                  py: 1.5,
                  px: 2,
                  transition: 'background-color 0.2s ease-in-out, border-left 0.2s ease-in-out', // 부드러운 전환 효과
                  borderLeft: '4px solid transparent', // 기본 상태에서는 테두리가 보이지 않음
                  '&:hover': {
                    bgcolor: '#36393f', // 마우스 오버 시 배경색
                  },
                  '&.Mui-selected': { // 선택된 항목에 대한 스타일
                    bgcolor: 'rgba(0, 170, 255, 0.15)',
                    borderLeft: '4px solid #00aaff',
                    '&:hover': {
                      bgcolor: 'rgba(0, 170, 255, 0.25)',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: selectedIndex === index ? '#00aaff' : '#a0a0a0', // 선택 시 아이콘 색상 변경
                  minWidth: '40px',
                  transition: 'color 0.2s ease-in-out',
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;

