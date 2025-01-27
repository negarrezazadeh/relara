import httpPrivate from "@/utils/httpPrivate";

export const getDiscountCodes = async () => {
  const response = await httpPrivate.get(`/api/v1/admin/discount-codes`);
  return response.data;
}

export const getDiscountCodeById = async (id) => {
  const response = await httpPrivate.get(`/api/v1/admin/discount-codes/${id}`);
  return response.data;
}

export const createOrUpdateDiscountCode = async ({ id, data }) => {
  if (!id) {
    // if ID is not provided, it's a create request
    const response = await httpPrivate.post(`/api/v1/admin/discount-codes`, data);
    return response.data;
  } else {
    // if ID is provided, it's an update request
    const response = await httpPrivate.put(`/api/v1/admin/discount-codes/${id}`, data);
    return response.data;
  }
}

export const deleteDiscountCode = async (id) => {
  const response = await httpPrivate.delete(`/api/v1/admin/discount-codes/${id}`);
  return response.data;
}