# backend/app/api.py

import socketio
from .simulation_manager import SimulationManager
from .models import StartScenarioRequest, ControlUpdateRequest

# --- Socket.IO 서버 및 시뮬레이션 관리자 설정 ---
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins="*")
simulation_manager = SimulationManager(sio)

# --- WebSocket 이벤트 핸들러 ---
@sio.event
async def connect(sid, environ):
    print(f"✅ Client Connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"❌ Client Disconnected: {sid}")
    simulation_manager.end_session(sid)

@sio.event
async def start_scenario(sid, data):
    """Pydantic 모델을 사용하여 데이터 유효성 검사"""
    try:
        request = StartScenarioRequest(**data)
        print(f"🚀 Received start request for scenario: {request.scenario_path} from {sid}")
        await simulation_manager.start_session(sid, request.scenario_path)
    except Exception as e:
        await sio.emit('error', {'message': f'Invalid request data: {e}'}, room=sid)

@sio.event
async def control_update(sid, data):
    """Pydantic 모델을 사용하여 데이터 유효성 검사"""
    try:
        request = ControlUpdateRequest(**data)
        simulation_manager.update_control(sid, request.dict())
    except Exception as e:
        await sio.emit('error', {'message': f'Invalid control data: {e}'}, room=sid)
