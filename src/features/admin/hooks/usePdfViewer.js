import { useEffect, useRef, useState } from "react";
import { getMemoireFichierBlob } from "../api/adminService";

export function usePdfViewer(memoireId) {
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const previousUrlRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getMemoireFichierBlob(memoireId, "memoire");
        const url = URL.createObjectURL(response.data);
        if (!cancelled) {
          // Libère l'ancien blob avant d'en créer un nouveau (évite les fuites mémoire)
          if (previousUrlRef.current) URL.revokeObjectURL(previousUrlRef.current);
          previousUrlRef.current = url;
          setBlobUrl(url);
        } else {
          URL.revokeObjectURL(url);
        }
      } catch (err) {
        if (!cancelled) setError("Impossible de charger ce document.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [memoireId]);

  // Nettoyage final au démontage du composant
  useEffect(() => {
    return () => {
      if (previousUrlRef.current) URL.revokeObjectURL(previousUrlRef.current);
    };
  }, []);

  function downloadCurrent() {
    if (!blobUrl) return;
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "memoire.pdf";
    a.click();
  }

  return { blobUrl, loading, error, downloadCurrent };
}