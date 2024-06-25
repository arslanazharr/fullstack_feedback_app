import { defineConfig } from "vite";
import { config } from "dotenv";
import react from "@vitejs/plugin-react";

config();

export default defineConfig({
  define: {
    // eslint-disable-next-line no-undef
    "process.env": process.env,
  },
  plugins: [react()],
});
