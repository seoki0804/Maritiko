# Maritiko 🌊

## 📝 프로젝트 소개

**Maritiko**는 해양 분야 연구자들을 위한 데이터 분석 및 시뮬레이션 플랫폼입니다. 복잡한 해양 데이터를 시각화하고, 다양한 시나리오를 테스트하여 연구의 효율성을 높이는 것을 목표로 합니다.

-----

## ✨ 주요 기능

  * **데이터 시각화**: `visualize_log.py`를 통해 로그 데이터를 시각화하여 직관적인 분석을 지원합니다.
  * **시나리오 기반 테스트**: `scenarios` 폴더를 통해 다양한 연구 시나리오를 설정하고 테스트할 수 있습니다.
  * **모듈화된 구조**: `backend`, `vds` 등 기능별로 모듈화된 구조를 통해 코드의 유지보수 및 확장이 용이합니다.
  * **테스트 자동화**: `tests` 폴더 및 `pytest.ini` 설정을 통해 코드의 안정성을 보장합니다.

-----

### 🛠️ Tech Stack


#### **Frontend**

| 기술 | 배지 | 코드 |
| :--- | :--- | :--- |
| **Next.js** |  | `![Next JS](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)` |
| **React** |  | `![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)` |
| **JavaScript**|  | `![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)` |
| **TypeScript**|  | `![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)` |
| **HTML5** |  | `![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)` |
| **CSS3** |  | `![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)` |
| **Sass** |  | `![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)` |
| **Tailwind** |  | `![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)` |

#### **Backend**

| **Python** |  | `![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)` |
| **Node.js** |  | `![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)` |
| **FastAPI**|  | `![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)` |

#### **Tools & Collaboration**

| **Git** |  | `![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)` |
| **GitHub** |  | `![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)` |
| **Figma** |  | `![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)` |
| **Vercel** |  | `![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)` |
| **Notion** |  | `![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)` |

-----

## 🗂️ 프로젝트 구조

```
.
├── _archive
├── backend
├── data
├── output
├── scenarios
├── tests
├── vds
├── README.md
├── main.py
├── pytest.ini
├── requirements.txt
└── visualize_log.py
```

-----

## ⚙️ 설치 및 실행

1.  **레포지토리 클론**
    ```bash
    git clone https://github.com/seoki0804/Maritiko.git
    cd Maritiko
    ```
2.  **가상 환경 생성 및 활성화**
    ```bash
    python -m venv venv
    source venv/bin/activate  # Windows: venv\Scripts\activate
    ```
3.  **필요한 라이브러리 설치**
    ```bash
    pip install -r requirements.txt
    ```
4.  **프로그램 실행**
    ```bash
    python main.py
    ```
