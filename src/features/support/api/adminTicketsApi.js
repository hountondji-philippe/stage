import { apiClient } from "../../../lib/apiClient";

export const getTicketsAdmin = ({ statut, page } = {}) =>
  apiClient.get("/admin/tickets", { params: { statut: statut || undefined, page } });

export const getStatsTicketsOuverts = () => apiClient.get("/admin/tickets/stats");

export const repondreTicket = (id, reponse) =>
  apiClient.post(`/admin/tickets/${id}/repondre`, { reponse });