Maritiko - 차세대 선박 동역학 시뮬레이션 플랫폼
프로젝트 개요
Maritiko는 고정밀 물리 엔진과 사용자 친화적인 웹 인터페이스를 결합한 차세대 선박 동역학 시뮬레이션 플랫폼입니다. 이 프로젝트는 전문적인 해양 연구, 교육, 그리고 훈련을 위한 강력한 도구를 제공하는 것을 목표로 합니다.

아키텍처
백엔드: Python, FastAPI, WebSocket

프론트엔드: Next.js (React), PixiJS/Three.js

핵심 라이브러리: /vds (기존 Pygame 프로젝트에서 개발한 시뮬레이션 엔진)

개발 환경 설정 및 실행
1. 백엔드 (FastAPI)
가상 환경 생성 및 활성화
# backend 폴더로 이동
cd backend

# 가상환경 생성
python -m venv venv

# 가상환경 활성화 (macOS/Linux)
source venv/bin/activate
# (Windows)
# venv\Scripts\activate

의존성 설치
pip install -r requirements.txt

백엔드 서버 실행
uvicorn main:app --reload

서버가 성공적으로 실행되면, http://127.0.0.1:8000/health 에 접속하여 {"status":"ok"} 메시지를 확인하거나, http://127.0.0.1:8000/docs 에 접속하여 자동 생성된 API 문서를 확인할 수 있습니다.

2. 프론트엔드 (Next.js)
의존성 설치
# frontend 폴더로 이동
cd frontend

# Next.js 및 관련 라이브러리 설치
npm install

프론트엔드 개발 서버 실행
npm run dev

서버가 성공적으로 실행되면, 웹 브라우저에서 http://localhost:3000 에 접속하여 프론트엔드 애플리케이션을 확인할 수 있습니다.