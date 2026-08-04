module.exports = {
  clientId: process.env.SF_CLIENT_ID,
  clientSecret: process.env.SF_CLIENT_SECRET,
  loginUrl:
    process.env.SF_LOGIN_URL ||
    "https://login.salesforce.com",
};