// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts';

export default defineConfig(({mode}) => ({
  build: {
    target: 'es2020',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'suietWalletSdk',
      // the proper extensions will be added
      fileName: 'index',
    },
    esbuild: {
      target: "es2020",
      pure: mode === 'production' ? ['console.log', 'debugger'] : [],
    },
    optimizeDeps: {
      esbuildOptions : {
        target: "es2020"
      }
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['@mysten/sui.js'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          '@mysten/sui.js': 'Sui',
        },
      },
    },
  },
  plugins: [dts()],
}))
