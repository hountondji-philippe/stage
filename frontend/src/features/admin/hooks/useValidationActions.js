import { useState } from "react";
import { validerMemoire, rejeterMemoire } from "../api/adminService";

export function useValidationActions(memoireId, { onValidated, onRejected } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function valider() {
    setLoading(true);
    setError("");
    try {
      await validerMemoire(memoireId);
      onValidated?.();
    } catch (err) {
      setError(
        err.response?.data?.message ?? "Une erreur est survenue lors de la validation."
      );
    } finally {
      setLoading(false);
    }
  }

  async function rejeter(motif) {
    setLoading(true);
    setError("");
    try {
      await rejeterMemoire(memoireId, { motif_rejet: motif });
      onRejected?.();
    } catch (err) {
      if (err.response?.status === 422) {
        setError(
          err.response.data.errors?.motif_rejet?.[0] ?? "Le motif de rejet est requis."
        );
      } else {
        setError(err.response?.data?.message ?? "Une erreur est survenue lors du rejet.");
      }
    } finally {
      setLoading(false);
    }
  }

  return { valider, rejeter, loading, error };
}
