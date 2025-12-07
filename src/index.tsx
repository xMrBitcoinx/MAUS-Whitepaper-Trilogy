// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18+ import for creating the root
import App from './App';  // Your main App component
import './index.css';  // Import your global styles

// Get the root element from the HTML (in index.html)
const rootElement = document.getElementById('root') as HTMLElement;

// Create a React root using ReactDOM.createRoot (React 18+ way)
const root = ReactDOM.createRoot(rootElement);

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
