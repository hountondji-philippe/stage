import { apiClient } from "../../../lib/apiClient";
import { extraireTableau } from "../../../lib/apiUtils";

export async function getSousFilieres(filiereId) {
  const { data } = await apiClient.get("/sous-filieres", {
    params: filiereId ? { filiere_id: filiereId } : {},
  });
  return extraireTableau(data, "sous_filieres"); // au lieu de "sousFilieres"
}