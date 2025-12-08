// --------------------------------------------------------
// Sandbox Room
// File: src/maus-engine/worlds/SandboxRoom.js
// --------------------------------------------------------

export default class SandboxRoom {
    constructor(name = "Sandbox") {
        this.name = name;
        this.objects = [];
    }

    onLoad(engine) {
        console.log(`[SandboxRoom] "${this.name}" Loaded`);
    }

    update(delta) {
        this.objects.forEach(obj => obj.update(delta));
    }

    render(camera) {
        this.objects.forEach(obj => obj.render(camera));
    }
}
