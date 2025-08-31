// frontend/prettier.config.js

/** @type {import("prettier").Config} */
module.exports = {
    // Tailwind CSS 클래스 순서를 자동으로 정렬하는 플러그인
    // (예: 'px-2 py-4' -> 'py-4 px-2' 순서가 항상 일정하게 유지됨)
    plugins: ["prettier-plugin-tailwindcss"],
    
    // 한 줄의 최대 길이를 80자로 제한하여 가독성을 높입니다.
    printWidth: 80,
    
    // 탭 너비는 2칸으로 설정합니다. (가장 일반적인 설정)
    tabWidth: 2,
    
    // 문장의 끝에 항상 세미콜론을 사용하도록 강제합니다. (코드 오류 방지)
    semi: true,
    
    // 문자열은 쌍따옴표(") 대신 홑따옴표(')를 사용하도록 통일합니다.
    singleQuote: true,
    
    // 객체나 배열의 마지막 요소 뒤에 항상 쉼표를 붙여, Git 변경 내역을 깔끔하게 유지합니다.
    trailingComma: "all",
    
    // 화살표 함수의 매개변수가 하나일 때도 항상 괄호를 사용하도록 강제합니다. (예: (x) => x)
    arrowParens: "always",
  
    // JSX에서 닫는 꺽쇠(>)를 다음 줄에 배치하지 않고, 같은 줄에 배치합니다.
    jsxBracketSameLine: false,
  };
  
  