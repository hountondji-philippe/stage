import { useState, useEffect } from "react";
import { getMemoireDetail, searchMemoires } from "../api/rechercheApi";

export function useMemoireDetail(id) {
  const [memoire, setMemoire] = useState(null);
  const [similaires, setSimilaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    getMemoireDetail(id)
      .then(async (data) => {
        if (!mounted) return;
        setMemoire(data);

        // Charge des mémoires similaires (même filière), exclut le mémoire courant
        try {
          const results = await searchMemoires({ filiere_id: data.filiere_id });
          const memoiresSimilaires = (results?.data || [])
            .filter((m) => m.id !== data.id)
            .slice(0, 3);
          if (mounted) setSimilaires(memoiresSimilaires);
        } catch {
          if (mounted) setSimilaires([]);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.response?.status === 404 ? "Ce mémoire n'est pas disponible." : "Une erreur est survenue.");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [id]);

  return { memoire, similaires, loading, error };
}