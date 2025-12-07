// 01frontend/maus-ui/src/maus-engine/worlds/DefaultWorld.js

import * as THREE from "three";

export default class DefaultWorld {
    constructor() {
        this.name = "DefaultWorld";
        this.group = new THREE.Group();
    }

    init(scene, renderer, camera) {
        // Light
        const light = new THREE.DirectionalLight(0xffffff, 2);
        light.position.set(5, 10, 5);
        this.group.add(light);

        // Cube
        const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
        const cubeMat = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(cubeGeo, cubeMat);
        cube.position.set(0, 0.5, 0);

        this.group.add(cube);

        // Floor
        const floorGeo = new THREE.PlaneGeometry(20, 20);
        const floorMat = new THREE.MeshStandardMaterial({
            color: 0x222222,
            side: THREE.DoubleSide,
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;

        this.group.add(floor);
    }

    update(delta) {
        // Rotate cube
        const cube = this.group.children.find(obj => obj.isMesh);
        if (cube) cube.rotation.y += delta * 0.6;
    }
}
