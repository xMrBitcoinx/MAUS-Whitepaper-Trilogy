// 01frontend/maus-ui/src/controls/RaycastController.jsx
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RaycastController({ setSelected }) {
  const { camera, scene, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const hovered = useRef(null);

  // Mouse position + click listener
  useEffect(() => {
    const handlePointerMove = (event) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.current.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleClick = () => {
      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );

      if (intersects.length > 0) {
        const obj = intersects[0].object;
        const name = obj.name || obj.uuid;

        console.log("MAUS RAYCAST HIT:", name, obj);

        if (typeof setSelected === "function") {
          setSelected(name);
        }
      }
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("click", handleClick);
    };
  }, [camera, scene, gl, setSelected]);

  // Optional hover tracking
  useFrame(() => {
    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      hovered.current = intersects[0].object;
    } else {
      hovered.current = null;
    }
  });

  return null;
}
