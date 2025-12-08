// 02backend/tools/shadow-backup/genesisShadowRestore.js

/**
 * GENESIS SHADOW RESTORE ENGINE (LOCAL VERSION)
 * TS Architect Only
 *
 * v0.1 — LOCAL ONLY:
 *  - Reads an encrypted shadow snapshot from /snapshots
 *  - Decrypts it using MAUS_SHADOW_KEY
 *  - Writes the raw snapshot JSON to /snapshots/restored/<snapshotId>.json
 *
 * Later we will:
 *  - Feed this JSON back into MAUS Engine init
 *  - Tie into IPFS + Arweave + chain anchors
 *
 * Run from MAUS root, example:
 *    node 02backend/tools/shadow-backup/genesisShadowRestore.js SNAP_1234567890
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";

// ------------------------
// CONFIG
// ------------------------

const SHADOW_KEY = process.env.MAUS_SHADOW_KEY;

if (!SHADOW_KEY) {
  console.error("❌ ERROR: MAUS_SHADOW_KEY missing. Load it from 1Password into env.");
  process.exit(1);
}

const SNAPSHOT_DIR = path.resolve(
  "02backend/tools/shadow-backup/snapshots"
);

const RESTORE_OUTPUT_DIR = path.resolve(
  "02backend/tools/shadow-backup/snapshots/restored"
);

if (!fs.existsSync(RESTORE_OUTPUT_DIR)) {
  fs.mkdirSync(RESTORE_OUTPUT_DIR, { recursive: true });
}

// ------------------------
// LOAD ENCRYPTED ENVELOPE
// ------------------------

function loadEncryptedEnvelope(snapshotId) {
  const filePath = path.join(
    SNAPSHOT_DIR,
    `${snapshotId}.shadow.enc.json`
  );

  if (!fs.existsSync(filePath)) {
    console.error("❌ Encrypted snapshot not found at:");
    console.error("   " + filePath);
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

// ------------------------
// DECRYPT SNAPSHOT
// ------------------------

function decryptEnvelope(envelope) {
  const { crypto: cryptoMeta, payload, snapshotId } = envelope;

  if (!cryptoMeta || !payload) {
    throw new Error("Invalid envelope format.");
  }

  const iv = Buffer.from(cryptoMeta.iv, "hex");
  const authTag = Buffer.from(cryptoMeta.authTag, "hex");
  const keyBuffer = Buffer.from(SHADOW_KEY, "hex");
  const encryptedBuffer = Buffer.from(payload, "base64");

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    keyBuffer,
    iv
  );
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encryptedBuffer),
    decipher.final()
  ]);

  const jsonString = decrypted.toString("utf8");
  const snapshotObj = JSON.parse(jsonString);

  // sanity check
  if (snapshotObj.snapshotId !== snapshotId) {
    console.warn("⚠️ Snapshot ID mismatch between envelope and payload.");
  }

  return snapshotObj;
}

// ------------------------
// SAVE RESTORED SNAPSHOT
// ------------------------

function saveRestoredSnapshot(snapshotObj) {
  const outPath = path.join(
    RESTORE_OUTPUT_DIR,
    `${snapshotObj.snapshotId}.json`
  );
  fs.writeFileSync(outPath, JSON.stringify(snapshotObj, null, 2), "utf8");
  return outPath;
}

// ------------------------
// MAIN
// ------------------------

function runRestore() {
  const snapshotId = process.argv[2];

  if (!snapshotId) {
    console.error("Usage:");
    console.error("  node 02backend/tools/shadow-backup/genesisShadowRestore.js SNAP_<id>");
    process.exit(1);
  }

  console.log("🕊  Restoring MAUS Shadow Snapshot:", snapshotId);

  const envelope = loadEncryptedEnvelope(snapshotId);
  const snapshotObj = decryptEnvelope(envelope);
  const outPath = saveRestoredSnapshot(snapshotObj);

  console.log("💾 Restored raw snapshot written to:");
  console.log("   " + outPath);

  console.log("\n✅ GENESIS SHADOW RESTORE COMPLETE.");
}

runRestore();
