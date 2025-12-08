// frontend/maus-ui/src/maus-engine/worlds/DevSandboxWorld.js

import * as THREE from "three";
import { WORLDS } from "../core/AccessControl";

export default class DevSandboxWorld {
  constructor() {
    this.id = WORLDS.DEV_SANDBOX;
    this.objects = [];
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  onLoad(scene, camera, { engine }) {
    this.engine = engine;
    this.scene = scene;
    this.camera = camera;

    const devPerms = this.engine?.accessControl?.getDevSandboxPermissions() || {};

    // Camera pos
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 1, 0);

    // Floor
    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x101010,
      metalness: 0.1,
      roughness: 0.9,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    this.objects.push(floor);

    // A “dev grid” of cubes to test physics and collisions
    const cols = 6;
    const rows = 4;
    const spacing = 2.8;
    const baseColor = devPerms.canUseDangerousTools ? 0xff4444 : 0x44ff88;

    for (let x = -cols / 2; x < cols / 2; x++) {
      for (let z = -rows / 2; z < rows / 2; z++) {
        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({
            color: baseColor,
            metalness: 0.6,
            roughness: 0.3,
          })
        );
        cube.position.set(x * spacing, 0.5, z * spacing);
        cube.castShadow = true;
        scene.add(cube);
        this.objects.push(cube);

        // Example: Could register colliders here in the future
        // engine.movement.addCollider({ x: cube.position.x, y: cube.position.y, z: cube.position.z, width: 1, height: 1, depth: 1 });
      }
    }

    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(5, 10, 3);
    light.castShadow = true;
    scene.add(light);
    this.objects.push(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambient);
    this.objects.push(ambient);

    window.addEventListener("keydown", this._handleKeyDown);
  }

  _handleKeyDown(e) {
    // Here devs can have local sandbox hotkeys,
    // but they cannot change dev sandbox permissions
    // or access the TS Architect vault.
    if (!this.engine) return;

    const devPerms = this.engine.accessControl?.getDevSandboxPermissions?.() || {};

    // Example: if they are allowed to spawn objects
    if (e.key === "n" && devPerms.canSpawnObjects) {
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
          color: 0x3399ff,
        })
      );
      cube.position.set(
        this.camera.position.x,
        this.camera.position.y - 1,
        this.camera.position.z - 2
      );
      cube.castShadow = true;
      this.scene.add(cube);
      this.objects.push(cube);
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
