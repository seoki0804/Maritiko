# backend/app/simulation_manager.py

import asyncio
import os
import sys
from typing import Dict

# 프로젝트 루트 경로를 추가하여 vds, scenarios 등을 임포트할 수 있도록 함
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from vds.core.simulator import Simulator
from scenarios.scenario_loader import load_scenario

class SimulationManager:
    """
    활성 시뮬레이션 세션을 관리하는 객체지향 클래스.
    Manages active simulation sessions in an object-oriented way.
    """
    def __init__(self, sio):
        self.sio = sio
        self.active_simulators: Dict[str, Dict] = {}

    async def start_session(self, sid: str, scenario_path: str):
        """새로운 시뮬레이션 세션을 시작합니다."""
        if not os.path.exists(scenario_path):
            await self.sio.emit('error', {'message': f'Scenario not found: {scenario_path}'}, room=sid)
            return

        try:
            vessel, dynamics_model, geography, ais_targets, wind, current, waves, initial_control, waypoints = load_scenario(scenario_path)
            simulator = Simulator(vessel, dynamics_model, geography, ais_targets, wind, current, waves)
            simulator.waypoints = waypoints

            self.active_simulators[sid] = {
                "simulator": simulator,
                "control": initial_control.copy(),
                "dt": 0.1
            }
            print(f"🏁 Simulation session started for {sid}.")
            self.sio.start_background_task(self._run_simulation_loop, sid)
        except Exception as e:
            print(f"Error loading scenario for {sid}: {e}")
            await self.sio.emit('error', {'message': str(e)}, room=sid)

    def end_session(self, sid: str):
        """클라이언트 연결 종료 시 세션을 정리합니다."""
        if sid in self.active_simulators:
            del self.active_simulators[sid]
            print(f"🧹 Cleaned up simulation session for {sid}")

    def update_control(self, sid: str, data: dict):
        """해당 세션의 제어 입력을 업데이트합니다."""
        if sid in self.active_simulators:
            session = self.active_simulators[sid]
            session['control']['rpm'] = data.get('rpm', session['control']['rpm'])
            session['control']['rudder_angle'] = data.get('rudder_angle', session['control']['rudder_angle'])

    async def _run_simulation_loop(self, sid: str):
        """백그라운드에서 특정 클라이언트의 시뮬레이션을 실행합니다."""
        if sid not in self.active_simulators:
            return

        session = self.active_simulators[sid]
        simulator = session['simulator']
        dt = session['dt']

        while sid in self.active_simulators:
            simulator.step(dt, session['control'])
            state_data = {
                'time': simulator.time,
                'position': simulator.vessel.state.eta[:2].tolist(),
                'heading_deg': simulator.vessel.heading,
                'sog_kts': simulator.vessel.sog,
                'rot_deg_min': simulator.vessel.rot
            }
            await self.sio.emit('simulation_update', state_data, room=sid)
            await asyncio.sleep(dt)
