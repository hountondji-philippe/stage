import { apiClient } from "../../../lib/apiClient";
import { extraireTableau } from "../../../lib/apiUtils";

/**
 * Récupère les mémoires avec filtres optionnels
 * params: { recherche, filiere_id, sous_filiere_id, cycle, annee, tri, page, ... }
 */
export async function searchMemoires(params = {}) {
  const { data } = await apiClient.get("/recherche/memoires", { params });
  return data;
}

/**
 * Récupère la liste des filières pour les menus déroulants
 */
export async function getFilieres() {
  const { data } = await apiClient.get("/filieres");
  return extraireTableau(data, "filieres");
}

/**
 * Récupère le détail public d'un mémoire.
 * GET /api/memoires/publics/{id}
 */
export async function getMemoireDetail(id) {
  const { data } = await apiClient.get(`/memoires/publics/${id}`);
  return data.memoire;
}

/**
 * Demande une URL signée temporaire (5 min) pour afficher le PDF dans un <iframe>.
 * Passe par axios (donc authentifié avec le Bearer token), contrairement à l'ancienne URL directe.
 */
export async function getFichierUrlSigne(id) {
  const { data } = await apiClient.get(`/memoires/${id}/lien-fichier`);
  return data.url;
}

export function getTelechargerUrl(id) {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
  return `${API_URL}/memoires/${id}/telecharger`;
}