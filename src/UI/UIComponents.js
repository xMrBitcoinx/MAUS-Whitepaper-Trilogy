// 📁 src/UI/UIComponents.js

import React from 'react';

const UIComponents = () => {
  return (
    <div style={{ position: 'absolute', top: 20, left: 20, color: 'white' }}>
      <h2>MAUS UI Controls</h2>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#6200ea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Start Engine
      </button>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#6200ea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          marginLeft: '10px',
        }}
      >
        Stop Engine
      </button>
    </div>
  );
};

export default UIComponents;
