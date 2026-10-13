import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/kesif-dunyasi/' : '/',
  plugins: [vue()],
}));
