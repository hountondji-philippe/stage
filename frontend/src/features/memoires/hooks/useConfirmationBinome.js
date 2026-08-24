import { useEffect, useState, useCallback } from "react";
import {
  getConfirmationBinome,
  getFichierConfirmationBlob,
  confirmerBinomeRequest,
  refuserBinomeRequest,
} from "../api/memoiresApi";

export function useConfirmationBinome(token) {
  const [memoire, setMemoire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [traite, setTraite] = useState(null); // null | "confirme" | "refuse"

  const fetchMemoire = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getConfirmationBinome(token);
      setMemoire(data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Cette demande de confirmation est introuvable ou a expiré."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchMemoire();
  }, [fetchMemoire]);

  async function confirmer() {
    setActionLoading(true);
    setActionError("");
    try {
      await confirmerBinomeRequest(token);
      setTraite("confirme");
    } catch (err) {
      setActionError(err.response?.data?.message || "Une erreur est survenue lors de la confirmation.");
    } finally {
      setActionLoading(false);
    }
  }

  async function refuser() {
    setActionLoading(true);
    setActionError("");
    try {
      await refuserBinomeRequest(token);
      setTraite("refuse");
    } catch (err) {
      setActionError(err.response?.data?.message || "Une erreur est survenue lors du refus.");
    } finally {
      setActionLoading(false);
    }
  }

  return {
    memoire,
    loading,
    error,
    actionLoading,
    actionError,
    traite,
    confirmer,
    refuser,
    getFichierBlobUrl: (type) => getFichierConfirmationBlob(token, type),
  };
}