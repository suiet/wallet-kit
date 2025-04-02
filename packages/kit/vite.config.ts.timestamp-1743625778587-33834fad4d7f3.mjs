// vite.config.ts
import { defineConfig } from "file:///workspaces/wallet-kit/node_modules/.pnpm/vite@5.2.12_@types+node@20.4.2_less@4.2.0_sass@1.56.1_stylus@0.54.8_terser@5.36.0/node_modules/vite/dist/node/index.js";
import react from "file:///workspaces/wallet-kit/node_modules/.pnpm/@vitejs+plugin-react@2.1.0_vite@5.2.12_@types+node@20.4.2_less@4.2.0_sass@1.56.1_stylus@0.54.8_terser@5.36.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { vanillaExtractPlugin } from "file:///workspaces/wallet-kit/node_modules/.pnpm/@vanilla-extract+vite-plugin@3.4.0_ts-node@10.9.2_@types+node@20.4.2_typescript@5.1.6___08490fdc0677b124d577c5fa0e0c7e3c/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js";
import viteSvgr from "file:///workspaces/wallet-kit/node_modules/.pnpm/vite-plugin-svgr@2.2.1_vite@5.2.12_@types+node@20.4.2_less@4.2.0_sass@1.56.1_stylus@0.54.8_terser@5.36.0_/node_modules/vite-plugin-svgr/dist/index.mjs";
import path from "path";
import { visualizer } from "file:///workspaces/wallet-kit/node_modules/.pnpm/rollup-plugin-visualizer@5.9.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "/workspaces/wallet-kit/packages/kit";
var vite_config_default = defineConfig(({ mode }) => ({
  build: {
    target: "es2020",
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "./src/index.ts"),
      fileName: "index",
      name: "suietWalletKit"
    },
    emptyOutDir: false,
    sourcemap: false,
    minify: true,
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@mysten/sui",
        "@mysten/sui/client",
        "@mysten/sui/bcs",
        "@mysten/sui/utils",
        "@mysten/sui/verify",
        "@mysten/sui/transactions"
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps.
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
          "@mysten/sui": "Sui",
          "@mysten/sui/client": "Sui",
          "@mysten/sui/bcs": "Sui",
          "@mysten/sui/utils": "Sui",
          "@mysten/sui/verify": "Sui",
          "@mysten/sui/transactions": "Sui"
        }
      }
    }
  },
  css: {
    modules: {
      localsConvention: "camelCase"
    }
  },
  esbuild: {
    target: "es2020",
    pure: mode === "production" ? ["console.log", "debugger"] : []
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020"
    }
  },
  plugins: [
    react(),
    vanillaExtractPlugin(),
    viteSvgr(),
    visualizer({
      open: false,
      // This opens the visualization in your browser after the build
      filename: "bundle-analysis.html"
      // The output file for the report
    })
  ]
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvd29ya3NwYWNlcy93YWxsZXQta2l0L3BhY2thZ2VzL2tpdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3dvcmtzcGFjZXMvd2FsbGV0LWtpdC9wYWNrYWdlcy9raXQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3dvcmtzcGFjZXMvd2FsbGV0LWtpdC9wYWNrYWdlcy9raXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgdmFuaWxsYUV4dHJhY3RQbHVnaW4gfSBmcm9tIFwiQHZhbmlsbGEtZXh0cmFjdC92aXRlLXBsdWdpblwiO1xuaW1wb3J0IHZpdGVTdmdyIGZyb20gXCJ2aXRlLXBsdWdpbi1zdmdyXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiBcImVzMjAyMFwiLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvaW5kZXgudHNcIiksXG4gICAgICBmaWxlTmFtZTogXCJpbmRleFwiLFxuICAgICAgbmFtZTogXCJzdWlldFdhbGxldEtpdFwiLFxuICAgIH0sXG4gICAgZW1wdHlPdXREaXI6IGZhbHNlLFxuICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgbWluaWZ5OiB0cnVlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXG4gICAgICAgIFwicmVhY3RcIixcbiAgICAgICAgXCJyZWFjdC1kb21cIixcbiAgICAgICAgXCJyZWFjdC9qc3gtcnVudGltZVwiLFxuICAgICAgICBcIkBteXN0ZW4vc3VpXCIsXG4gICAgICAgIFwiQG15c3Rlbi9zdWkvY2xpZW50XCIsXG4gICAgICAgIFwiQG15c3Rlbi9zdWkvYmNzXCIsXG4gICAgICAgIFwiQG15c3Rlbi9zdWkvdXRpbHNcIixcbiAgICAgICAgXCJAbXlzdGVuL3N1aS92ZXJpZnlcIixcbiAgICAgICAgXCJAbXlzdGVuL3N1aS90cmFuc2FjdGlvbnNcIixcbiAgICAgIF0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgLy8gUHJvdmlkZSBnbG9iYWwgdmFyaWFibGVzIHRvIHVzZSBpbiB0aGUgVU1EIGJ1aWxkXG4gICAgICAgIC8vIGZvciBleHRlcm5hbGl6ZWQgZGVwcy5cbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHJlYWN0OiBcIlJlYWN0XCIsXG4gICAgICAgICAgXCJyZWFjdC1kb21cIjogXCJSZWFjdERPTVwiLFxuICAgICAgICAgIFwicmVhY3QvanN4LXJ1bnRpbWVcIjogXCJyZWFjdC9qc3gtcnVudGltZVwiLFxuICAgICAgICAgIFwiQG15c3Rlbi9zdWlcIjogXCJTdWlcIixcbiAgICAgICAgICBcIkBteXN0ZW4vc3VpL2NsaWVudFwiOiBcIlN1aVwiLFxuICAgICAgICAgIFwiQG15c3Rlbi9zdWkvYmNzXCI6IFwiU3VpXCIsXG4gICAgICAgICAgXCJAbXlzdGVuL3N1aS91dGlsc1wiOiBcIlN1aVwiLFxuICAgICAgICAgIFwiQG15c3Rlbi9zdWkvdmVyaWZ5XCI6IFwiU3VpXCIsXG4gICAgICAgICAgXCJAbXlzdGVuL3N1aS90cmFuc2FjdGlvbnNcIjogXCJTdWlcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgbW9kdWxlczoge1xuICAgICAgbG9jYWxzQ29udmVudGlvbjogXCJjYW1lbENhc2VcIixcbiAgICB9LFxuICB9LFxuICBlc2J1aWxkOiB7XG4gICAgdGFyZ2V0OiBcImVzMjAyMFwiLFxuICAgIHB1cmU6IG1vZGUgPT09IFwicHJvZHVjdGlvblwiID8gW1wiY29uc29sZS5sb2dcIiwgXCJkZWJ1Z2dlclwiXSA6IFtdLFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgdGFyZ2V0OiBcImVzMjAyMFwiLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHZhbmlsbGFFeHRyYWN0UGx1Z2luKCksXG4gICAgdml0ZVN2Z3IoKSxcbiAgICB2aXN1YWxpemVyKHtcbiAgICAgIG9wZW46IGZhbHNlLCAvLyBUaGlzIG9wZW5zIHRoZSB2aXN1YWxpemF0aW9uIGluIHlvdXIgYnJvd3NlciBhZnRlciB0aGUgYnVpbGRcbiAgICAgIGZpbGVuYW1lOiBcImJ1bmRsZS1hbmFseXNpcy5odG1sXCIsIC8vIFRoZSBvdXRwdXQgZmlsZSBmb3IgdGhlIHJlcG9ydFxuICAgIH0pLFxuICBdLFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUixTQUFTLG9CQUFvQjtBQUN4VCxPQUFPLFdBQVc7QUFDbEIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sVUFBVTtBQUNqQixTQUFTLGtCQUFrQjtBQUwzQixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNILE9BQU8sS0FBSyxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLE1BQy9DLFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBUTtBQUFBO0FBQUE7QUFBQSxRQUdOLFNBQVM7QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxVQUNiLHFCQUFxQjtBQUFBLFVBQ3JCLGVBQWU7QUFBQSxVQUNmLHNCQUFzQjtBQUFBLFVBQ3RCLG1CQUFtQjtBQUFBLFVBQ25CLHFCQUFxQjtBQUFBLFVBQ3JCLHNCQUFzQjtBQUFBLFVBQ3RCLDRCQUE0QjtBQUFBLFFBQzlCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxrQkFBa0I7QUFBQSxJQUNwQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFFBQVE7QUFBQSxJQUNSLE1BQU0sU0FBUyxlQUFlLENBQUMsZUFBZSxVQUFVLElBQUksQ0FBQztBQUFBLEVBQy9EO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixnQkFBZ0I7QUFBQSxNQUNkLFFBQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04scUJBQXFCO0FBQUEsSUFDckIsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBO0FBQUEsTUFDTixVQUFVO0FBQUE7QUFBQSxJQUNaLENBQUM7QUFBQSxFQUNIO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
