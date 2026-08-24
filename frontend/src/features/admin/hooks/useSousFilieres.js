import { useState, useEffect, useCallback } from "react";
import { getSousFilieres } from "../api/filieresApi";

export function useSousFilieres(filiereId) {
  const [sousFilieres, setSousFilieres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = useCallback(() => {
    if (!filiereId) {
      setSousFilieres([]);
      return Promise.resolve();
    }
    setLoading(true);
    setError(null);
    return getSousFilieres(filiereId)
      .then(setSousFilieres)
      .catch(() => setError("Impossible de charger les sous-filières."))
      .finally(() => setLoading(false));
  }, [filiereId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { sousFilieres, loading, error, refetch };
}