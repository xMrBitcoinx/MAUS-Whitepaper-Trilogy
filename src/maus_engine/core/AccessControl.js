// frontend/maus-ui/src/maus-engine/core/AccessControl.js

export const ROLES = {
  PLAYER: "PLAYER",
  DEV: "DEV",
  TS_ARCHITECT: "TS_ARCHITECT", // triple infinity TS System Architect
};

export const WORLDS = {
  MAIN: "MAIN_WORLD",
  TS_ARCHITECT_ROOM: "TS_ARCHITECT_ROOM",
  DEV_SANDBOX: "DEV_SANDBOX",
};

export default class AccessControl {
  constructor(role = ROLES.PLAYER) {
    this.currentRole = role;

    // Permissions that apply to the shared dev sandbox (not your vault).
    this.devSandboxPermissions = {
      canSpawnObjects: true,
      maxObjects: 100,
      canUseDangerousTools: false,
    };
  }

  setRole(role) {
    this.currentRole = role;
  }

  isTSArchitect() {
    return this.currentRole === ROLES.TS_ARCHITECT;
  }

  isDev() {
    return this.currentRole === ROLES.DEV || this.isTSArchitect();
  }

  canAccessWorld(worldId) {
    if (worldId === WORLDS.TS_ARCHITECT_ROOM) {
      return this.isTSArchitect();
    }

    if (worldId === WORLDS.DEV_SANDBOX) {
      return this.isDev();
    }

    if (worldId === WORLDS.MAIN) {
      return true;
    }

    return false;
  }

  // Only TS Architect can mutate dev sandbox permissions.
  updateDevSandboxPermissions(newPerms) {
    if (!this.isTSArchitect()) return;
    this.devSandboxPermissions = {
      ...this.devSandboxPermissions,
      ...newPerms,
    };
  }

  getDevSandboxPermissions() {
    return { ...this.devSandboxPermissions };
  }
}
