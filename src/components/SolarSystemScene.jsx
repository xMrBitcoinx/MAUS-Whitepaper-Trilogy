import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

export default function SolarSystemScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />

      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial color={"#ffaa00"} emissive={"orange"} />
      </mesh>

      <pointLight position={[10, 10, 10]} intensity={2} />
    </Canvas>
  );
}
