import httpPrivate from "@/utils/httpPrivate";

export const getCategories = async () => {
  const response = await httpPrivate.get("/api/v1/admin/categories");
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await httpPrivate.get(`/api/v1/admin/categories/${id}`);
  return response.data;
};

export const getAllCategories = async () => {
  const response = await httpPrivate.get("/api/v1/admin/categories/all");
  return response.data;
};

export const createOrUpdateCategory = async ({ id, data }) => {
  if (!id) {
    // if ID is not provided, it's a create request
    const response = await httpPrivate.post("/api/v1/admin/categories", data);
    return response.data;
  } else {
    // if ID is provided, it's an update request
    const response = await httpPrivate.put(`/api/v1/admin/categories/${id}`, data);
    return response.data;
  }
};

export const deleteCategory = async (id) => {
  const response = await httpPrivate.delete(`/api/v1/admin/categories/${id}`);
  return response.data;
};
