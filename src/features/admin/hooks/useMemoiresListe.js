import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllMemoires, supprimerMemoire } from "../api/adminService";

export function useMemoiresListe() {
  const location = useLocation();
  const [memoires, setMemoires] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0, per_page: 15 });
  // --- AJOUT : démarre sur l'onglet demandé si on arrive via navigate(..., { state: { statutInitial } }) ---
  const [statut, setStatut] = useState(location.state?.statutInitial ?? "");
  // --- FIN AJOUT ---
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMemoires = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getAllMemoires({ statut, page });
      setMemoires(data.data || []);
      setMeta({
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total,
        per_page: data.per_page,
      });
    } catch (err) {
      setError("Impossible de charger la liste des mémoires.");
    } finally {
      setLoading(false);
    }
  }, [statut, page]);

  useEffect(() => {
    fetchMemoires();
  }, [fetchMemoires]);

  function updateStatut(value) {
    setStatut(value);
    setPage(1);
  }

  async function removeMemoire(id) {
    await supprimerMemoire(id);
    await fetchMemoires();
  }

  return {
    memoires,
    meta,
    statut,
    updateStatut,
    page,
    setPage,
    loading,
    error,
    removeMemoire,
  };
}