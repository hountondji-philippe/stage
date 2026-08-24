import { useEffect, useState } from "react";
import { getEtudiants } from "../../admin/api/adminService";

/**
 * Liste des étudiants autorisés, simplifiée pour peupler un <select>
 * (utilisé quand l'admin dépose un mémoire pour un étudiant tiers).
 */
export function useEtudiantsOptions() {
  const [etudiants, setEtudiants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getEtudiants();
        const liste = data.data ?? data.etudiants ?? data ?? [];
        setEtudiants(liste);
      } catch (err) {
        setEtudiants([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { etudiants, loading };
}
