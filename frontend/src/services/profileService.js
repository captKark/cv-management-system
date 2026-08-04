import { apiFetch } from "../utils/apiFetch";

const PROFILE_API =
  `${import.meta.env.VITE_API_URL}/api/profile`;

const getProfile = async () => {
  const response = await apiFetch(PROFILE_API);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load profile.",
    );
  }

  return data;
};

export { getProfile };