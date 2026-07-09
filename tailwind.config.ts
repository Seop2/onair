import type { Config } from "tailwindcss";

// DESIGN.md 색상 토큰은 src/index.css @theme inline에 정의되어 있습니다.
// 이 파일은 CSS 변수로 표현할 수 없는 테마 확장에만 사용합니다.
export default {
  theme: {
    extend: {},
  },
} satisfies Config;
