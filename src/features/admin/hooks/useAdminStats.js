import { useEffect, useState } from "react";
import { getStats } from "../api/adminService";

export function useAdminStats() {
  const [stats, setStats] = useState({ total: 0, en_attente: 0, valide: 0, rejete: 0, par_filiere: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getStats();
        setStats(data);
      } catch (err) {
        setError("Impossible de charger les statistiques.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { stats, loading, error };
}
