import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';          // Import your main app component
import './index.css';             // Global styles (optional)

const rootElement = document.getElementById('app') as HTMLElement;

// Create the root React component and render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
