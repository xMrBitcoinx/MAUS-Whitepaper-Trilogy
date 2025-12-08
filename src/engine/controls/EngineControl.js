// 📁 src/engine/controls/EngineControl.js

class EngineControl {
  constructor(engine) {
    this.engine = engine;
    this.isPaused = false;
  }

  // Toggle engine play/pause state
  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.engine.pause(); // Assuming the engine has a pause method
    } else {
      this.engine.resume(); // Assuming the engine has a resume method
    }
  }

  // Update engine state (e.g., for physics, rendering, etc.)
  update(deltaTime) {
    if (!this.isPaused) {
      this.engine.update(deltaTime); // Assuming the engine has an update method
    }
  }
}

export default EngineControl;
