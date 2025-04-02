// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///workspaces/wallet-kit/node_modules/.pnpm/vite@5.2.12_@types+node@20.4.2_less@4.2.0_sass@1.79.5_stylus@0.54.8_terser@5.36.0/node_modules/vite/dist/node/index.js";
import dts from "file:///workspaces/wallet-kit/node_modules/.pnpm/vite-plugin-dts@2.3.0_@types+node@20.4.2_vite@5.2.12_@types+node@20.4.2_less@4.2.0_sass_540325b657109dc45dff47598840b5e5/node_modules/vite-plugin-dts/dist/index.mjs";
import { visualizer } from "file:///workspaces/wallet-kit/node_modules/.pnpm/rollup-plugin-visualizer@5.9.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "/workspaces/wallet-kit/packages/sdk";
var vite_config_default = defineConfig(({ mode }) => ({
  build: {
    target: "es2020",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "suietWalletSdk",
      // the proper extensions will be added
      fileName: "index"
    },
    sourcemap: false,
    minify: true,
    esbuild: {
      target: "es2020",
      pure: mode === "production" ? ["console.log", "debugger"] : []
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
        "@mysten/sui/transactions"
      ],
      output: {
        globals: {
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
  plugins: [
    dts(),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvd29ya3NwYWNlcy93YWxsZXQta2l0L3BhY2thZ2VzL3Nka1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3dvcmtzcGFjZXMvd2FsbGV0LWtpdC9wYWNrYWdlcy9zZGsvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3dvcmtzcGFjZXMvd2FsbGV0LWtpdC9wYWNrYWdlcy9zZGsvdml0ZS5jb25maWcudHNcIjsvLyB2aXRlLmNvbmZpZy5qc1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBidWlsZDoge1xuICAgIHRhcmdldDogXCJlczIwMjBcIixcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaW5kZXgudHNcIiksXG4gICAgICBuYW1lOiBcInN1aWV0V2FsbGV0U2RrXCIsXG4gICAgICAvLyB0aGUgcHJvcGVyIGV4dGVuc2lvbnMgd2lsbCBiZSBhZGRlZFxuICAgICAgZmlsZU5hbWU6IFwiaW5kZXhcIixcbiAgICB9LFxuICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgbWluaWZ5OiB0cnVlLFxuICAgIGVzYnVpbGQ6IHtcbiAgICAgIHRhcmdldDogXCJlczIwMjBcIixcbiAgICAgIHB1cmU6IG1vZGUgPT09IFwicHJvZHVjdGlvblwiID8gW1wiY29uc29sZS5sb2dcIiwgXCJkZWJ1Z2dlclwiXSA6IFtdLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gbWFrZSBzdXJlIHRvIGV4dGVybmFsaXplIGRlcHMgdGhhdCBzaG91bGRuJ3QgYmUgYnVuZGxlZFxuICAgICAgLy8gaW50byB5b3VyIGxpYnJhcnlcbiAgICAgIGV4dGVybmFsOiBbXG4gICAgICAgIFwiQG15c3Rlbi9zdWlcIixcbiAgICAgICAgXCJAbXlzdGVuL3N1aS9jbGllbnRcIixcbiAgICAgICAgXCJAbXlzdGVuL3N1aS9iY3NcIixcbiAgICAgICAgXCJAbXlzdGVuL3N1aS91dGlsc1wiLFxuICAgICAgICBcIkBteXN0ZW4vc3VpL3ZlcmlmeVwiLFxuICAgICAgICBcIkBteXN0ZW4vc3VpL3RyYW5zYWN0aW9uc1wiLFxuICAgICAgXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgXCJAbXlzdGVuL3N1aVwiOiBcIlN1aVwiLFxuICAgICAgICAgIFwiQG15c3Rlbi9zdWkvY2xpZW50XCI6IFwiU3VpXCIsXG4gICAgICAgICAgXCJAbXlzdGVuL3N1aS9iY3NcIjogXCJTdWlcIixcbiAgICAgICAgICBcIkBteXN0ZW4vc3VpL3V0aWxzXCI6IFwiU3VpXCIsXG4gICAgICAgICAgXCJAbXlzdGVuL3N1aS92ZXJpZnlcIjogXCJTdWlcIixcbiAgICAgICAgICBcIkBteXN0ZW4vc3VpL3RyYW5zYWN0aW9uc1wiOiBcIlN1aVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgZHRzKCksXG4gICAgdmlzdWFsaXplcih7XG4gICAgICBvcGVuOiBmYWxzZSwgLy8gVGhpcyBvcGVucyB0aGUgdmlzdWFsaXphdGlvbiBpbiB5b3VyIGJyb3dzZXIgYWZ0ZXIgdGhlIGJ1aWxkXG4gICAgICBmaWxlbmFtZTogXCJidW5kbGUtYW5hbHlzaXMuaHRtbFwiLCAvLyBUaGUgb3V0cHV0IGZpbGUgZm9yIHRoZSByZXBvcnRcbiAgICB9KSxcbiAgXSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLGVBQWU7QUFDeEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsa0JBQWtCO0FBSjNCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxNQUFNO0FBQUE7QUFBQSxNQUVOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixTQUFTO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixNQUFNLFNBQVMsZUFBZSxDQUFDLGVBQWUsVUFBVSxJQUFJLENBQUM7QUFBQSxJQUMvRDtBQUFBLElBQ0EsZUFBZTtBQUFBO0FBQUE7QUFBQSxNQUdiLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxlQUFlO0FBQUEsVUFDZixzQkFBc0I7QUFBQSxVQUN0QixtQkFBbUI7QUFBQSxVQUNuQixxQkFBcUI7QUFBQSxVQUNyQixzQkFBc0I7QUFBQSxVQUN0Qiw0QkFBNEI7QUFBQSxRQUM5QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBO0FBQUEsTUFDTixVQUFVO0FBQUE7QUFBQSxJQUNaLENBQUM7QUFBQSxFQUNIO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
