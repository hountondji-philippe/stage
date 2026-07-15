import { useState, useEffect } from "react";
import { getFilieres } from "../api/filieresApi";

export function useFilieres() {
  const [filieres, setFilieres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    getFilieres()
      .then((data) => mounted && setFilieres(data))
      .catch(() => mounted && setError("Impossible de charger les filières."))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return { filieres, loading, error };
}