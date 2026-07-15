import { apiClient } from "../../../lib/apiClient";

// GET /api/filieres — route à ajouter côté backend
export async function getFilieres() {
  const { data } = await apiClient.get("/filieres");
  return data;
}