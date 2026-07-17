export const ROUTES = {
  accueil: "/",
  archive: "/archive",
  memoirePublic: (id) => `/memoires/${id}`,

  inscription: "/inscription",
  activation: (token) => `/activation/${token}`,
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
  depotsEnAttenteAdmin: "/admin/depots-en-attente",
  etudiantsAutorisesAdmin: "/admin/etudiants-autorises",
};