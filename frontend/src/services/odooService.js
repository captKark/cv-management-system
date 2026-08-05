import axios from "axios";

import { getAuthToken } from "../utils/auth";

const API_URL = `${import.meta.env.VITE_API_URL}/api/odoo`;

const getHeaders = () => ({
  Authorization: `Bearer ${getAuthToken()}`,
});

export const exportToOdoo = async (
  company,
  phone,
) => {
  const response = await axios.post(
    `${API_URL}/export`,
    {
      company,
      phone,
    },
    {
      headers: getHeaders(),
    },
  );

  return response.data;
};