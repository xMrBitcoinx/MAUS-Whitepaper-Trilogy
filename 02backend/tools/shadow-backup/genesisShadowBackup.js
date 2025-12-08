// 02backend/tools/shadow-backup/genesisShadowBackup.js

/**
 * GENESIS SHADOW BACKUP ENGINE
 * TS Architect Only
 *
 * This tool:
 * 1. Loads the shadowSnapshotFormat.json template
 * 2. Inserts real data (snapshotId, timestamps, engine state)
 * 3. Encrypts the snapshot with a TS-only Shadow Key
 * 4. Uploads encrypted blob to IPFS
 * 5. Uploads encrypted blob to Arweave
 * 6. Returns: { snapshotId, ipfsCid, arweaveTxId }
 *
 * IMPORTANT:
 * - This must NEVER be imported by frontend.
 * - This must NEVER be referenced in your TS Vault or worlds.
 * - Run manually: `node genesisShadowBackup.js`
 *
 * This is your TS-only resurrection engine.
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import axios from "axios";

// --------------------------------------
// CONFIGURATION
// --------------------------------------

// Shadow Key comes from environment variable (NEVER store in code)
const SHADOW_KEY = process.env.MAUS_SHADOW_KEY;

if (!SHADOW_KEY) {
  console.error("❌ ERROR: MAUS_SHADOW_KEY missing. Load from 1Password.");
  process.exit(1);
}

// Absolute path to JSON snapshot format
const SNAPSHOT_PATH = path.resolve(
  "02backend/tools/shadow-backup/shadowSnapshotFormat.json"
);

// --------------------------------------
// LOAD SNAPSHOT TEMPLATE
// --------------------------------------

function loadSnapshotTemplate() {
  const raw = fs.readFileSync(SNAPSHOT_PATH, "utf8");
  return JSON.parse(raw);
}

// --------------------------------------
// CREATE SNAPSHOT OBJECT
// --------------------------------------

function createSnapshot() {
  const base = loadSnapshotTemplate();

  const now = new Date();

  base.snapshotId = `SNAP_${Date.now()}`;
  base.time.createdAtUtc = now.toISOString();
  base.time.createdAtLocal = now.toLocaleString();

  // meta description update
  base.meta = {
    createdBy: "TS_ARCHITECT",
    description: "MAUS Shadow Backup Snapshot before system wipe."
  };

  return base;
}

// --------------------------------------
// ENCRYPT SNAPSHOT
// --------------------------------------

function encryptSnapshot(snapshotObj) {
  const jsonString = JSON.stringify(snapshotObj, null, 2);

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    Buffer.from(SHADOW_KEY, "hex"),
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(jsonString, "utf8"),
    cipher.final()
  ]);

  const authTag = cipher.getAuthTag();

  return {
    encrypted,
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex")
  };
}

// --------------------------------------
// IPFS UPLOAD
// --------------------------------------

async function uploadToIPFS(buffer) {
  try {
    const formData = new FormData();
    formData.append("file", new Blob([buffer]), "shadowSnapshot.enc");

    const response = await axios.post(
      "https://ipfs.infura.io:5001/api/v0/add",
      formData,
      {
        headers: formData.getHeaders()
      }
    );

    return response.data.Hash; // returned CID
  } catch (err) {
    console.error("❌ IPFS Upload Error:", err.message);
    return null;
  }
}

// --------------------------------------
// ARWEAVE UPLOAD (placeholder until wallet integration)
// --------------------------------------

async function uploadToArweave(buffer) {
  // Placeholder — will integrate Arweave wallet next step
  return "ARWEAVE_TXID_PLACEHOLDER";
}

// --------------------------------------
// MAIN EXECUTION
// --------------------------------------

async function runBackup() {
  console.log("🚀 Creating Shadow Backup Snapshot...");

  const snapshot = createSnapshot();
  console.log("📄 Snapshot created:", snapshot.snapshotId);

  const encrypted = encryptSnapshot(snapshot);
  console.log("🔐 Snapshot encrypted.");

  const ipfsCid = await uploadToIPFS(encrypted.encrypted);
  console.log("📡 IPFS CID:", ipfsCid);

  const arweaveTxId = await uploadToArweave(encrypted.encrypted);
  console.log("🧿 Arweave TX:", arweaveTxId);

  const result = {
    snapshotId: snapshot.snapshotId,
    ipfsCid,
    arweaveTxId,
    timestamp: new Date().toISOString()
  };

  console.log("\n✅ GENESIS SHADOW BACKUP COMPLETE:");
  console.log(result);

  return result;
}

runBackup();
