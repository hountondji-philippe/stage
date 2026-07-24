import { useState, useEffect } from "react";
import { getActualiteById } from "../../admin/api/actualitesApi";

export function useActualiteDetail(id) {
  const [actualite, setActualite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    getActualiteById(id)
      .then((data) => mounted && setActualite(data))
      .catch(() => mounted && setError("Cette actualité est introuvable."))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  return { actualite, loading, error };
}