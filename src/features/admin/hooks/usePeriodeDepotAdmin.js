import { useState, useEffect, useCallback } from "react";
import { getStatutPeriodeDepot, lancerPeriodeDepot, fermerPeriodeDepot } from "../api/periodeDepotApi";
import { createActualite } from "../api/actualitesApi";

function formatDateAffichage(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

export function usePeriodeDepotAdmin() {
  const [ouverte, setOuverte] = useState(false);
  const [periode, setPeriode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    return getStatutPeriodeDepot()
      .then((data) => {
        setOuverte(Boolean(data.ouverte));
        setPeriode(data.periode || null);
      })
      .catch(() => setError("Impossible de charger le statut de la période de dépôt."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  async function lancer({ date_debut, date_fin }) {
    setActionLoading(true);
    setActionError(null);
    try {
      await lancerPeriodeDepot({ date_debut, date_fin });

      // Annonce automatique aux étudiants
      await createActualite({
        titre: "Ouverture de la période de dépôt des mémoires",
        contenu: `La période de dépôt des mémoires est ouverte du ${formatDateAffichage(date_debut)} au ${formatDateAffichage(date_fin)}. Les étudiants concernés peuvent désormais soumettre leur mémoire pour validation.`,
        icone: "Megaphone",
        date_publication: new Date().toISOString().slice(0, 10),
      });

      await refetch();
    } catch (err) {
      setActionError(err.response?.data?.message || "Une erreur est survenue lors du lancement de la période.");
      throw err;
    } finally {
      setActionLoading(false);
    }
  }

  async function fermer() {
    setActionLoading(true);
    setActionError(null);
    try {
      await fermerPeriodeDepot();

      await createActualite({
        titre: "Fermeture de la période de dépôt des mémoires",
        contenu:
          "La période de dépôt des mémoires est désormais fermée. Les nouveaux dépôts ne sont plus acceptés jusqu'à la prochaine ouverture.",
        icone: "Bell",
        date_publication: new Date().toISOString().slice(0, 10),
      });

      await refetch();
    } catch (err) {
      setActionError(err.response?.data?.message || "Une erreur est survenue lors de la fermeture de la période.");
      throw err;
    } finally {
      setActionLoading(false);
    }
  }

  return { ouverte, periode, loading, error, actionLoading, actionError, lancer, fermer, refetch };
}