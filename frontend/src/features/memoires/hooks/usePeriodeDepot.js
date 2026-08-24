import { useState, useEffect } from "react";
import { getStatutPeriodeDepot } from "../../admin/api/periodeDepotApi";
import { useAuth } from "../../auth/hooks/useAuth";

/**
 * Cycle déduit automatiquement du niveau de l'étudiant connecté :
 * L1/L2/L3 → "licence", M1/M2 → "master".
 * Permet de vérifier l'ouverture de la période dès le chargement de la
 * page, avant même que l'étudiant n'atteigne l'étape "Informations" où
 * le cycle est normalement choisi manuellement.
 */
function deduireCycle(niveau) {
  if (!niveau) return null;
  return niveau.startsWith("L") ? "licence" : "master";
}

export function usePeriodeDepot() {
  const { user } = useAuth();
  const cycle = deduireCycle(user?.etudiant_autorise?.niveau);

  const [ouverte, setOuverte] = useState(null); // null = statut pas encore connu
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    // Pas de niveau renseigné → impossible de déduire un cycle, donc
    // impossible de vérifier quoi que ce soit (le backend renverra de
    // toute façon une erreur 422 "niveau non renseigné" au submit).
    if (!cycle) {
      setLoading(false);
      return;
    }

    getStatutPeriodeDepot()
      .then((data) => {
        if (!mounted) return;
        const cle = cycle === "licence" ? "licence_ouverte" : "master_ouverte";
        setOuverte(Boolean(data[cle]));
      })
      .catch(() => {
        // en cas d'échec réseau, on laisse `ouverte` à null plutôt que de bloquer à tort
        if (mounted) setError("Impossible de vérifier le statut de la période de dépôt.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [cycle]);

  return { ouverte, cycle, loading, error };
}