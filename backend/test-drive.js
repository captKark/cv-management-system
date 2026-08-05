require("dotenv").config();

const path = require("path");
const fs = require("fs");

console.log("Credentials path:");
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

console.log("Absolute path:");
console.log(
  path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS)
);

console.log(
  "Exists:",
  fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)
);

const drive = require("./src/services/googleDriveService");

(async () => {
  try {
    const id = await drive.uploadFile(
      "./package.json",
      "package.json"
    );

    console.log("SUCCESS");
    console.log(id);
  } catch (err) {
    console.error(err);
  }
})();