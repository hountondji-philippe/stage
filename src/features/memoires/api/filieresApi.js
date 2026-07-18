import { apiClient } from "../../../lib/apiClient";
import { extraireTableau } from "../../../lib/apiUtils";

export async function getFilieres() {
  const { data } = await apiClient.get("/filieres");
  return extraireTableau(data, "filieres");
}

export async function getSousFilieres(filiereId) {
  const { data } = await apiClient.get("/sous-filieres", { params: { filiere_id: filiereId } });
  return extraireTableau(data, "sous_filieres");
}

export async function getToutesSousFilieres() {
  const { data } = await apiClient.get("/sous-filieres");
  return extraireTableau(data, "sous_filieres");
}