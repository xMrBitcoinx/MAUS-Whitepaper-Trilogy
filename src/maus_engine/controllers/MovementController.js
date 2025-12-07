// frontend/maus-ui/src/maus-engine/controllers/MovementController.js

import ColliderSystem from "../physics/ColliderSystem";
import TerrainSystem from "../physics/TerrainSystem";
import * as THREE from "three";

export default class MovementController {
  constructor(
    camera,
    {
      acceleration = 0.002,
      maxSpeed = 0.08,
      crouchSpeedMultiplier = 0.45,
      friction = 0.90,
      sprintMultiplier = 2.0,

      planet = "earth",
      baseGravityStrength = 0.01,
      maxSlopeStep = 0.5,

      bobFrequency = 8,
      bobAmplitude = 0.015,
      sprintBobMultiplier = 1.8,
      idleBobFrequency = 1.2,
      idleBobAmplitude = 0.01,

      swayAmplitude = 0.03,
      swaySpeed = 4,

      crouchHeight = 1.1,
      standHeight = 1.8,
      crouchTransitionSpeed = 0.12,
    } = {}
  ) {
    this.camera = camera;

    //
    // MOVEMENT VALUES
    //
    this.acceleration = acceleration;
    this.maxSpeed = maxSpeed;
    this.crouchSpeedMultiplier = crouchSpeedMultiplier;
    this.friction = friction;
    this.sprintMultiplier = sprintMultiplier;

    //
    // HEADBOB + SWAY
    //
    this.bobFrequency = bobFrequency;
    this.bobAmplitude = bobAmplitude;
    this.sprintBobMultiplier = sprintBobMultiplier;
    this.idleBobFrequency = idleBobFrequency;
    this.idleBobAmplitude = idleBobAmplitude;
    this.bobTimer = 0;

    this.swayAmplitude = swayAmplitude;
    this.swaySpeed = swaySpeed;
    this.swayTimer = 0;

    //
    // GRAVITY
    //
    this.baseGravityStrength = baseGravityStrength;
    this.planetGravity = {
      earth: 1.0, moon: 0.165, mars: 0.38, mercury: 0.38,
      venus: 0.90, jupiter: 2.53, saturn: 1.06, uranus: 0.89, neptune: 1.14,
    };
    this.gravityStrength = this._computeGravity(planet);

    //
    // TERRAIN + COLLISIONS
    //
    this.terrain = new TerrainSystem();
    this.maxSlopeStep = maxSlopeStep;

    this.collisions = new ColliderSystem();

    //
    // CAMERA HEIGHT / CROUCH
    //
    this.standHeight = standHeight;
    this.crouchHeight = crouchHeight;
    this.currentHeight = standHeight;
    this.targetHeight = standHeight;
    this.crouchTransitionSpeed = crouchTransitionSpeed;

    //
    // STATE VARIABLES
    //
    this.gravityEnabled = true;
    this.verticalVelocity = 0;
    this.isOnGround = true;
    this.flyMode = false;

    this.velocity = { x: 0, z: 0 };

    //
    // COLLIDER (capsule)
    //
    this.capsuleSize = { radius: 0.4, height: standHeight };

    //
    // INPUT STATE
    //
    this.keys = {
      w: false, a: false, s: false, d: false,
      shift: false, space: false,
      q: false, e: false,
      ctrl: false,
      f: false,
    };

    this.originalCameraY = camera.position.y;
    this._bindListeners();
  }

  _computeGravity(planet) {
    return this.baseGravityStrength * (this.planetGravity[planet] ?? 1.0);
  }

  setPlanet(name) {
    this.gravityStrength = this._computeGravity(name);
  }

  addTerrainMesh(mesh) {
    this.terrain.addTerrainMesh(mesh);
  }

  addCollider(c) {
    this.collisions.addBoxCollider(c);
  }

  setTerrainHeightFunction(fn) {
    this.terrain.setHeightFunction(fn);
  }

  _bindListeners() {
    this._handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      if (key in this.keys) this.keys[key] = true;

      if (key === "control") this.keys.ctrl = true;
      if (e.key === "Shift") this.keys.shift = true;
      if (e.key === " ") this.keys.space = true;

      // Toggle fly
      if (key === "f") {
        this.flyMode = !this.flyMode;
        if (this.flyMode) {
          this.verticalVelocity = 0;
          this.gravityEnabled = false;
        } else {
          this.gravityEnabled = true;
        }
      }
    };

    this._handleKeyUp = (e) => {
      const key = e.key.toLowerCase();

      if (key in this.keys) this.keys[key] = false;

      if (key === "control") this.keys.ctrl = false;
      if (e.key === "Shift") this.keys.shift = false;
      if (e.key === " ") this.keys.space = false;
    };

