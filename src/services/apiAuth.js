import http from "@/utils/http";
import httpPrivate from "@/utils/httpPrivate";

export const login = async ({ email, password }) => {
  const response = await http.post("/api/v1/login", { email, password });
  return response.data;
};

export const getUser = async () => {
  const response = await httpPrivate.get("/api/user");
  return response.data;
};

export const getUsers = async () => {
  const response = await httpPrivate.get("/api/v1/users");
  return response.data;
};
