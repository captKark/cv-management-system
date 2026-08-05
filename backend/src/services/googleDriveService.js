const fs = require("fs");

const { google } = require("googleapis");

const oauth2Client =
  new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );

oauth2Client.setCredentials({
  refresh_token:
    process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});


const uploadFile = async (
  filePath,
  fileName,
) => {
  const response =
    await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [
          process.env.GOOGLE_DRIVE_FOLDER_ID,
        ],
      },

      media: {
        mimeType: "application/json",
        body: fs.createReadStream(filePath),
      },

      fields: "id",
    });

  return response.data.id;
};


module.exports = {
  uploadFile,
};