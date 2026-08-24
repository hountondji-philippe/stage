import { useCallback, useEffect, useState } from "react";
import { getEtudiant } from "../api/etudiantsAutorisesApi";

export function useEtudiantDetail(id) {
  const [etudiant, setEtudiant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEtudiant = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getEtudiant(id);
      setEtudiant(data);
    } catch (err) {
      setError("Impossible de charger cet étudiant.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEtudiant();
  }, [fetchEtudiant]);

  return { etudiant, loading, error, refetch: fetchEtudiant };
}