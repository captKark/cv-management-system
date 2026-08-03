import { apiFetch } from "../utils/apiFetch";

const AUTH_API = `${import.meta.env.VITE_API_URL}/api/auth`;

const sendRequest = async (endpoint, options = {}) => {
  const response = await apiFetch(`${AUTH_API}/${endpoint}`, options);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
};

export const login = (credentials) =>
  sendRequest("login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const register = (user) =>
  sendRequest("register", {
    method: "POST",
    body: JSON.stringify(user),
  });

export const getCurrentUser = () => sendRequest("me");
