import axios from "axios";

// Base URL de l'API Laravel (à adapter en .env : VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

// Injecte le token Bearer (Laravel Sanctum) sur chaque requête si présent
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("mplus_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gestion centralisée des erreurs 401 (token invalide/expiré)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("mplus_token");
      // La redirection vers /connexion sera gérée par le contexte d'auth
    }
    return Promise.reject(error);
  }
);
