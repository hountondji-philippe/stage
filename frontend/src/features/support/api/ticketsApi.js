import { apiClient } from "../../../lib/apiClient";

export const getMesTickets = () => apiClient.get("/mes-tickets");
export const creerTicket = (data) => apiClient.post("/tickets", data);