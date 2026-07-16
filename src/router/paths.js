export const ROUTES = {
  accueil: "/",
  recherche: "/archive",
  memoirePublic: (id) => `/memoires/${id}`,

  inscription: "/inscription",
  activation: "/activation",
  motDePasseOublie: "/mot-de-passe-oublie",
  reinitialiserMotDePasse: "/reinitialiser-mot-de-passe",
  connexionEtudiant: "/connexion-etudiant",
  connexionAdmin: "/connexion-admin",

  espaceEtudiant: "/etudiant/tableau-de-bord",
  depotEtudiant: "/etudiant/deposer",
  depotEtudiantModifier: (id) => `/etudiant/deposer/${id}`,
  memoireDetailEtudiant: (id) => `/etudiant/memoires/${id}`,
  profilEtudiant: "/etudiant/profil",

  espaceAdmin: "/admin/tableau-de-bord",
  etudiantsAutorisesAdmin: "/admin/etudiants-autorises",
};