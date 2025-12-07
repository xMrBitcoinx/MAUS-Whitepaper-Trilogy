// 01frontend/maus-ui/src/maus-engine/core/MAUSEngine.js
// Core MAUS Engine — Lightweight Scene + Update Loop Manager

export default class MAUSEngine {
  constructor({ renderer, scene }) {
    this.renderer = renderer;
    this.scene = scene;

    this.world = null;
    this.running = false;

    this.lastTime = 0;

    console.log("⚙️ MAUSEngine initialized.");
  }

  // ----------------------------------------------------------
  // Load an instance of MAUSWorld
  // ----------------------------------------------------------
  loadWorld(world) {
    this.world = world;

    if (this.world && typeof this.world.load === "function") {
      this.world.load(this.scene);
    }

    console.log("🌍 MAUSEngine loaded world:", this.world);
  }

  // ----------------------------------------------------------
  // Start the engine's update loop
  // ----------------------------------------------------------
  start() {
    if (!this.running) {
      this.running = true;
      this.lastTime = performance.now();

      console.log("🚀 MAUSEngine started.");
      this.loop();
    }
  }

  // ----------------------------------------------------------
  // Stop engine loop
  // ----------------------------------------------------------
  stop() {
    this.running = false;
    console.log("🛑 MAUSEngine stopped.");
  }

  // ----------------------------------------------------------
  // Main render/update loop
  // ----------------------------------------------------------
  loop = () => {
    if (!this.running) return;

    const now = performance.now();
    const delta = (now - this.lastTime) / 1000; // Convert ms → seconds
    this.lastTime = now;

    // Update world logic before rendering
    if (this.world && typeof this.world.update === "function") {
      this.world.update(delta);
    }

    // Renderer is managed by React Three Fiber, so we do NOT call renderer.render here
    // R3F performs the render pass automatically.

    requestAnimationFrame(this.loop);
  };
}
