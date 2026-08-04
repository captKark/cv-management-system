import { apiFetch } from "../utils/apiFetch";

const ATTRIBUTE_API =
  `${import.meta.env.VITE_API_URL}/api/attributes`;

const sendRequest = async (url) => {
  const response = await apiFetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Request failed.",
    );
  }

  return data;
};

export const getAllAttributes = () => {
  return sendRequest(ATTRIBUTE_API);
};