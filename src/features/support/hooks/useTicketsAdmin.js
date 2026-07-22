import { useCallback, useEffect, useState } from "react";
import { getTicketsAdmin, repondreTicket } from "../api/adminTicketsApi";

export function useTicketsAdmin() {
  const [tickets, setTickets] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0, per_page: 15 });
  const [statut, setStatut] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getTicketsAdmin({ statut, page });
      setTickets(data.data || []);
      setMeta({
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total,
        per_page: data.per_page,
      });
    } catch (err) {
      setError("Impossible de charger les tickets.");
    } finally {
      setLoading(false);
    }
  }, [statut, page]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  function updateStatut(value) {
    setStatut(value);
    setPage(1);
  }

  async function envoyerReponse(id, reponse) {
    await repondreTicket(id, reponse);
    await fetchTickets();
  }

  return {
    tickets,
    meta,
    statut,
    updateStatut,
    page,
    setPage,
    loading,
    error,
    envoyerReponse,
  };
}