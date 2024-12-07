import httpPrivate from "@/utils/httpPrivate";

export const getProducts = async () => {
  const response = await httpPrivate.get("/api/v1/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await httpPrivate.get(`/api/v1/products/${id}`);
  return response.data;
}

export const createOrUpdateProduct = async ({ id, data }) => {
  if (!id) {
    // if ID is not provided, it's a create request
    const response = await httpPrivate.post("/api/v1/products", data);
    return response.data;
  } else {
    // if ID is provided, it's an update request
    const response = await httpPrivate.put(`/api/v1/products/${id}`, data);
    return response.data;
  }
};

export const deleteProduct = async (id) => {
  const response = await httpPrivate.delete(`/api/v1/products/${id}`);
  return response.data;
}