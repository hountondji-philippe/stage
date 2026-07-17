import { apiClient } from "../../../lib/apiClient";
import { extraireTableau } from "../../../lib/apiUtils";

export async function getFilieres() {
  const { data } = await apiClient.get("/filieres");
  return extraireTableau(data, "filieres");
}