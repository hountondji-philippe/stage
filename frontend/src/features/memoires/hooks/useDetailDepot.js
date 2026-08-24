import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getMemoireById } from "../api/memoiresApi";

export function useDetailDepot() {
  const { id } = useParams();
  const [depot, setDepot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDepot = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMemoireById(id);
      setDepot(data);
    } catch (err) {
      setError(err.response?.data?.message || "Impossible de charger ce dépôt.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDepot();
  }, [fetchDepot]);

  return { depot, loading, error, refetch: fetchDepot };
}