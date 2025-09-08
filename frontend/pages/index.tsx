// frontend/pages/index.tsx

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { Box, Button, Paper, Typography } from '@mui/material';

interface SimulationState {
  time: number;
  position: [number, number];
  heading_deg: number;
  sog_kts: number;
  rot_deg_min: number;
}

const BACKEND_URL = 'http://127.0.0.1:8000';

const NavigationPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [simulationState, setSimulationState] = useState<SimulationState | null>(null);

  useEffect(() => {
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);
    newSocket.on('connect', () => setIsConnected(true));
    newSocket.on('simulation_update', (data: SimulationState) => setSimulationState(data));
    newSocket.on('disconnect', () => setIsConnected(false));
    return () => { newSocket.disconnect(); };
  }, []);

  const handleStartSimulation = () => {
    if (socket) {
      socket.emit('start_scenario', { 
        scenario_path: 'scenarios/busan_port_approach.yaml' 
      });
    }
  };

  return (
    <Box sx={{ color: '#eee' }}>
      <Box sx={{ mb: 2 }}>
        <Typography>
          Connection Status: 
          <Box component="span" sx={{ color: isConnected ? 'success.main' : 'error.main', ml: 1 }}>
            {isConnected ? 'Online' : 'Offline'}
          </Box>
        </Typography>
        <Button variant="contained" onClick={handleStartSimulation} sx={{ my: 2 }}>
          Start Busan Port Scenario
        </Button>
      </Box>
      
      {/* TODO: Replace this with the actual PixiJS canvas */}
      <Paper elevation={3} sx={{ p: 2, bgcolor: '#2a2a2a', fontFamily: 'monospace' }}>
        <Typography variant="h6" gutterBottom>Live Data Stream</Typography>
        {simulationState ? (
          <>
            <Typography>Time: {simulationState.time.toFixed(1)} s</Typography>
            <Typography>Position (N, E): {simulationState.position[0].toFixed(1)}, {simulationState.position[1].toFixed(1)} m</Typography>
            <Typography>Heading: {simulationState.heading_deg.toFixed(1)} °</Typography>
          </>
        ) : <Typography>Waiting for data...</Typography>}
      </Paper>
    </Box>
  );
};

export default NavigationPage;

