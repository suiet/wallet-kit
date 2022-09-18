import { build, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import viteSvgr from 'vite-plugin-svgr';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const libraries = [
  {
    entry: path.resolve(__dirname, './src/components/index.ts'),
    fileName: 'components',
  },
  {
    entry: path.resolve(__dirname, './src/index.ts'),
    fileName: 'index',
  },
];

libraries.forEach(async (lib) => {
  await build(
    defineConfig({
      plugins: [
        react({
          jsxRuntime: 'classic',
        }),
        vanillaExtractPlugin(),
        viteSvgr(),
      ],
      css: {
        modules: {
          localsConvention: 'camelCase',
        },
      },
      build: {
        lib: lib,
        emptyOutDir: false,
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            // Provide global variables to use in the UMD build
            // for externalized deps
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
      },
    })
  );
});
