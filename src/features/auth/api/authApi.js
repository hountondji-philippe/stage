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
  return data; // { message, type? } — succès = HTTP 200 ; type: "code_l2" | "lien_activation"
}

export async function verifierCodeL2({ matricule, code }) {
  const { data } = await apiClient.post("/auth/verifier-code-l2", { matricule, code });
  return data; // { message, token } — succès = HTTP 200
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

// ⚠️ Route supposée en convention standard (PUT /api/auth/modifier-email,
// champ "email") — à ajuster si le nom réel côté Laravel diffère une fois
// la route codée.
export async function modifierEmail(email) {
  const { data } = await apiClient.put("/auth/modifier-email", { email });
  return data; // { message, user } attendu
}

export async function demanderReinitialisation(email) {
  const { data } = await apiClient.post("/auth/mot-de-passe-oublie", { email });
  return data; // { message } — toujours 200, que l'email existe ou non (sécurité voulue)
}

export async function reinitialiserMotDePasse({ token, email, password, password_confirmation }) {
  const { data } = await apiClient.post("/auth/reinitialiser-mot-de-passe", {
    token,
    email,
    password,
    password_confirmation,
  });
  return data; // { message }
}

export const authApi = {
  login,
  logout,
  getMe,
  verifierMatricule,
  verifierCodeL2,
  activerCompte,
  renvoyerLien,
  changerMotDePasse,
  modifierEmail,
  demanderReinitialisation,
  reinitialiserMotDePasse,
};
export async function verifierAccesL2() {
  const { data } = await apiClient.get("/auth/verifier-acces-l2");
  return data;
}