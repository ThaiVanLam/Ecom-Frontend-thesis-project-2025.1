import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   host: "0.0.0.0", // Cho phép truy cập từ mọi địa chỉ
  //   port: 5173,
  //   strictPort: true,
  //   allowedHosts: [
  //     "https://pictures-rebate-mine-made.trycloudflare.com", // Thêm domain của bạn, Frontend tunnel URL
  //     ".trycloudflare.com", // Cho phép tất cả subdomain trycloudflare
  //   ],
  //   hmr: {
  //     protocol: "wss", // WebSocket Secure
  //     host: "https://pictures-rebate-mine-made.trycloudflare.com", //Frontend tunnel URL
  //     port: 443,
  //     clientPort: 443,
  //   },
  // },
});
