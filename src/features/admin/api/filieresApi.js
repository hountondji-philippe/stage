import { apiClient } from "../../../lib/apiClient";
import { extraireTableau } from "../../../lib/apiUtils";

export async function getFilieres() {
  const { data } = await apiClient.get("/filieres");
  return extraireTableau(data, "filieres");
}

export async function createFiliere({ nom, description }) {
  const { data } = await apiClient.post("/admin/filieres", { nom, description });
  return data; // { message, filiere }
}

export async function updateFiliere(id, { nom, description }) {
  const { data } = await apiClient.put(`/admin/filieres/${id}`, { nom, description });
  return data; // { message, filiere }
}

export async function deleteFiliere(id) {
  const { data } = await apiClient.delete(`/admin/filieres/${id}`);
  return data; // { message }
}

export async function getSousFilieres(filiereId) {
  const { data } = await apiClient.get("/sous-filieres", { params: { filiere_id: filiereId } });
  return extraireTableau(data, "sous_filieres");
}

export async function createSousFiliere({ nom, filiere_id }) {
  const { data } = await apiClient.post("/admin/sous-filieres", { nom, filiere_id });
  return data;
}

export async function updateSousFiliere(id, { nom, filiere_id }) {
  const { data } = await apiClient.put(`/admin/sous-filieres/${id}`, { nom, filiere_id });
  return data;
}

export async function deleteSousFiliere(id) {
  const { data } = await apiClient.delete(`/admin/sous-filieres/${id}`);
  return data;
}

export async function getMemoiresAdmin(params = {}) {
  const { data } = await apiClient.get("/admin/memoires", { params });
  return data;
}