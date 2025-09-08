import google.generativeai as genai

# 사용 중인 API 키를 여기에 넣으세요.
API_KEY = "AIzaSyDlZni_TMGpKQ49wkQKpIzPP6B5GLfq01U"
genai.configure(api_key=API_KEY)

print("사용 가능한 모델 목록:")
for m in genai.list_models():
  # generateContent 메서드를 지원하는 모델만 필터링해서 보여줍니다.
  if 'generateContent' in m.supported_generation_methods:
    print(m.name)