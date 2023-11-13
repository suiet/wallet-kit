// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import inject from "@rollup/plugin-inject";

export default defineConfig(({ mode }) => ({
  build: {
    target: "es2020",
    commonjsOptions: {
      // vite build use @rollup/plugin-commonjs as default, which transforms all the cjs files
      // However Sui Sdk mixed using esm & cjs，therefore should turn on transformMixedEsModules.
      // https://github.com/originjs/vite-plugins/issues/9#issuecomment-924668456
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "suietWalletSdk",
      // the proper extensions will be added
      fileName: "index",
    },
    esbuild: {
      target: "es2020",
      pure: mode === "production" ? ["console.log", "debugger"] : [],
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "es2020",
        define: {
          global: "globalThis",
        },
      },
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["@mysten/sui.js"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          "@mysten/sui.js": "Sui",
        },
      },
      plugins: [inject({ Buffer: ["buffer", "Buffer"] })],
    },
  },
  plugins: [dts()],
}));
