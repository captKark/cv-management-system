import { apiFetch } from "../utils/apiFetch";

const TEMPLATE_API = `${import.meta.env.VITE_API_URL}/api/templates`;

const sendRequest = async (url, options = {}) => {
  const response = await apiFetch(url, options);

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
};

const buildQuery = ({ page, search = "" }) => {
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("search", search);

  return params.toString();
};

export const getTemplates = (query) => {
  return sendRequest(`${TEMPLATE_API}?${buildQuery(query)}`);
};

export const getTemplate = (id) => {
  return sendRequest(`${TEMPLATE_API}/${id}`);
};

export const createTemplate = (template) => {
  return sendRequest(TEMPLATE_API, {
    method: "POST",
    body: JSON.stringify(template),
  });
};

export const updateTemplate = (id, template) => {
  return sendRequest(`${TEMPLATE_API}/${id}`, {
    method: "PUT",
    body: JSON.stringify(template),
  });
};

export const deleteTemplates = (ids) => {
  return sendRequest(TEMPLATE_API, {
    method: "DELETE",
    body: JSON.stringify({ ids }),
  });
};
export const generatePosition = (id) => {
  return sendRequest(
    `${TEMPLATE_API}/${id}/generate-position`,
    {
      method: "POST",
    },
  );
};