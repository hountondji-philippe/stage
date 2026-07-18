export const ROUTES = {
  accueil: "/",
  archive: "/archive",
  aPropos: "/a-propos",
  memoirePublic: (id) => `/memoires/${id}`,

  inscription: "/inscription",
  activation: (token) => `/activation/${token}`,
  motDePasseOublie: "/mot-de-passe-oublie",
  reinitialiserMotDePasse: "/reinitialiser-mot-de-passe",
  connexionEtudiant: "/connexion-etudiant",
  connexionAdmin: "/connexion-admin",

  espaceEtudiant: "/etudiant/tableau-de-bord",
  mesDepots: "/etudiant/mes-depots",
  depotEtudiant: "/etudiant/deposer",
  depotEtudiantModifier: (id) => `/etudiant/deposer/${id}`,
  memoireDetailEtudiant: (id) => `/etudiant/memoires/${id}`,
  profilEtudiant: "/etudiant/profil",

  espaceAdmin: "/admin/tableau-de-bord",
depotsEnAttenteAdmin: "/admin/depots-en-attente",
etudiantsAutorisesAdmin: "/admin/etudiants-autorises",
memoireDetailAdmin: (id) => `/admin/memoires/${id}`,
memoiresListeAdmin: "/admin/memoires",

};