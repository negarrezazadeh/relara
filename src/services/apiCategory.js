import httpPrivate from "@/utils/httpPrivate";

export const getCategories = async () => {
  const response = await httpPrivate.get("/api/v1/categories");
  return response.data;
};

export const createCategory = async (data) => {
  const response = await httpPrivate.post("/api/v1/categories", data);
  return response.data;
};
