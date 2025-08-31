# backend/main.py

from fastapi import FastAPI
import socketio
from app.api import sio # 분리된 API 라우터를 가져옴

# --- FastAPI 앱 생성 및 설정 ---
app = FastAPI(
    title="Maritiko Simulation API",
    description="API for the real-time vessel dynamics simulation platform.",
    version="1.0.0"
)

# NOTE: FastAPI의 CORSMiddleware는 제거되었습니다.
# python-socketio의 cors_allowed_origins가 이 역할을 더 잘 처리합니다.

# --- 기본 HTTP 엔드포인트 ---
@app.get("/health", tags=["Status"])
async def health_check():
    """서버의 상태를 확인합니다."""
    return {"status": "ok", "message": "Maritiko API is running."}

# --- Socket.IO 앱 마운트 ---
# FastAPI 애플리케이션에 WebSocket 서버를 통합합니다.
socket_app = socketio.ASGIApp(sio)
app.mount("/", socket_app)

