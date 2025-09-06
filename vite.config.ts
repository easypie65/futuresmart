import path from "path";
import { defineConfig, loadEnv } from "vite";

// ✅ Vite 설정
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    // ✅ GitHub Pages 프로젝트 경로 (리포 이름 넣기)
    base: "/futuresmart/",

    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
