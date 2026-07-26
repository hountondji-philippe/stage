import { apiClient } from "../../../lib/apiClient";

const BASE_URL = "/admin/etudiants-autorises";

/**
 * Liste des étudiants autorisés, avec recherche + filtre filière + statut de compte.
 * GET /api/admin/etudiants-autorises?recherche=...&filiere_id=...&annee_scolaire=...&compte_active=...
 *
 * Réponse Laravel paginée : { data: [...], current_page, last_page, total, ... }
 */
export async function getEtudiants({
  recherche = "",
  filiereId = "",
  annee_scolaire = "",
  compteActive = "",
  anneeValidee = "",
} = {}) {
  const { data } = await apiClient.get(BASE_URL, {
    params: {
      recherche: recherche || undefined,
      filiere_id: filiereId || undefined,
      annee_scolaire: annee_scolaire || undefined,
      compte_active: compteActive === "" ? undefined : compteActive,
      annee_validee: anneeValidee === "" ? undefined : anneeValidee,
    },
  });
  return data;
}

/**
 * Ajout d'un étudiant autorisé.
 * POST /api/admin/etudiants-autorises
 * Réponse : { message, etudiant: {...} }  (status 201)
 */
export async function createEtudiant(payload) {
  const { data } = await apiClient.post(BASE_URL, payload);
  return data.etudiant;
}

/**
 * Modification d'un étudiant autorisé.
 * PUT /api/admin/etudiants-autorises/{id}
 * Réponse : { message, etudiant: {...} }
 */
export async function updateEtudiant(id, payload) {
  const { data } = await apiClient.put(`${BASE_URL}/${id}`, payload);
  return data.etudiant;
}

/**
 * Suppression d'un seul étudiant.
 * DELETE /api/admin/etudiants-autorises/{id}
 *
 * ⚠️ Le backend refuse avec un 409 si l'étudiant a déjà un compte actif
 * (message: "Impossible de supprimer un étudiant ayant déjà un compte actif.").
 * On laisse l'erreur remonter telle quelle (axios throw) pour que l'appelant
 * affiche err.response.data.message.
 */
export async function deleteEtudiant(id) {
  const { data } = await apiClient.delete(`${BASE_URL}/${id}`);
  return data;
}

/**
 * Suppression groupée (sélection multiple).
 * Pas de route bulk-delete côté backend : on enchaîne plusieurs
 * DELETE /api/admin/etudiants-autorises/{id}, sans laisser un seul échec
 * (ex: compte actif → 409) bloquer les autres suppressions.
 *
 * Retourne { succeeded: [ids...], failed: [{ id, message }...] } pour que
 * l'UI puisse dire "3 supprimés, 1 non supprimé (compte actif)".
 */
export async function deleteEtudiants(ids) {
  const results = await Promise.allSettled(ids.map((id) => deleteEtudiant(id)));

  const succeeded = [];
  const failed = [];

  results.forEach((result, index) => {
    const id = ids[index];
    if (result.status === "fulfilled") {
      succeeded.push(id);
    } else {
      failed.push({
        id,
        message: result.reason?.response?.data?.message ?? "Erreur inconnue.",
      });
    }
  });

  return { succeeded, failed };
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

  const { data } = await apiClient.post(`${BASE_URL}/importer`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}


export async function getEtudiant(id) {
  const { data } = await apiClient.get(`${BASE_URL}/${id}`);
  return data.etudiant;
}