// frontend/pages/index.tsx

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import dynamic from 'next/dynamic'; // Dynamic import를 위해 추가
import { Box } from '@mui/material';

// --- FIXED: Dynamically import the canvas component with SSR turned off ---
// SimulationCanvas는 브라우저 환경에서만 렌더링되도록 설정합니다.
const SimulationCanvas = dynamic(
  () => import('@/components/SimulationCanvas'),
  { ssr: false }
);

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
    <Box className="w-full h-full flex flex-col p-4 text-gray-200">
      <div className="flex-shrink-0">
        <h1 className="text-3xl font-bold">Navigation Module</h1>
        <p>
          Connection: 
          <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
            {isConnected ? ' Online' : ' Offline'}
          </span>
        </p>
        
        <button 
          onClick={handleStartSimulation} 
          className="px-4 py-2 my-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          Start Busan Port Scenario
        </button>
      </div>

      <Box className="flex-grow mt-4">
        <SimulationCanvas state={simulationState} />
      </Box>
    </Box>
  );
};

export default NavigationPage;

