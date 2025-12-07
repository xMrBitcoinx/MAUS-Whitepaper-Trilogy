// 01frontend/maus-ui/src/maus-engine/player/PlayerController.js
// ---------------------------------------------------------------
// MAUS Movement Physics Engine (Option 2 - Fortnite/Apex style)
// - First person by default (FPS)
// - Third person toggle (V) with smooth transition
// - WASD movement, Shift sprint, Space jump
// - Head bob in FPS
// - Camera smoothing
// ---------------------------------------------------------------

import * as THREE from "three";

export default class PlayerController {
    constructor(camera) {
        this.camera = camera;

        // Player "body" position (logic position, cube follows this)
        this.position = new THREE.Vector3(0, 1.6, 5);
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();

        // Movement tuning (Option 2: smooth, modern, not too heavy)
        this.moveSpeed = 8;
        this.sprintMultiplier = 1.6;
        this.accel = 12;
        this.frictionGround = 10;
        this.frictionAir = 2;
        this.jumpForce = 10;
        this.gravity = -30;

        // Look (mouse)
        this.yaw = 0;
        this.pitch = 0;
        this.mouseSensitivity = 0.002;

        // View mode: "fps" | "third"
        this.viewMode = "fps";

        // Camera transition (smooth)
        this.currentCamPos = new THREE.Vector3();
        this.targetCamPos = new THREE.Vector3();
        this.transitionSpeed = 8; // higher = snappier

        // Head bob in FPS
        this.bobTime = 0;
        this.bobSpeed = 10;   // how fast steps feel
        this.bobAmount = 0.05;

        // Input state
        this.input = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            jump: false,
            sprint: false,
        };

        // Bind handlers
        this._onKeyDown = this.onKeyDown.bind(this);
        this._onKeyUp = this.onKeyUp.bind(this);
        this._onMouseMove = this.onMouseMove.bind(this);

        window.addEventListener("keydown", this._onKeyDown);
        window.addEventListener("keyup", this._onKeyUp);
        window.addEventListener("mousemove", this._onMouseMove);

