import { USER_STORAGE_KEY } from "../constants/storage";

export const getStoredAuth = () => {
  const stored = localStorage.getItem(USER_STORAGE_KEY);

  return stored ? JSON.parse(stored) : null;
};

export const saveAuth = (auth) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(auth));
};

export const clearAuth = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
};

export const getCurrentUser = () => {
  return getStoredAuth()?.user ?? null;
};

export const getAuthToken = () => {
  return getStoredAuth()?.token ?? null;
};

export const isAuthenticated = () => {
  return Boolean(getAuthToken());
};

export const hasRole = (...roles) => {
  const user = getCurrentUser();

  return user && roles.includes(user.role);
};
export const refreshStoredUser = (user) => {
  const auth = getStoredAuth();

  if (!auth?.token) {
    return;
  }

  saveAuth({
    ...auth,
    user,
  });
};
export const logout = () => {
  clearAuth();
};
