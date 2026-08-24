import { apiClient } from "../../../lib/apiClient";

export const rechercherGlobal = (q) =>
  apiClient.get("/admin/recherche-globale", { params: { q } });