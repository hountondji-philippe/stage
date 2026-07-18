import { apiClient } from "../../../lib/apiClient";

/**
 * Normalise la réponse Laravel en tableau, quel que soit le format renvoyé :
 * - tableau brut : [...]
 * - API Resource collection : { data: [...] }
 * - réponse custom : { memoires: [...] }
 */
function extraireTableau(reponse) {
  if (Array.isArray(reponse)) return reponse;
  if (Array.isArray(reponse?.data)) return reponse.data;
  if (Array.isArray(reponse?.memoires)) return reponse.memoires;
  return [];
}

// GET /api/memoires/mes-memoires
export async function getMesMemoires() {
  const { data } = await apiClient.get("/memoires/mes-memoires");
  return extraireTableau(data);
}

// GET /api/memoires/{id} — réutilise mes-memoires (déjà scopé à l'utilisateur
// connecté côté backend, pas de route GET /memoires/{id} dédiée)
export async function getMemoireById(id) {
  const { data } = await apiClient.get("/memoires/mes-memoires");
  const liste = extraireTableau(data);
  const memoire = liste.find((m) => String(m.id) === String(id));

  if (!memoire) {
    throw new Error("Mémoire introuvable ou non autorisé.");
  }

  return memoire;
}

// POST /api/memoires (dépôt par l'étudiant connecté lui-même)
export async function creerMemoire(formData) {
  const { data } = await apiClient.post("/memoires", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data?.data ?? data;
}

// PUT /api/memoires/{id}
export async function modifierMemoire(id, formData) {
  formData.append("_method", "PUT");
  const { data } = await apiClient.post(`/memoires/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data?.data ?? data;
}

// POST /api/admin/memoires (ajout MANUEL par l'admin, pour un étudiant tiers)
// ⚠️ Route/champ supposés en convention standard — à confirmer avec le
// controller Laravel réel si le submit échoue.
export async function creerMemoireAdmin(formData) {
  const { data } = await apiClient.post("/admin/memoires", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data?.data ?? data;
}


// GET /mes-memoires/{id}/fichier/{type} — récupère le fichier en blob (auth via header, pas cookie)
export async function getFichierBlobUrl(memoireId, type) {
  const { data } = await apiClient.get(`/mes-memoires/${memoireId}/fichier/${type}`, {
    responseType: "blob",
  });
  return URL.createObjectURL(data);
}

// GET /mes-memoires/{id}/telecharger/{type} — déclenche un vrai téléchargement
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