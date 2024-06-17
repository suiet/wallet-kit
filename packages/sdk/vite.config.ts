// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => ({
  build: {
    target: "es2020",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "suietWalletSdk",
      // the proper extensions will be added
      fileName: "index",
    },
    sourcemap: false,
    minify: true,
    esbuild: {
      target: "es2020",
      pure: mode === "production" ? ["console.log", "debugger"] : [],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "@mysten/sui",
        "@mysten/sui/client",
        "@mysten/sui/bcs",
        "@mysten/sui/utils",
        "@mysten/sui/verify",
        "@mysten/sui/transactions",
      ],
      output: {
        globals: {
          "@mysten/sui": "Sui",
          "@mysten/sui/client": "Sui",
          "@mysten/sui/bcs": "Sui",
          "@mysten/sui/utils": "Sui",
          "@mysten/sui/verify": "Sui",
          "@mysten/sui/transactions": "Sui",
        },
      },
    },
  },
  plugins: [
    dts(),
    visualizer({
      open: false, // This opens the visualization in your browser after the build
      filename: "bundle-analysis.html", // The output file for the report
    }),
  ],
}));
