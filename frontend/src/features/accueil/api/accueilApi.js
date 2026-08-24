import { apiClient } from "../../../lib/apiClient";

export const getAccueilStats = () => apiClient.get("/admin/stats");
export const getStatsPubliques = () => apiClient.get("/stats-publiques");
export const getRecentMemoires = () => apiClient.get("/recherche/memoires?per_page=3");