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
  return data;
}

export async function creerCompte({ matricule, email, password, password_confirmation }) {
  const { data } = await apiClient.post("/auth/creer-compte", {
    matricule,
    email,
    password,
    password_confirmation,
  });
  return data;
}

export async function activerCompte(token) {
  const { data } = await apiClient.post("/auth/activer-compte", { token });
  return data;
}

export async function renvoyerLien(email) {
  const { data } = await apiClient.post("/auth/mot-de-passe-oublie", { email });
  return data;
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
  creerCompte,
  activerCompte,
  renvoyerLien,
  changerMotDePasse,
  reinitialiserMotDePasse,
};