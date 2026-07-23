import { apiClient } from "../../../lib/apiClient";

export async function getStatutPeriodeDepot() {
  const { data } = await apiClient.get("/periode-depot");
  return data; // { ouverte, periode }
}

export async function lancerPeriodeDepot({ date_debut, date_fin }) {
  const { data } = await apiClient.post("/admin/periode-depot/lancer", { date_debut, date_fin });
  return data; // { message, periode }
}

export async function fermerPeriodeDepot() {
  const { data } = await apiClient.post("/admin/periode-depot/fermer");
  return data; // { message, periode }
}