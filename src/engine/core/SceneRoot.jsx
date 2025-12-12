// src/engine/core/SceneRoot.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MAUSCameraController from "../camera/MAUSCameraController";
import RoomManager from "../rooms/RoomManager";

export default function SceneRoot() {
    return (
        <Canvas
            camera={{ position: [0, 2, 6], fov: 60 }}
            style={{ width: "100vw", height: "100vh" }}
        >
            {/* Camera System */}
            <MAUSCameraController />
            <OrbitControls enableDamping dampingFactor={0.1} />

            {/* Global Lighting */}
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.2} />

            {/* MAUS Room System */}
            <RoomManager />
        </Canvas>
    );
}
