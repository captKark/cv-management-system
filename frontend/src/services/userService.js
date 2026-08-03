import { apiFetch } from "../utils/apiFetch";

const USER_API = `${import.meta.env.VITE_API_URL}/api/users`;

export const getUsers = async (params) => {
  const query = new URLSearchParams(params);

  const response = await apiFetch(
    `${USER_API}?${query.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load users.");
  }

  return data;
};