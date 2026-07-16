import { apiClient } from "../../../lib/apiClient";

/**
 * Liste des filières — route publique, pas de préfixe /admin.
 * GET /api/filieres
 * Réponse : { filieres: [...] }
 */
export async function getFilieres() {
  const { data } = await apiClient.get("/filieres");
  return data.filieres;
}
