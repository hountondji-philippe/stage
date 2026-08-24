import { useState, useEffect, useCallback } from "react";
import { getActualites, createActualite, updateActualite, deleteActualite } from "../api/actualitesApi";

export function useActualitesAdmin() {
  const [actualites, setActualites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    return getActualites()
      .then(setActualites)
      .catch(() => setError("Impossible de charger les actualités."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  async function addActualite(payload) {
    await createActualite(payload);
    await refetch();
  }

  async function editActualite(id, payload) {
    await updateActualite(id, payload);
    await refetch();
  }

  async function removeActualite(id) {
    await deleteActualite(id);
    await refetch();
  }

  return { actualites, loading, error, refetch, addActualite, editActualite, removeActualite };
}