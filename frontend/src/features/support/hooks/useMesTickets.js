import { useCallback, useEffect, useState } from "react";
import { getMesTickets } from "../api/ticketsApi";

export function useMesTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getMesTickets();
      setTickets(data.tickets || []);
    } catch (err) {
      setError("Impossible de charger vos tickets.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return { tickets, loading, error, refetch: fetchTickets };
}