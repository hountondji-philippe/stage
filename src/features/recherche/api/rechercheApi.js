import { apiClient } from "../../../lib/apiClient";

/**
 * Récupère les mémoires avec filtres optionnels
 * params: { recherche, filiere_id, annee, ... }
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
  return data;
}