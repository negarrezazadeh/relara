import httpPrivate from "@/utils/httpPrivate";

export const getProducts = async () => {
  const response = await httpPrivate.get("/api/v1/admin/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await httpPrivate.get(`/api/v1/admin/products/${id}`);
  return response.data;
}

export const createOrUpdateProduct = async ({ id, data }) => {
  if (!id) {
    // if ID is not provided, it's a create request
    const response = await httpPrivate.post("/api/v1/admin/products", data);
    return response.data;
  } else {
    // if ID is provided, it's an update request
    const response = await httpPrivate.put(`/api/v1/admin/products/${id}`, data);
    return response.data;
  }
};

export const deleteProduct = async (id) => {
  const response = await httpPrivate.delete(`/api/v1/admin/products/${id}`);
  return response.data;
}

// product variant APIS
export const getProductVariantById = async (id) => {
  const response = await httpPrivate.get(`/api/v1/admin/product-variants/${id}`);
  return response.data;
}

export const createOrUpdateProductVariants = async ({ id, data }) => {
  if (!id) {
    // if ID is not provided, it's a create request
    const response = await httpPrivate.post(`/api/v1/admin/product-variants`, data);
    return response.data;
  } else {
    // if ID is provided, it's an update request
    const response = await httpPrivate.put(`/api/v1/admin/product-variants/${id}`, data);
    return response.data;
  }
}

export const deleteProductVariant = async (id) => {
  const response = await httpPrivate.delete(`/api/v1/admin/product-variants/${id}`);
  return response.data;
}