import { useState, useEffect } from "react";
import { getSousFilieres } from "../api/filieresApi";

export function useSousFilieres(filiereId) {
  const [sousFilieres, setSousFilieres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!filiereId) {
      setSousFilieres([]);
      return;
    }

    let mounted = true;
    setLoading(true);
    setError(null);

    getSousFilieres(filiereId)
      .then((data) => mounted && setSousFilieres(data))
      .catch(() => mounted && setError("Impossible de charger les sous-filières."))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [filiereId]);

  return { sousFilieres, loading, error };
}