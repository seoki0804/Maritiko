// frontend/pages/index.tsx

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

// 시뮬레이션 데이터의 타입을 정의하여 코드 안정성 확보
interface SimulationState {
  time: number;
  position: [number, number];
  heading_deg: number;
  sog_kts: number;
  rot_deg_min: number;
}

const BACKEND_URL = 'http://127.0.0.1:8000';

const HomePage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [simulationState, setSimulationState] = useState<SimulationState | null>(null);

  // 컴포넌트가 처음 렌더링될 때 WebSocket 연결을 설정
  useEffect(() => {
    // Socket.IO 클라이언트 인스턴스 생성
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);

    // 연결 성공 시 호출되는 이벤트 리스너
    newSocket.on('connect', () => {
      console.log('✅ Connected to backend WebSocket!');
      setIsConnected(true);
    });
    
    // 백엔드로부터 실시간 시뮬레이션 데이터를 받았을 때 호출
    newSocket.on('simulation_update', (data: SimulationState) => {
      setSimulationState(data);
    });

    // 연결 끊김 시 호출되는 이벤트 리스너
    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from backend WebSocket.');
      setIsConnected(false);
    });

    // 컴포넌트가 사라질 때 연결을 정리
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // "Start Simulation" 버튼 클릭 시 호출되는 함수
  const handleStartSimulation = () => {
    if (socket) {
      // 백엔드로 시나리오 시작 이벤트를 전송
      socket.emit('start_scenario', { 
        scenario_path: 'scenarios/busan_port_approach.yaml' 
      });
      console.log('🚀 Sent start request for Busan Port scenario.');
    }
  };

  return (
    <div style={{ fontFamily: 'monospace', padding: '2rem', color: '#eee', backgroundColor: '#112' }}>
      <h1>Maritiko Frontend</h1>
      <p>Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
      
      <button onClick={handleStartSimulation} style={{ padding: '10px', margin: '10px 0' }}>
        Start Busan Port Scenario
      </button>

      <hr style={{ margin: '2rem 0' }} />

      <h2>Live Simulation Data:</h2>
      {simulationState ? (
        <div>
          <p>Time: {simulationState.time.toFixed(1)} s</p>
          <p>Position (N, E): {simulationState.position[0].toFixed(1)}, {simulationState.position[1].toFixed(1)} m</p>
          <p>Heading: {simulationState.heading_deg.toFixed(1)} °</p>
          <p>SOG: {simulationState.sog_kts.toFixed(2)} kts</p>
          <p>ROT: {simulationState.rot_deg_min.toFixed(1)} °/min</p>
        </div>
      ) : (
        <p>Waiting for simulation data...</p>
      )}
    </div>
  );
};

export default HomePage;
    