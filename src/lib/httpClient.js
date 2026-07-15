import axios from 'axios';

/**
 * Instance Axios centralisée pour toute l'application.
 * Toutes les erreurs sont normalisées au format :
 * { status, message, errors }
 * - errors contient les erreurs de validation Laravel (422) par champ, si présentes.
 */
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    return Promise.reject({
      status,
      message: data?.message || 'Une erreur est survenue. Veuillez réessayer.',
      errors: data?.errors || null,
    });
  }
);

export default httpClient;
