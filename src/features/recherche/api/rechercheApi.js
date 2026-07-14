import { apiClient } from "../../../lib/apiClient";

// GET /api/recherche/memoires?q=...&limit=...&sort=...
export async function searchMemoires(params = {}) {
  const { data } = await apiClient.get("/recherche/memoires", { params });
  return data; // supposé : { data: [...], meta: {...} } ou tableau direct
}