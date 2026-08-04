import { apiFetch } from "../utils/apiFetch";

const USER_API = `${import.meta.env.VITE_API_URL}/api/users`;

export const getUsers = async (params) => {
  const query = new URLSearchParams(params);

  const response = await apiFetch(
    `${USER_API}?${query.toString()}`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load users.");
  }

  return data;
};

const updateUsersStatus = async (ids, isActive) => {
  const response = await apiFetch(`${USER_API}/status`, {
    method: "PATCH",
    body: JSON.stringify({
      ids,
      isActive,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update users.");
  }

  return data;
};

export const activateUsers = (ids) => {
  return updateUsersStatus(ids, true);
};

export const deactivateUsers = (ids) => {
  return updateUsersStatus(ids, false);
};
export const createRecruiter = async (user) => {
  const response = await apiFetch(`${USER_API}/recruiters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create recruiter.",
    );
  }

  return data;
};
export const resetPassword = async (id, password) => {
  const response = await apiFetch(`${USER_API}/reset-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to reset password.");
  }

  return data;
};