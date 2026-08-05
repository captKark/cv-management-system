const crypto = require("crypto");

const pkceStore = new Map();

const base64UrlEncode = (buffer) => {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const generateVerifier = () => {
  return base64UrlEncode(
    crypto.randomBytes(64),
  );
};

const generateChallenge = (verifier) => {
  return base64UrlEncode(
    crypto
      .createHash("sha256")
      .update(verifier)
      .digest(),
  );
};

const generateState = () => {
  return crypto.randomUUID();
};

const savePkce = (
  state,
  verifier,
  userId,
  payload = {},
) => {
  pkceStore.set(state, {
    verifier,
    userId,
    payload,
    createdAt: Date.now(),
  });
};

const getPkce = (state) => {
  return pkceStore.get(state);
};

const removePkce = (state) => {
  pkceStore.delete(state);
};

const cleanupExpiredPkce = () => {
  const now = Date.now();

  const maxAge = 10 * 60 * 1000;

  for (const [state, data] of pkceStore.entries()) {
    if (now - data.createdAt > maxAge) {
      pkceStore.delete(state);
    }
  }
};

setInterval(cleanupExpiredPkce, 60000);

module.exports = {
  generateVerifier,
  generateChallenge,
  generateState,
  savePkce,
  getPkce,
  removePkce,
};