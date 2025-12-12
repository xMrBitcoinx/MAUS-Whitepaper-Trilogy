// 01frontend/maus-ui/src/engine/MAUSEngine.js
export default class MAUSEngine {
  constructor({ renderer, scene }) {
    this.renderer = renderer;
    this.scene = scene;
    this.running = false;

    console.log("🟦 MAUSEngine initialized.");
  }

  loadWorld(world) {
    this.world = world;
    world.load(this.scene);
    console.log("🌍 MAUSEngine loaded world:", world);
  }

  start() {
    this.running = true;
    console.log("🟢 MAUSEngine started.");

    const loop = () => {
      if (!this.running) return;

      if (this.world && this.world.update) {
        this.world.update();
      }

      this.renderer.render(this.scene, this.renderer.xr.getCamera());
      requestAnimationFrame(loop);
    };

    loop();
  }

  stop() {
    this.running = false;
    console.log("🔴 MAUSEngine stopped.");
  }
}
