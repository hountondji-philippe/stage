import { apiClient } from "../../../lib/apiClient";

// GET /periode-depot — accessible étudiant ET admin (hors groupe "admin")
// Réponse réelle : { licence_ouverte: boolean, master_ouverte: boolean }
export async function getStatutPeriodeDepot() {
  const { data } = await apiClient.get("/periode-depot");
  return data;
}

// GET /admin/periodes-depot — liste complète (admin uniquement)
// Réponse réelle : { periodes: [...] }
export async function getPeriodesDepot() {
  const { data } = await apiClient.get("/admin/periodes-depot");
  return data;
}

// POST /admin/periodes-depot/lancer
// "cycle" est obligatoire côté Laravel : "licence" | "master" | "tous"
export async function lancerPeriodeDepot({ date_debut, date_fin, cycle }) {
  const { data } = await apiClient.post("/admin/periodes-depot/lancer", {
    date_debut,
    date_fin,
    cycle,
  });
  return data; // { message, periode }
}

// POST /admin/periodes-depot/{periodeDepot}/fermer — nécessite l'id de la période
export async function fermerPeriodeDepot(periodeDepotId) {
  const { data } = await apiClient.post(`/admin/periodes-depot/${periodeDepotId}/fermer`);
  return data; // { message, periode }
}