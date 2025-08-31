# backend/app/models.py

from pydantic import BaseModel
from typing import List

class StartScenarioRequest(BaseModel):
    """시나리오 시작 요청 모델"""
    scenario_path: str

class ControlUpdateRequest(BaseModel):
    """사용자 제어 입력 모델"""
    rpm: float
    rudder_angle: float

class SimulationUpdateResponse(BaseModel):
    """실시간 시뮬레이션 상태 응답 모델"""
    time: float
    position: List[float]
    heading_deg: float
    sog_kts: float
    rot_deg_min: float
