import { apiClient } from "../../../lib/apiClient"; // Vérifie bien le nom du fichier ici

export const getAccueilStats = () => apiClient.get("/admin/stats");
export const getRecentMemoires = () => apiClient.get("/recherche/memoires?per_page=3");