// 📁 src/UI/App.js
import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import CameraController from '../camera/CameraController';

function App() {
  const cameraRef = useRef();
  const [color, setColor] = useState('blue');
  const [zoom, setZoom] = useState(5);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Initial background color

  const controller = useRef(new CameraController(cameraRef.current));

  // Dynamically adjust layout based on window size
  useEffect(() => {
    const updateLayout = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      if (cameraRef.current) {
        cameraRef.current.aspect = aspectRatio;
        cameraRef.current.updateProjectionMatrix();
      }

      // Adjust canvas size for max surface area
      document.querySelector('canvas').style.width = `${window.innerWidth}px`;
      document.querySelector('canvas').style.height = `${window.innerHeight - 100}px`;
    };

    window.addEventListener('resize', updateLayout);
    updateLayout(); // Apply layout initially

    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  useEffect(() => {
    controller.current.addEventListeners();
    return () => {
      controller.current.removeEventListeners();
    };
  }, []);

  // Toggle the color between blue and green
  const toggleColor = () => {
    setColor(color === 'blue' ? 'green' : 'blue');
  };

  // Update background color
  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  // Update zoom level
  const handleZoomChange = (e) => {
    setZoom(e.target.value);
  };

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Main Canvas Area */}
      <Canvas style={{ flex: 1, width: '100%', height: '100%' }} background={backgroundColor} shadows>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
        />

        {/* Camera with dynamic aspect ratio */}
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[0, 0, zoom]}
          fov={75} // Fixed FOV
          near={0.1}
          far={1000}
          aspect={window.innerWidth / window.innerHeight} // Dynamic aspect ratio
        />

        {/* 3D Objects */}
        <mesh position={[-2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[2, 0, 0]} castShadow receiveShadow>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </Canvas>

      {/* Control Panel */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '16px' }}>
        <button onClick={toggleColor} style={buttonStyle}>Toggle Color</button>

        <div>
          <label>Background Color: </label>
          <input
            type="color"
            value={backgroundColor}
            onChange={handleBackgroundColorChange}
            style={{ marginLeft: '10px', height: '30px', width: '60px' }}
          />
        </div>

        <div>
          <label>Zoom: </label>
          <input
            type="range"
            min="1"
            max="10"
            value={zoom}
            onChange={handleZoomChange}
            style={{ marginLeft: '10px', width: '200px' }}
          />
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#6200ea',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  marginBottom: '10px',
};

export default App;
