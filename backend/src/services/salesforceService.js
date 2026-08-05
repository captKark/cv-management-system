const axios = require("axios");
const qs = require("querystring");

const sfConfig = require("../config/salesforce");

const {
  generateVerifier,
  generateChallenge,
  generateState,
  savePkce,
  getPkce,
  removePkce,
} = require("../utils/pkce");

const generateAuthorizationUrl = (userId, payload = {}) => {
  const verifier = generateVerifier();

  const challenge = generateChallenge(verifier);

  const state = generateState();

  savePkce(state, verifier, userId, payload);

  console.log("Salesforce Callback URL:", sfConfig.callbackUrl);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: sfConfig.clientId,
    redirect_uri: sfConfig.callbackUrl,
    code_challenge: challenge,
    code_challenge_method: "S256",
    state,
  });

  return `${sfConfig.loginUrl}/services/oauth2/authorize?${params.toString()}`;
};

const exchangeCodeForToken = async (code, state) => {
  const pkce = getPkce(state);

  if (!pkce) {
    throw new Error("Invalid or expired OAuth session.");
  }

  const maxAge = 10 * 60 * 1000;

  if (Date.now() - pkce.createdAt > maxAge) {
    removePkce(state);

    throw new Error("OAuth session expired.");
  }
  try {
    const response = await axios.post(
      `${sfConfig.loginUrl}/services/oauth2/token`,
      qs.stringify({
        grant_type: "authorization_code",
        client_id: sfConfig.clientId,
        client_secret: sfConfig.clientSecret,
        redirect_uri: sfConfig.callbackUrl,
        code,
        code_verifier: pkce.verifier,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    removePkce(state);

    return {
      accessToken: response.data.access_token,
      instanceUrl: response.data.instance_url,
      userId: pkce.userId,
      payload: pkce.payload,
    };
  } catch (error) {
    console.error(
      "Salesforce Token Exchange Failed:",
      error.response?.data || error.message,
    );

    throw new Error("Unable to obtain Salesforce access token.");
  }
};

const createAccount = async (accessToken, instanceUrl, data) => {
  const response = await axios.post(
    `${instanceUrl}/services/data/${sfConfig.apiVersion}/sobjects/Account`,
    {
      Name: data.company,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", 
      },
    },
  );

  return response.data.id;
};
const findContactByEmail = async (
  accessToken,
  instanceUrl,
  email,
) => {
  const query = `
    SELECT Id, FirstName, LastName, Email, Phone
    FROM Contact
    WHERE Email = '${email}'
    LIMIT 1
  `;

  const response = await axios.get(
    `${instanceUrl}/services/data/${sfConfig.apiVersion}/query`,
    {
      params: {
        q: query,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.data.totalSize > 0) {
    return response.data.records[0];
  }

  return null;
};
const createContact = async (accessToken, instanceUrl, accountId, data) => {
  const response = await axios.post(
    `${instanceUrl}/services/data/${sfConfig.apiVersion}/sobjects/Contact`,
    {
      AccountId: accountId,
      FirstName: data.firstName,
      LastName: data.lastName,
      Email: data.email,
      Phone: data.phone,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data.id;
};
const updateContact = async (
  accessToken,
  instanceUrl,
  contactId,
  data,
) => {
  await axios.patch(
    `${instanceUrl}/services/data/${sfConfig.apiVersion}/sobjects/Contact/${contactId}`,
    {
      FirstName: data.firstName,
      LastName: data.lastName,
      Phone: data.phone,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  return contactId;
};

module.exports = {
  generateAuthorizationUrl,
  exchangeCodeForToken,
  createAccount,
  createContact,
  findContactByEmail,
  updateContact,
};