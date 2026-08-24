import { apiClient } from "../../../lib/apiClient";

export const rechercherGlobal = (q) =>
  apiClient.get("/recherche-globale", { params: { q } });