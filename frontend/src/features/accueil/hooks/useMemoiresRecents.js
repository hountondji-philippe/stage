import { useEffect, useState } from "react";
import { searchMemoires } from "../../recherche/api/rechercheApi";

export function useMemoiresRecents(limit = 3) {
  const [memoires, setMemoires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await searchMemoires({ limit, sort: "recent" });
        // Tolère les deux formes de réponse possibles (paginé Laravel ou tableau brut)
        const list = Array.isArray(result) ? result : result.data ?? [];
        if (active) setMemoires(list);
      } catch (err) {
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [limit]);

  return { memoires, loading, error };
}