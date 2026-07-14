// Chemins alignés sur AppRouter.jsx (et le plan de navigation du cahier des charges).
export const ROUTES = {
  accueil: "/",
  recherche: "/archive", // Écran 2 — "Archive de mémoires"
  memoirePublic: (id) => `/memoires/${id}`, // Écran 3

  inscription: "/inscription", // Écran 4 (visiteur → dépôt = doit d'abord s'inscrire)
  connexionEtudiant: "/connexion-etudiant", // Écran 6

  espaceEtudiant: "/etudiant/tableau-de-bord", // Écran 7
  depotEtudiant: "/etudiant/deposer", // Écran 8

  espaceAdmin: "/admin/tableau-de-bord", // Écran 10
};