    window.addEventListener("keydown", this._handleKeyDown);
    window.addEventListener("keyup", this._handleKeyUp);
  }

  //
  // CROUCH SYSTEM
  //
  _updateCrouch(deltaY) {
    if (this.keys.ctrl) {
      this.targetHeight = this.crouchHeight;
      this.capsuleSize.height = this.crouchHeight;
    } else {
      this.targetHeight = this.standHeight;
      this.capsuleSize.height = this.standHeight;
    }

    // Smooth interpolation
    this.currentHeight += (this.targetHeight - this.currentHeight) * this.crouchTransitionSpeed;

    // Move camera to match crouch height
    this.camera.position.y = this.originalCameraY - (this.standHeight - this.currentHeight);
  }

  //
  // HEADBOB + SWAY
  //
  _applyHeadBobSway(speed, grounded, sprinting) {
    const cam = this.camera;

    // Idle bob
    if (speed < 0.002 && grounded) {
      const idle = Math.sin(this.bobTimer * this.idleBobFrequency) * this.idleBobAmplitude;
      cam.position.y = this.originalCameraY - (this.standHeight - this.currentHeight) + idle;
      return;
    }

    if (grounded) {
      const freq = this.bobFrequency * (sprinting ? this.sprintBobMultiplier : 1);
      const amp = this.bobAmplitude * (sprinting ? this.sprintBobMultiplier : 1);

      const bob = Math.sin(this.bobTimer * freq) * amp;
      cam.position.y = this.originalCameraY - (this.standHeight - this.currentHeight) + bob;
    }

    // Sway from walking
    cam.rotation.z =
      Math.sin(this.swayTimer * this.swaySpeed) *
      this.swayAmplitude *
      speed *
      15;
  }

  //
  // UPDATE LOOP
  //
  update() {
    const cam = this.camera;
    const pos = cam.position;

    let maxSpeed = this.maxSpeed;
    let accel = this.acceleration;

    const sprinting = this.keys.shift && !this.flyMode && !this.keys.ctrl;

    if (sprinting) {
      maxSpeed *= this.sprintMultiplier;
      accel *= this.sprintMultiplier;
    }

    if (this.keys.ctrl) {
      maxSpeed *= this.crouchSpeedMultiplier;
      accel *= this.crouchSpeedMultiplier;
    }

    //
    // MOVEMENT INPUT
    //
    if (this.keys.w) this.velocity.z -= accel;
    if (this.keys.s) this.velocity.z += accel;
    if (this.keys.a) this.velocity.x -= accel;
    if (this.keys.d) this.velocity.x += accel;

    this.velocity.x *= this.friction;
    this.velocity.z *= this.friction;

    this.velocity.x = THREE.MathUtils.clamp(this.velocity.x, -maxSpeed, maxSpeed);
    this.velocity.z = THREE.MathUtils.clamp(this.velocity.z, -maxSpeed, maxSpeed);

    pos.x += this.velocity.x;
    pos.z += this.velocity.z;

    //
    // Animate camera height for crouch
    //
    this._updateCrouch();

    //
    // SPEED FOR ANIMATION
    //
    const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2);

    this.bobTimer += speed * 60;
    this.swayTimer += speed * 20;

    //
    // FLY MODE
    //
    if (this.flyMode) {
      if (this.keys.e) pos.y += maxSpeed;
      if (this.keys.q) pos.y -= maxSpeed;
      this._applyHeadBobSway(speed, true, sprinting);
      return;
    }

    //
    // TERRAIN HEIGHT
    //
    const groundY = this.terrain.getHeightAt(pos.x, pos.z);

    //
    // GRAVITY + GROUND CHECK
    //
    if (pos.y > groundY + 0.01) {
      this.verticalVelocity -= this.gravityStrength;
      pos.y += this.verticalVelocity;
      this.isOnGround = false;
    } else {
      pos.y = groundY;
      this.verticalVelocity = 0;
      this.isOnGround = true;
    }

    //
    // COLLISIONS
    //
    const corrected = this.collisions.resolveCollisions(
      { x: pos.x, y: pos.y, z: pos.z },
      this.capsuleSize
    );

    pos.x = corrected.x;
    pos.z = corrected.z;

    //
    // APPLY BOB + SWAY
    //
    this._applyHeadBobSway(speed, this.isOnGround, sprinting);
  }

  dispose() {
    window.removeEventListener("keydown", this._handleKeyDown);
    window.removeEventListener("keyup", this._handleKeyUp);
  }
}
