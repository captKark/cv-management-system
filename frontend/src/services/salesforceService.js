import axios from "axios";

import { getAuthToken } from "../utils/auth";

const API_URL = `${import.meta.env.VITE_API_URL}/api/salesforce`;

const getHeaders = () => ({
  Authorization: `Bearer ${getAuthToken()}`,
});

export const startSalesforceExport = async (
  company,
  phone,
) => {
  const response = await axios.post(
    `${API_URL}/start`,
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