import { USER_STORAGE_KEY } from "../constants/storage";

export const getCurrentUser = () => {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);

  return storedUser ? JSON.parse(storedUser) : null;
};

export const hasRole = (...roles) => {
  const user = getCurrentUser();

  return user && roles.includes(user.role);
};