// src/engine/camera/MAUSCameraController.jsx

import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function MAUSCameraController() {
    const { camera } = useThree();
    const velocity = useRef({ x: 0, y: 0, z: 0 });

    const speed = 0.08;
    const friction = 0.9;

    const keys = useRef({
        w: false,
        a: false,
        s: false,
        d: false,
        Shift: false,
        Space: false,
    });

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (keys.current[e.key] !== undefined) {
                keys.current[e.key] = true;
            }
        };

        const handleKeyUp = (e) => {
            if (keys.current[e.key] !== undefined) {
                keys.current[e.key] = false;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    useFrame(() => {
        let forward = keys.current.w ? -speed : keys.current.s ? speed : 0;
        let strafe = keys.current.a ? -speed : keys.current.d ? speed : 0;
        let vertical = keys.current.Space ? speed : keys.current.Shift ? -speed : 0;

        velocity.current.x = (velocity.current.x + strafe) * friction;
        velocity.current.y = (velocity.current.y + vertical) * friction;
        velocity.current.z = (velocity.current.z + forward) * friction;

        camera.position.x += velocity.current.x;
        camera.position.y += velocity.current.y;
        camera.position.z += velocity.current.z;
    });

    return null;
}
