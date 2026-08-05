const xmlrpc = require("xmlrpc");
const config = require("../config/odoo");

const getHost = () =>
  new URL(config.url).hostname;

const getPort = () =>
  Number(new URL(config.url).port || 8069);

const commonClient = xmlrpc.createClient({
  host: getHost(),
  port: getPort(),
  path: "/xmlrpc/2/common",
});

const objectClient = xmlrpc.createClient({
  host: getHost(),
  port: getPort(),
  path: "/xmlrpc/2/object",
});

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