import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import postcss from "rollup-plugin-postcss";
import {visualizer} from 'rollup-plugin-visualizer';
import { terser } from 'rollup-plugin-terser';
// import svg from 'rollup-plugin-svg';
import svgr from '@svgr/rollup';
import cleaner from 'rollup-plugin-cleaner';
import {summary} from "rollup-plugin-summary";

import * as path from 'path'
import {defineConfig} from "rollup";

export default defineConfig({
  input: './src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    // preserveModules: true,
    // preserveModulesRoot: 'src',
    sourcemap: true,
  },
  plugins: [
    cleaner({
      targets: [
        './dist'
      ]
    }),
    nodePolyfills(),
    resolve({
      browser: true, // specify that it's built for browser
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
    }),
    svgr(),
    postcss({
      extract: path.resolve('./dist/style.css')
    }),
    // terser(),
    // visualizer({
    //   filename: 'bundle-analysis.html',
    //   open: true,
    // }),
    // summary({
    //   warnLow: 1000,
    //   warnHigh: 3000,
    //   showMinifiedSize: false,
    // }),
  ],
  external: ['react', 'react-dom'],
})