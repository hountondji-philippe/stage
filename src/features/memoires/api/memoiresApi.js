import { apiClient } from "../../../lib/apiClient";

function extraireTableau(reponse) {
  if (Array.isArray(reponse)) return reponse;
  if (Array.isArray(reponse?.data)) return reponse.data;
  if (Array.isArray(reponse?.memoires)) return reponse.memoires;
  return [];
}

export async function getMesMemoires() {
  const { data } = await apiClient.get("/memoires/mes-memoires");
  return extraireTableau(data);
}

export async function getMemoireById(id) {
  const { data } = await apiClient.get("/memoires/mes-memoires");
  const liste = extraireTableau(data);
  const memoire = liste.find((m) => String(m.id) === String(id));

  if (!memoire) {
    throw new Error("Mémoire introuvable ou non autorisé.");
  }

  return memoire;
}

export async function creerMemoire(formData) {
  const { data } = await apiClient.post("/memoires", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data?.data ?? data;
}

export async function modifierMemoire(id, formData) {
  formData.append("_method", "PUT");
  const { data } = await apiClient.post(`/memoires/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data?.data ?? data;
}

export async function creerMemoireAdmin(formData) {
  const { data } = await apiClient.post("/admin/memoires", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data?.data ?? data;
}

export async function getFichierBlobUrl(memoireId, type) {
  const { data } = await apiClient.get(`/mes-memoires/${memoireId}/fichier/${type}`, {
    responseType: "blob",
  });
  return URL.createObjectURL(data);
}

export async function telechargerFichierAuthentifie(memoireId, type, nomFichier) {
  const { data } = await apiClient.get(`/mes-memoires/${memoireId}/telecharger/${type}`, {
    responseType: "blob",
  });
  const url = URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomFichier || `${type}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function supprimerMemoire(id) {
  const { data } = await apiClient.delete(`/memoires/${id}`);
  return data;
}