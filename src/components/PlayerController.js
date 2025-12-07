// 📁 03frontend/src/components/PlayerController.js

import { useState, useEffect } from 'react';
import { Vector3 } from 'three';

const PlayerController = ({ camera }) => {
  const [movementSpeed] = useState(0.1); // Set player movement speed

  useEffect(() => {
    const handleMovement = (event) => {
      const direction = new Vector3();

      // Check key presses and move the camera accordingly
      if (event.key === 'w') { // Move forward
        direction.z = -movementSpeed;
      }
      if (event.key === 's') { // Move backward
        direction.z = movementSpeed;
      }
      if (event.key === 'a') { // Move left
        direction.x = -movementSpeed;
      }
      if (event.key === 'd') { // Move right
        direction.x = movementSpeed;
      }

      // Apply movement to the camera
      camera.position.add(direction);
    };

    // Add event listener for keydown
    window.addEventListener('keydown', handleMovement);

    // Clean up event listener on unmount
    return () => window.removeEventListener('keydown', handleMovement);
  }, [camera, movementSpeed]);

  return null;
};

export default PlayerController;
