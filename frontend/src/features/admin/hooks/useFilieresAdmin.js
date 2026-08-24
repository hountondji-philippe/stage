import { useState, useEffect, useCallback } from "react";
import { getFilieres, createFiliere, updateFiliere, deleteFiliere } from "../api/filieresApi";

export function useFilieresAdmin() {
  const [filieres, setFilieres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    return getFilieres()
      .then(setFilieres)
      .catch(() => setError("Impossible de charger les filières."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  async function addFiliere(payload) {
    await createFiliere(payload);
    await refetch();
  }

  async function editFiliere(id, payload) {
    await updateFiliere(id, payload);
    await refetch();
  }

  async function removeFiliere(id) {
    await deleteFiliere(id);
    await refetch();
  }

  return { filieres, loading, error, refetch, addFiliere, editFiliere, removeFiliere };
}