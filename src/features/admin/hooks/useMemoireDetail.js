import { useEffect, useState } from "react";
import { getMemoiresEnAttente } from "../api/adminService";

/**
 * ⚠️ Pas de route GET /api/admin/memoires/{id} dédiée côté backend.
 * On récupère la liste des dépôts en attente et on retrouve celui
 * qui nous intéresse par son id. Si un jour tu ajoutes un vrai
 * endpoint de détail, remplace juste le contenu de ce hook.
 */
export function useMemoireDetail(id) {
  const [memoire, setMemoire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await getMemoiresEnAttente();
        const found = (data.memoires || []).find((m) => String(m.id) === String(id));
        if (!cancelled) {
          if (found) {
            setMemoire(found);
          } else {
            setError("Ce dépôt est introuvable ou a déjà été traité.");
          }
        }
      } catch (err) {
        if (!cancelled) setError("Impossible de charger le dépôt.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { memoire, loading, error };
}
