import httpPrivate from "@/utils/httpPrivate";

export const getAttributes = async () => {
  const response = await httpPrivate.get("/api/v1/attributes");
  return response.data;
};

export const getAttributeById = async (id) => {
  const response = await httpPrivate.get(`/api/v1/attributes/${id}`);
  return response.data;
};

export const createOrUpdateAttribute = async ({ id, data }) => {
  if (!id) {
    // if ID is not provided, it's a create request
    const response = await httpPrivate.post("/api/v1/attributes", data);
    return response.data;
  } else {
    // if ID is provided, it's an update request
    const response = await httpPrivate.put(`/api/v1/attributes/${id}`, data);
    return response.data;
  }
};
