import google.generativeai as genai

# API 키를 직접 코드에 설정합니다.
API_KEY = "AIzaSyDlZni_TMGpKQ49wkQKpIzPP6B5GLfq01U" # 이전 단계에서 사용한 키를 그대로 사용

# API 키로 google-generativeai 패키지를 구성합니다.
genai.configure(api_key=API_KEY)

# 사용할 모델을 'gemini-1.5-flash-latest'로 변경합니다.
model = genai.GenerativeModel('gemini-1.5-flash-latest') # <<<--- 이 부분을 수정했습니다!

# 모델에 요청을 보내고 결과를 받습니다.
try:
    response = model.generate_content("기존 프로젝트에 통합하기 위한 아이디어를 3가지 제안해줘.")
    print(response.text)
except Exception as e:
    print(f"오류 발생: {e}")