        this.camera.rotation.order = "YXZ";
        this.currentCamPos.copy(this.camera.position);
    }

    dispose() {
        window.removeEventListener("keydown", this._onKeyDown);
        window.removeEventListener("keyup", this._onKeyUp);
        window.removeEventListener("mousemove", this._onMouseMove);
    }

    // ----------------------------------------------------------
    // INPUT
    // ----------------------------------------------------------
    onKeyDown(e) {
        switch (e.code) {
            case "KeyW":
                this.input.forward = true;
                break;
            case "KeyS":
                this.input.backward = true;
                break;
            case "KeyA":
                this.input.left = true;
                break;
            case "KeyD":
                this.input.right = true;
                break;
            case "Space":
                this.input.jump = true;
                break;
            case "ShiftLeft":
            case "ShiftRight":
                this.input.sprint = true;
                break;
            case "KeyV":
                this.viewMode = this.viewMode === "fps" ? "third" : "fps";
                break;
            default:
                break;
        }
    }

    onKeyUp(e) {
        switch (e.code) {
            case "KeyW":
                this.input.forward = false;
                break;
            case "KeyS":
                this.input.backward = false;
                break;
            case "KeyA":
                this.input.left = false;
                break;
            case "KeyD":
                this.input.right = false;
                break;
            case "Space":
                this.input.jump = false;
                break;
            case "ShiftLeft":
            case "ShiftRight":
                this.input.sprint = false;
                break;
            default:
                break;
        }
    }

    onMouseMove(e) {
        const sens = this.mouseSensitivity;
        this.yaw -= e.movementX * sens;
        this.pitch -= e.movementY * sens;

        const limit = Math.PI / 2 - 0.05;
        if (this.pitch > limit) this.pitch = limit;
        if (this.pitch < -limit) this.pitch = -limit;
    }

    // ----------------------------------------------------------
    // MAIN UPDATE LOOP
    // ----------------------------------------------------------
    update(delta) {
        if (!delta) return;

        // -----------------------------
        // 1) INPUT → DESIRED VELOCITY
        // -----------------------------
        const inputVec = new THREE.Vector2(0, 0);

        if (this.input.forward) inputVec.y += 1;
        if (this.input.backward) inputVec.y -= 1;
        if (this.input.left) inputVec.x -= 1;
        if (this.input.right) inputVec.x += 1;

        if (inputVec.lengthSq() > 0) inputVec.normalize();

        const speed =
            this.moveSpeed * (this.input.sprint ? this.sprintMultiplier : 1);

        // Desired local-space velocity
        const desiredVX = inputVec.x * speed;
        const desiredVZ = inputVec.y * speed;

        // Rotate to world space using yaw
        const sinY = Math.sin(this.yaw);
        const cosY = Math.cos(this.yaw);

        const worldVX = desiredVX * cosY + desiredVZ * -sinY;
        const worldVZ = desiredVX * sinY + desiredVZ * cosY * -1;

        const horizVel = new THREE.Vector2(this.velocity.x, this.velocity.z);
        const desiredVel = new THREE.Vector2(worldVX, worldVZ);

        // Accelerate toward desired velocity
        const accelFactor = this.accel * delta;
        horizVel.lerp(desiredVel, Math.max(0, Math.min(1, accelFactor)));

        // Friction
        const friction = this.onGround ? this.frictionGround : this.frictionAir;
        const frictionFactor = Math.max(0, 1 - friction * delta);
        horizVel.multiplyScalar(frictionFactor);

        this.velocity.x = horizVel.x;
        this.velocity.z = horizVel.y;

        // -----------------------------
        // 2) VERTICAL MOTION
        // -----------------------------
        this.velocity.y += this.gravity * delta;

        // Basic ground Y = 1.6
        this.position.addScaledVector(this.velocity, delta);

        if (this.position.y < 1.6) {
            this.position.y = 1.6;
            this.velocity.y = 0;
            this.onGround = true;
        } else {
            this.onGround = false;
        }

        // Jump (only when grounded)
        if (this.input.jump && this.onGround) {
            this.velocity.y = this.jumpForce;
            this.onGround = false;
        }

        // -----------------------------
        // 3) HEAD BOB
        // -----------------------------
        const movingHoriz = horizVel.lengthSq() > 0.001;
        let bobOffset = 0;

        if (movingHoriz && this.onGround) {
            this.bobTime += delta * this.bobSpeed;
            bobOffset = Math.sin(this.bobTime) * this.bobAmount;
        } else {
            this.bobTime = 0;
        }

        // -----------------------------
        // 4) FORWARD VECTOR (for look)
        // -----------------------------
        const forward = new THREE.Vector3(
            -Math.sin(this.yaw) * Math.cos(this.pitch),
            Math.sin(this.pitch),
            -Math.cos(this.yaw) * Math.cos(this.pitch)
        );

        // -----------------------------
        // 5) CAMERA TARGET POSITION
        // -----------------------------
        if (this.viewMode === "fps") {
            // FPS: camera ON the head
            this.targetCamPos.copy(this.position).add(
                new THREE.Vector3(0, 0.1 + bobOffset, 0)
            );
            this.camera.rotation.set(this.pitch, this.yaw, 0);
        } else {
            // THIRD-PERSON: behind & above
            const offset = new THREE.Vector3(0, 2, -6);
            offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
            this.targetCamPos.copy(this.position).add(offset);
        }

        // Smooth camera motion
        const t = 1 - Math.exp(-this.transitionSpeed * delta);
        this.camera.position.lerp(this.targetCamPos, t);

        if (this.viewMode === "third") {
            const lookTarget = new THREE.Vector3(
                this.position.x,
                this.position.y + 0.8,
                this.position.z
            );
            this.camera.lookAt(lookTarget);
        }
    }
}
