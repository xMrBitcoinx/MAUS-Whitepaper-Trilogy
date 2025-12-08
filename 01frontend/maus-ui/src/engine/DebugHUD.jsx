// 📄 01frontend/maus-ui/src/engine/DebugHUD.jsx
// MAUS ENGINE 0.1 — PERFORMANCE ANALYZER HUD
// Toggles with F1. Displays FPS, frame time, triangles, draw calls, MAUS Engine Load.

import React, { useEffect, useRef, useState } from "react";

export default function DebugHUD({ renderer, scene, camera }) {
  const [visible, setVisible] = useState(false);
  const [stats, setStats] = useState({
    fps: 0,
    ms: 0,
    triangles: 0,
    drawCalls: 0,
    engineLoad: 0,
    mode: "UNKNOWN",
    position: { x: 0, y: 0, z: 0 },
  });

  const lastFrame = useRef(performance.now());
  const frameCount = useRef(0);

  // Toggle HUD with F1
  useEffect(() => {
    const toggle = (e) => {
      if (e.code === "F1") {
        e.preventDefault();
        setVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", toggle);
    return () => window.removeEventListener("keydown", toggle);
  }, []);

  // Performance & state update loop
  useEffect(() => {
    let mounted = true;

    function updateStats() {
      if (!mounted || !renderer) {
        requestAnimationFrame(updateStats);
        return;
      }

      const now = performance.now();
      frameCount.current++;
      const delta = now - lastFrame.current;

      // Once per second, update FPS + render stats
      if (delta >= 1000) {
        const fps = (frameCount.current * 1000) / delta;
        const ms = delta / frameCount.current;

        const info = renderer.info || {};
        const renderInfo = info.render || {};
        const triangles = renderInfo.triangles || 0;
        const drawCalls = renderInfo.calls || 0;

        // Engine Load (MAUS custom heuristic)
        const loadFromDrawCalls = (drawCalls / 200) * 100;
        const loadFromTriangles = (triangles / 250000) * 100;
        const load = Math.min(
          100,
          Math.floor(loadFromDrawCalls + loadFromTriangles)
        );

        let camPos = { x: 0, y: 0, z: 0 };
        if (camera && camera.position) {
          camPos = {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z,
          };
        }

        // World mode detection (optional, can be wired from props later)
        let mode = "ENGINE";
        if (scene && scene.userData && scene.userData.worldMode) {
          mode = scene.userData.worldMode;
        }

        setStats({
          fps: Math.round(fps),
          ms: ms.toFixed(2),
          triangles,
          drawCalls,
          engineLoad: load,
          mode,
          position: {
            x: camPos.x.toFixed(2),
            y: camPos.y.toFixed(2),
            z: camPos.z.toFixed(2),
          },
        });

        lastFrame.current = now;
        frameCount.current = 0;
      }

      requestAnimationFrame(updateStats);
    }

    updateStats();

    return () => {
      mounted = false;
    };
  }, [renderer, scene, camera]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 15,
        left: 15,
        padding: "12px 16px",
        background: "rgba(0, 0, 0, 0.75)",
        color: "#00fff2",
        fontFamily: "monospace",
        fontSize: "13px",
        border: "1px solid #00fff2",
        borderRadius: "6px",
        zIndex: 9999,
        minWidth: "230px",
      }}
    >
      <div style={{ marginBottom: 4, fontWeight: "bold" }}>
        MAUS ENGINE HUD (F1)
      </div>

      <div>FPS: {stats.fps}</div>
      <div>Frame Time: {stats.ms} ms</div>
      <div>Triangles: {stats.triangles}</div>
      <div>Draw Calls: {stats.drawCalls}</div>

      <div style={{ marginTop: 8 }}>
        Engine Load:
        <div
          style={{
            background: "#003b39",
            height: 6,
            marginTop: 4,
            borderRadius: 3,
          }}
        >
          <div
            style={{
              width: `${stats.engineLoad}%`,
              height: 6,
              background: "#00fff2",
            }}
          />
        </div>
        <span style={{ fontSize: 11 }}>{stats.engineLoad}%</span>
      </div>

      <div style={{ marginTop: 8 }}>
        Mode:{" "}
        <span style={{ color: "#ffffff" }}>
          {stats.mode || "ENGINE"}
        </span>
      </div>

      <div style={{ marginTop: 4 }}>
        Position: x {stats.position.x}, y {stats.position.y}, z{" "}
        {stats.position.z}
      </div>

      <div style={{ marginTop: 10, color: "#aaaaaa", fontSize: 11 }}>
        Toggle HUD: F1
      </div>
    </div>
  );
}
