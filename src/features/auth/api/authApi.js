import { apiClient } from "../../../lib/apiClient";

export async function login({ email, password }) {
  const { data } = await apiClient.post("/auth/login", { email, password });
  return data; // { token, user, ... } selon la réponse Laravel Sanctum
}

export async function logout() {
  const { data } = await apiClient.post("/auth/logout");
  return data;
}

export async function getMe() {
  const { data } = await apiClient.get("/auth/me");
  return data;
}