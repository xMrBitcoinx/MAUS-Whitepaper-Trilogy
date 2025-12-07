import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,       // Port for development server
    open: true,       // Open the browser automatically when starting the server
  },
  build: {
    outDir: 'dist',   // Output directory for the build
    assetsDir: 'assets', // Directory to store assets like images, fonts, etc.
    sourcemap: true,  // Enable sourcemaps for production build (optional)
  },
  resolve: {
    alias: {
      '@': '/src',    // Set up a shortcut for the src folder
    },
  },
});
