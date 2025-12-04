// 01frontend/maus-ui/src/engine/EngineBridge.jsx
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import MAUSEngine from "./MAUSEngine.js";
import MAUSWorld from "./MAUSWorld.js";

export default function EngineBridge() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const engine = new MAUSEngine({ renderer: gl, scene });
    const world = new MAUSWorld();

    engine.loadWorld(world);
    engine.start();

    return () => {
      engine.stop();
    };
  }, [gl, scene]);

  return null;
}
