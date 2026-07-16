import { useEffect, useState } from "react";
import { getFilieres } from "../api/filieresApi";

/**
 * Charge la liste des filières depuis l'API au montage.
 * Remplace la constante statique constants/filieres.js.
 */
export function useFilieres() {
  const [filieres, setFilieres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getFilieres();
        setFilieres(data ?? []);
      } catch (err) {
        setFilieres([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { filieres, loading };
}
