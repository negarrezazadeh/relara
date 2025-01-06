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

export const getUserById = async (id) => {
  const response = await httpPrivate.get(`/api/v1/users/${id}`);
  return response.data;
};

export const getUsers = async (page) => {
  const response = await httpPrivate.get(`/api/v1/users?page=${page}`);
  const { data, current_page, last_page, next_page_url, prev_page_url } =
    response.data;
  return {
    users: data,
    currentPage: current_page,
    lastPage: last_page,
    nextPageUrl: next_page_url,
    prevPageUrl: prev_page_url,
  };
};

export const createOrUpdateUser = async ({ data, id }) => {
  if (!id) {
    const response = await httpPrivate.post("/api/v1/users", data);
    return response.data;
  } else {
    const response = await httpPrivate.put(`/api/v1/users/${id}`, data);
    return response.data;
  }
};

export const deleteUser = async (id) => {
  const response = await httpPrivate.delete(`/api/v1/users/${id}`);
  return response.data;
};
