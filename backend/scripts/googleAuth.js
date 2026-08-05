require("dotenv").config();

const { google } = require("googleapis");
const http = require("http");
const url = require("url");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/oauth2callback"
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: [
    "https://www.googleapis.com/auth/drive.file",
  ],
  prompt: "consent",
});

console.log("\nOpen this URL:\n");
console.log(authUrl);


http.createServer(async (req, res) => {

  if (req.url.startsWith("/oauth2callback")) {

    const query =
      url.parse(req.url, true).query;

    const code = query.code;

    if (!code) {
      res.end("No code received");
      return;
    }


    const { tokens } =
      await oauth2Client.getToken(code);


    console.log("\n====================");
    console.log("REFRESH TOKEN:");
    console.log(tokens.refresh_token);
    console.log("====================\n");


    res.end(
      "Authorization complete. You can close this tab."
    );
  }

}).listen(3000);

console.log(
  "\nWaiting for OAuth callback on port 3000..."
);