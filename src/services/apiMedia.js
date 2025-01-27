import httpPrivate from "@/utils/httpPrivate";

export const uploadMedia = async (image) => {
  const response = await httpPrivate.post("/api/v1/admin/upload/image", {image} , {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
