/// <reference types="three" />

// Extend and fix any missing or custom types for Three.js, React Three Fiber, etc.

// Declare types for Three.js if missing in the project
declare module 'three' {
  export * from 'three';
}

// Add custom types or specific configurations if necessary for your project
declare global {
  // You can add any additional Three.js object types here, for example:
  interface PerspectiveCamera {
    position: { x: number; y: number; z: number };
    lookAt(target: any): void;
  }
}

// Add specific Three.js extensions or extra declarations for custom behaviors here
