import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',          // 필수
        setupFiles: './tests/setup.ts', // 전역 세팅
        globals: true,                  // describe / it 전역
        css: true,                      // CSS 모듈 import 허용
    },
});
