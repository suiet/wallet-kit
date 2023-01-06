import resolvePlugin from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import cjs2es from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { defineConfig } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import * as path from 'path';

const config = defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
  },
  external: ['@mysten/sui.js'],
  plugins: [
    // polyfill nodejs built-in and global modules
    nodePolyfills({
      // include: ['process']
    }),
    // fetch node_modules contents
    resolvePlugin({
      browser: true, // specify that it's built for browser
    }),
    // compile ts files
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    }),
    // convert commonjs module to es module for rollup to bundle
    cjs2es(), // must place before babel
    // compile js to es5 compatible, friendly to browsers
    babel({
      babelHelpers: 'bundled',
      exclude: '**/node_modules/**',
    }),
    // enable json loading
    json(),
  ],
});

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(terser()); // minify output files
}

export default config;
