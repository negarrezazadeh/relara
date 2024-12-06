import httpPrivate from "@/utils/httpPrivate";

export const getProducts = async () => {
    const response = await httpPrivate.get("/api/v1/products");
    return response.data;
};