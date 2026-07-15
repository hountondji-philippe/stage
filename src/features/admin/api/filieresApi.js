import { apiClient } from "../../../lib/apiClient";

/**
 * Liste des filières — route publique, pas de préfixe /admin.
 * GET /api/filieres
 */
export async function getFilieres() {
  const { data } = await apiClient.get("/filieres");
  return data; // à ajuster selon que FiliereController::index renvoie [...] ou { data: [...] }
}
