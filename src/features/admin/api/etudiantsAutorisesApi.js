import { apiClient } from "../../../lib/apiClient";

const BASE_URL = "/admin/etudiants-autorises";

/**
 * Liste des étudiants autorisés, avec recherche + filtre filière.
 * GET /api/admin/etudiants-autorises?recherche=...&filiere_id=...&promo=...
 *
 * Réponse Laravel paginée : { data: [...], current_page, last_page, total, ... }
 */
export async function getEtudiants({ recherche = "", filiereId = "", promo = "" } = {}) {
  const { data } = await apiClient.get(BASE_URL, {
    params: {
      recherche: recherche || undefined,
      filiere_id: filiereId || undefined,
      promo: promo || undefined,
    },
  });
  return data; // { data: [...], current_page, last_page, total, ... }
}

/**
 * Ajout d'un étudiant autorisé.
 * POST /api/admin/etudiants-autorises
 */
export async function createEtudiant(payload) {
  const { data } = await apiClient.post(BASE_URL, payload);
  return data;
}

/**
 * Modification d'un étudiant autorisé.
 * PUT /api/admin/etudiants-autorises/{id}
 */
export async function updateEtudiant(id, payload) {
  const { data } = await apiClient.put(`${BASE_URL}/${id}`, payload);
  return data;
}

/**
 * Suppression d'un seul étudiant.
 * DELETE /api/admin/etudiants-autorises/{id}
 */
export async function deleteEtudiant(id) {
  const { data } = await apiClient.delete(`${BASE_URL}/${id}`);
  return data;
}

/**
 * Suppression groupée (sélection multiple).
 * Pas de route bulk-delete côté backend pour l'instant : on enchaîne
 * simplement plusieurs DELETE /api/admin/etudiants-autorises/{id}.
 */
export async function deleteEtudiants(ids) {
  await Promise.all(ids.map((id) => deleteEtudiant(id)));
}

/**
 * Import en masse (Excel/CSV).
 * POST /api/admin/etudiants-autorises/import
 * ⚠️ Endpoint supposé (non listé séparément dans le cahier des charges,
 * qui mentionne juste "POST /api/admin/etudiants-autorises" pour l'import).
 * À ajuster si ton backend expose une route dédiée différente.
 */
export async function importEtudiants(file) {
  const formData = new FormData();
  formData.append("fichier", file);

  const { data } = await apiClient.post(`${BASE_URL}/import`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}
