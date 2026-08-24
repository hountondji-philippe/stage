/**
 * Normalise une réponse API dont la forme du tableau peut varier
 * selon le contrôleur Laravel (tableau brut, { data: [] }, { filieres: [] }, etc.)
 */
export function extraireTableau(reponse, cle) {
  if (Array.isArray(reponse)) return reponse;
  if (cle && Array.isArray(reponse?.[cle])) return reponse[cle];
  if (Array.isArray(reponse?.data)) return reponse.data;
  return [];
}