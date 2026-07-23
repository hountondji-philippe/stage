import { useState, useEffect } from "react";
import { getStatutPeriodeDepot } from "../../admin/api/periodeDepotApi";

export function usePeriodeDepot() {
  const [ouverte, setOuverte] = useState(null); // null = statut pas encore connu
  const [periode, setPeriode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getStatutPeriodeDepot()
      .then((data) => {
        if (!mounted) return;
        setOuverte(Boolean(data.ouverte));
        setPeriode(data.periode || null);
      })
      .catch(() => {
        // en cas d'échec réseau, on laisse `ouverte` à null plutôt que de bloquer à tort
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return { ouverte, periode, loading };
}