import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // Cho phép truy cập từ mọi địa chỉ
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "supervision-prepaid-gate-tiny.trycloudflare.com", // Thêm domain của bạn
      ".trycloudflare.com", // Cho phép tất cả subdomain trycloudflare
    ],
    hmr: {
      protocol: "wss", // WebSocket Secure
      host: "supervision-prepaid-gate-tiny.trycloudflare.com",
      port: 443,
      clientPort: 443,
    },
  },
});
