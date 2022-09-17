import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import viteSvgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin(), viteSvgr()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
