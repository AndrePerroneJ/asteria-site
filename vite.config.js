import { createRequire } from "node:module";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const require = createRequire(import.meta.url);
const { handleContact } = require("./server/contact.js");

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "contact-api",
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          if (handleContact(request, response)) return;
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
