import { apiClient } from "../../../lib/apiClient";

export async function login({ email, password }) {
  const { data } = await apiClient.post("/auth/login", { email, password });
  return data;
}

export async function logout() {
  const { data } = await apiClient.post("/auth/logout");
  return data;
}

export async function getMe() {
  const { data } = await apiClient.get("/auth/me");
  return data;
}

export async function verifierMatricule(matricule) {
  const { data } = await apiClient.post("/auth/verifier-matricule", { matricule });
  return data; // { message } — succès = HTTP 200
}

export async function activerCompte({ token, password, password_confirmation }) {
  const { data } = await apiClient.post("/auth/activer-compte", {
    token,
    password,
    password_confirmation,
  });
  return data; // { message, token, user } — succès = HTTP 201
}

export async function renvoyerLien(matricule) {
  const { data } = await apiClient.post("/auth/renvoyer-lien", { matricule });
  return data; // { message }
}

export async function changerMotDePasse({ mot_de_passe_actuel, mot_de_passe, mot_de_passe_confirmation }) {
  const { data } = await apiClient.post("/auth/changer-mot-de-passe", {
    mot_de_passe_actuel,
    mot_de_passe,
    mot_de_passe_confirmation,
  });
  return data;
}

export async function reinitialiserMotDePasse({ token, email, mot_de_passe, mot_de_passe_confirmation }) {
  const { data } = await apiClient.post("/auth/reinitialiser-mot-de-passe", {
    token,
    email,
    mot_de_passe,
    mot_de_passe_confirmation,
  });
  return data;
}

export const authApi = {
  login,
  logout,
  getMe,
  verifierMatricule,
  activerCompte,
  renvoyerLien,
  changerMotDePasse,
  reinitialiserMotDePasse,
};