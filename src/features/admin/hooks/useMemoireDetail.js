import { useEffect, useState } from "react";
import { getMemoireAdmin } from "../api/adminService";

export function useMemoireDetail(id, preloaded) {
  const [memoire, setMemoire] = useState(preloaded ?? null);
  const [loading, setLoading] = useState(!preloaded);
  const [error, setError] = useState("");

  useEffect(() => {
    if (preloaded) return;

    let cancelled = false;

    (async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await getMemoireAdmin(id);
        if (!cancelled) setMemoire(data.memoire);
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.status === 404
              ? "Ce dépôt est introuvable."
              : "Impossible de charger le dépôt."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, preloaded]);

  return { memoire, loading, error };
}