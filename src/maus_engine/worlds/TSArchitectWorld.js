// frontend/maus-ui/src/maus-engine/worlds/TSArchitectWorld.js

import * as THREE from "three";
import { WORLDS } from "../core/AccessControl";

export default class TSArchitectWorld {
  constructor() {
    this.id = WORLDS.TS_ARCHITECT_ROOM;
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this.objects = [];

    // 🔐 TS Architect system-wipe password
    this.wipePassword = "MAUS_INFINITY_TS";

    // 🔐 TS Architect maintenance-mode password
    this.maintenancePassword = "GENESIS_PROTOCOL_REBOOT";
  }

  onLoad(scene, camera, { engine }) {
    this.engine = engine;
    this.scene = scene;
    this.camera = camera;

    // Camera start position in the TS Vault
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 1, 0);

    //
    // ENVIRONMENT (TS Architect Vault)
    //
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x050505,
      metalness: 0.4,
      roughness: 0.6,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    this.objects.push(floor);

    const cubeGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 2.5,
      metalness: 1.0,
      roughness: 0.25,
    });
    const coreCube = new THREE.Mesh(cubeGeo, cubeMat);
    coreCube.position.set(0, 1.2, 0);
    coreCube.castShadow = true;
    scene.add(coreCube);
    this.objects.push(coreCube);

    const pillarGeo = new THREE.CylinderGeometry(0.15, 0.15, 3, 24);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x0088ff,
      emissive: 0x002244,
      emissiveIntensity: 0.8,
    });

    const ringRadius = 6;
    const pillarCount = 12;

    for (let i = 0; i < pillarCount; i++) {
      const angle = (i / pillarCount) * Math.PI * 2;
      const x = Math.cos(angle) * ringRadius;
      const z = Math.sin(angle) * ringRadius;

      const p = new THREE.Mesh(pillarGeo, pillarMat);
      p.position.set(x, 1.5, z);
      p.castShadow = true;
      scene.add(p);
      this.objects.push(p);
    }

    const keyLight = new THREE.PointLight(0x00ffff, 2.0, 50);
    keyLight.position.set(0, 8, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);
    this.objects.push(keyLight);

    const ambient = new THREE.AmbientLight(0x004466, 0.6);
    scene.add(ambient);
    this.objects.push(ambient);

    window.addEventListener("keydown", this._handleKeyDown);
  }

  _handleKeyDown(e) {
    if (!this.engine) return;

    //
    // 🔥 SYSTEM WIPE (Ctrl + Alt + Backspace)
    //
    if (e.key === "Backspace" && e.ctrlKey && e.altKey) {
      const entered = window.prompt(
        "⚠️ SYSTEM WIPE REQUESTED.\n\nEnter TS Architect Wipe Key:"
      );

      if (!entered) {
        alert("System wipe canceled.");
        return;
      }

      if (entered !== this.wipePassword) {
        alert("❌ Authorization denied. Incorrect wipe key.");
        return;
      }

      // 🔊 PRE-WIPE HOOK (for Shadow Backup or external tooling)
      if (window && window.dispatchEvent) {
        const evt = new CustomEvent("MAUS_PRE_WIPE", {
          detail: {
            timestamp: Date.now(),
            source: "TS_ARCHITECT",
          },
        });
        window.dispatchEvent(evt);
      }

      alert("✔ Wipe authorized.\nResetting engine environment...");

      if (this.engine.resetToCleanState) {
        this.engine.resetToCleanState();
      }

      // 🔊 POST-WIPE HOOK
      if (window && window.dispatchEvent) {
        const evt = new CustomEvent("MAUS_POST_WIPE", {
          detail: {
            timestamp: Date.now(),
            completed: true,
          },
        });
        window.dispatchEvent(evt);
      }

      return;
    }

    //
    // 🔵 MAINTENANCE MODE (Ctrl + Alt + M)
    //
    if ((e.key === "m" || e.key === "M") && e.ctrlKey && e.altKey) {
      const entered = window.prompt(
        "MAUS ENGINE MAINTENANCE MODE REQUESTED.\n\nEnter TS Maintenance Authorization Key:"
      );

      if (!entered) {
        alert("Maintenance mode canceled.");
        return;
      }

      if (entered !== this.maintenancePassword) {
        alert("❌ Authorization denied. Incorrect maintenance key.");
        return;
      }

      if (this.engine.enterMaintenanceMode) {
        this.engine.enterMaintenanceMode();
      } else {
        alert("Engine does not support maintenance mode yet.");
      }
      return;
    }

    //
    // DEV SANDBOX PERMISSION TOGGLES (from TS Vault)
    //
    if (this.engine.accessControl) {
      if (e.key === "1") {
        this.engine.accessControl.updateDevSandboxPermissions({
          canUseDangerousTools: false,
        });
      }
      if (e.key === "2") {
        this.engine.accessControl.updateDevSandboxPermissions({
          canUseDangerousTools: true,
        });
      }
    }
  }

  onUnload() {
    window.removeEventListener("keydown", this._handleKeyDown);

    if (!this.scene) return;
    for (const obj of this.objects) {
      this.scene.remove(obj);
    }
    this.objects = [];
  }
}

// ⛔ GENESIS COUNTDOWN REMOVED — SHADOW RESTORE PROVIDES UNLIMITED REVERSIBILITY
