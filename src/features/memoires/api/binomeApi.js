import { apiClient } from "../../../lib/apiClient";

export const rechercherBinome = ({ recherche, filiereId, promo, excludeMatricule } = {}) =>
  apiClient.get('/etudiants-autorises/recherche-binome', {
    params: {
      recherche: recherche || undefined,
      filiere_id: filiereId || undefined,
      annee_scolaire: promo || undefined,
      exclude_matricule: excludeMatricule || undefined,
    },
  });