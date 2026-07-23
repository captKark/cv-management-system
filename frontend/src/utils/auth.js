import { USER_STORAGE_KEY } from "../constants/storage";

export const getStoredAuth = () => {
  const stored = localStorage.getItem(USER_STORAGE_KEY);

  return stored ? JSON.parse(stored) : null;
};

export const getCurrentUser = () => {
  const auth = getStoredAuth();

  return auth?.user ?? null;
};

export const getAuthToken = () => {
  const auth = getStoredAuth();

  return auth?.token ?? null;
};

export const hasRole = (...roles) => {
  const user = getCurrentUser();

  return user && roles.includes(user.role);
};
export const logout = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
};