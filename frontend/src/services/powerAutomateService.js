import { apiFetch } from "../utils/apiFetch";

export const exportToPowerAutomate = async () => {
  return apiFetch("/api/power-automate/export", {
    method: "POST",
  });
};