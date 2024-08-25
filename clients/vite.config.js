import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    fs: {
      allow: [
        '/home/davy/New Folder/online_marketplace/clients',
        '/home/davy/.nvm/versions/node/v22.7.0/lib/node_modules/vite/dist/client',
        '/home/davy/New Folder/online_marketplace/node_modules/slick-carousel/slick/fonts'
      ]
    }
  }
});
