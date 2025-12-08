// 📁 03frontend/vite.config.js
import { defineConfig } from 'vite';  // Import the necessary Vite functionality
import react from '@vitejs/plugin-react';  // This plugin adds support for React

// Define the Vite configuration
export default defineConfig({
  plugins: [react()]  // This enables the React plugin for Vite
});
