import { useState, useEffect, useMemo, useCallback } from "react";
import { getMesMemoires } from "../api/memoiresApi";

export function useMesDepots() {
  const [memoires, setMemoires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtreStatut, setFiltreStatut] = useState(null);

  const fetchMemoires = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMesMemoires();
      setMemoires(data);
    } catch (err) {
      setError(err.response?.data?.message || "Impossible de charger vos dépôts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMemoires();
  }, [fetchMemoires]);

  const counts = useMemo(
    () => ({
      en_attente: memoires.filter((m) => m.statut === "en_attente").length,
      valide: memoires.filter((m) => m.statut === "valide").length,
      rejete: memoires.filter((m) => m.statut === "rejete").length,
    }),
    [memoires]
  );

  const memoiresFiltres = useMemo(() => {
    if (!filtreStatut) return memoires;
    return memoires.filter((m) => m.statut === filtreStatut);
  }, [memoires, filtreStatut]);

  const toggleFiltre = useCallback((statut) => {
    setFiltreStatut((current) => (current === statut ? null : statut));
  }, []);

  return {
    memoires: memoiresFiltres,
    counts,
    loading,
    error,
    filtreStatut,
    toggleFiltre,
    refetch: fetchMemoires,
  };
}