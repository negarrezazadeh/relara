import http from "@/utils/http";

export const login = async ({email, password}) => {
  const response = await http.post("/api/v1/login", { email, password });
  return response.data;
};
