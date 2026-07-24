import { useState, useEffect, useCallback } from "react";
import {
  getStatutPeriodeDepot,
  getPeriodesDepot,
  lancerPeriodeDepot,
  fermerPeriodeDepot,
} from "../api/periodeDepotApi";
import { createActualite } from "../api/actualitesApi";

const LABELS_CYCLE = {
  licence: "Licence",
  master: "Master",
  tous: "tous cycles",
};

function formatDateAffichage(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

export function usePeriodeDepotAdmin() {
  // Statut simplifié (2 booléens), pour affichage rapide
  const [statut, setStatut] = useState({ licence_ouverte: false, master_ouverte: false });
  // Liste complète des périodes (id, dates, cycle, est_ouverte...), pour le tableau de gestion admin
  const [periodes, setPeriodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statutData, periodesData] = await Promise.all([
        getStatutPeriodeDepot(),
        getPeriodesDepot(),
      ]);
      setStatut({
        licence_ouverte: Boolean(statutData.licence_ouverte),
        master_ouverte: Boolean(statutData.master_ouverte),
      });
      setPeriodes(periodesData.periodes || []);
    } catch (err) {
      setError("Impossible de charger le statut des périodes de dépôt.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  async function lancer({ date_debut, date_fin, cycle }) {
    setActionLoading(true);
    setActionError(null);
    try {
      await lancerPeriodeDepot({ date_debut, date_fin, cycle });

      // Annonce automatique aux étudiants
      await createActualite({
        titre: "Ouverture de la période de dépôt des mémoires",
        contenu: `La période de dépôt des mémoires (${LABELS_CYCLE[cycle]}) est ouverte du ${formatDateAffichage(date_debut)} au ${formatDateAffichage(date_fin)}. Les étudiants concernés peuvent désormais soumettre leur mémoire pour validation.`,
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

  async function fermer(periodeDepotId) {
    setActionLoading(true);
    setActionError(null);
    try {
      const { periode } = await fermerPeriodeDepot(periodeDepotId);

      await createActualite({
        titre: "Fermeture de la période de dépôt des mémoires",
        contenu: `La période de dépôt des mémoires (${LABELS_CYCLE[periode?.cycle] || ""}) est désormais fermée. Les nouveaux dépôts ne sont plus acceptés jusqu'à la prochaine ouverture.`,
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

  return { statut, periodes, loading, error, actionLoading, actionError, lancer, fermer, refetch };
}