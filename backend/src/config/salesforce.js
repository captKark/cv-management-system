module.exports = {
  clientId: process.env.SALESFORCE_CLIENT_ID,
  clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
  loginUrl: process.env.SALESFORCE_LOGIN_URL || "https://login.salesforce.com",

  callbackUrl: process.env.SALESFORCE_CALLBACK_URL,

  apiVersion: "v60.0",
};
