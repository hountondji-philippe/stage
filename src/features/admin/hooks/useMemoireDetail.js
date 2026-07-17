import { useEffect, useState } from "react";
import { getMemoiresEnAttente } from "../api/adminService";

/**
 * @param {string|number} id
 * @param {object|null} preloaded - mémoire déjà en main (venant d'une liste
 * précédente, passé via navigate(path, { state: { memoire } })). Si présent,
 * on évite tout fetch. Sinon, fallback sur la liste "en attente" — donc un
 * accès direct par URL à un mémoire déjà validé/rejeté échouera (pas de
 * route GET /admin/memoires/{id} dédiée côté backend).
 */
export function useMemoireDetail(id, preloaded) {
  const [memoire, setMemoire] = useState(preloaded ?? null);
  const [loading, setLoading] = useState(!preloaded);
  const [error, setError] = useState("");

  useEffect(() => {
    if (preloaded) return; // déjà en main, rien à faire

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
            setError("Ce dépôt est introuvable, ou a déjà été traité (consultez-le depuis la liste des mémoires).");
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
  }, [id, preloaded]);

  return { memoire, loading, error };
}
