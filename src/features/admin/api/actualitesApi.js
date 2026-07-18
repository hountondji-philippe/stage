import { apiClient } from "../../../lib/apiClient";
import { extraireTableau } from "../../../lib/apiUtils";

export async function getActualites() {
  const { data } = await apiClient.get("/actualites");
  return extraireTableau(data, "actualites");
}

export async function createActualite({ titre, contenu, icone, date_publication }) {
  const { data } = await apiClient.post("/admin/actualites", { titre, contenu, icone, date_publication });
  return data; // { message, actualite }
}

export async function updateActualite(id, { titre, contenu, icone, date_publication }) {
  const { data } = await apiClient.put(`/admin/actualites/${id}`, {
    titre,
    contenu,
    icone,
    date_publication,
  });
  return data;
}

export async function deleteActualite(id) {
  const { data } = await apiClient.delete(`/admin/actualites/${id}`);
  return data;
}