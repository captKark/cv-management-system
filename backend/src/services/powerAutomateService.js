const fs = require("fs/promises");
const path = require("path");

const googleDriveService = require("./googleDriveService");

const exportCandidate = async (candidate) => {
  const exportDirectory = path.join(
    process.cwd(),
    "exports",
  );

  await fs.mkdir(exportDirectory, {
    recursive: true,
  });

  const fileName = `${candidate.email.replace(
    /[^a-zA-Z0-9]/g,
    "_",
  )}_${Date.now()}.json`;

  const filePath = path.join(
    exportDirectory,
    fileName,
  );

  await fs.writeFile(
    filePath,
    JSON.stringify(candidate, null, 2),
  );

  const driveFileId =
    await googleDriveService.uploadFile(
      filePath,
      fileName,
    );

  return {
    fileName,
    driveFileId,
  };
};

module.exports = {
  exportCandidate,
};