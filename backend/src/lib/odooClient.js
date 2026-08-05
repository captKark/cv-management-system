const xmlrpc = require("xmlrpc");
const config = require("../config/odoo");

const url = new URL(config.url);

const clientOptions = {
  host: url.hostname,
  port: Number(
    url.port ||
      (url.protocol === "https:" ? 443 : 8069),
  ),
};

const createClient = (path) => {
  const options = {
    ...clientOptions,
    path,
  };

  if (url.protocol === "https:") {
    return xmlrpc.createSecureClient(options);
  }

  return xmlrpc.createClient(options);
};

const commonClient = createClient(
  "/xmlrpc/2/common",
);

const objectClient = createClient(
  "/xmlrpc/2/object",
);

const authenticate = () =>
  new Promise((resolve, reject) => {
    commonClient.methodCall(
      "authenticate",
      [
        config.db,
        config.username,
        config.password,
        {},
      ],
      (err, uid) => {
        if (err) {
          return reject(err);
        }

        if (!uid) {
          return reject(
            new Error(
              "Failed to authenticate with Odoo.",
            ),
          );
        }

        resolve(uid);
      },
    );
  });

const execute = async (
  model,
  method,
  args,
  kwargs = {},
) => {
  const uid = await authenticate();

  return new Promise((resolve, reject) => {
    objectClient.methodCall(
      "execute_kw",
      [
        config.db,
        uid,
        config.password,
        model,
        method,
        args,
        kwargs,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }

        resolve(result);
      },
    );
  });
};

module.exports = {
  execute,
};