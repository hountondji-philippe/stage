// ⚠️ Temporaire : en attendant une route GET /api/filieres,
// cette liste statique reprend les filières citées dans le cahier
// des charges / la maquette. À remplacer facilement par un hook
// (ex: useFilieres()) qui appelle l'API dès que la route existe.

export const FILIERES = [
  { id: "eco", nom: "Économie Appliquée" },
  { id: "gestion", nom: "Gestion de Projets" },
  { id: "stat", nom: "Statistiques Industrielles" },
  { id: "audit", nom: "Audit et Contrôle" },
];
