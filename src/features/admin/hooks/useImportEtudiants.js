import { useState } from "react";
import { importEtudiants } from "../api/etudiantsAutorisesApi";

const ACCEPTED_EXTENSIONS = [".xlsx", ".csv"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 Mo

export function useImportEtudiants({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function selectFile(candidate) {
    setError("");
    if (!candidate) return;

    const isAcceptedType = ACCEPTED_EXTENSIONS.some((ext) =>
      candidate.name.toLowerCase().endsWith(ext)
    );
    if (!isAcceptedType) {
      setError("Format non pris en charge. Utilisez un fichier .xlsx ou .csv.");
      return;
    }
    if (candidate.size > MAX_SIZE_BYTES) {
      setError("Le fichier dépasse la taille maximale de 5 Mo.");
      return;
    }
    setFile(candidate);
  }

  function reset() {
    setFile(null);
    setError("");
  }

  async function submit() {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      await importEtudiants(file);
      onSuccess?.();
      reset();
    } catch (err) {
      setError(
        err.response?.data?.message ??
          "Échec de l'import. Vérifiez le format du fichier."
      );
    } finally {
      setLoading(false);
    }
  }

  return { file, selectFile, reset, submit, error, loading };
}
