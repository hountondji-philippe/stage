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

// Construit les URLs directes (pas via axios, pour <iframe>/<a href>)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export function getFichierUrl(id) {
  return `${API_URL}/memoires/${id}/fichier`;
}

export function getTelechargerUrl(id) {
  return `${API_URL}/memoires/${id}/telecharger`;
}