import { useEffect, useRef, useState } from "react";
import { rechercherGlobal } from "../api/rechercheGlobaleApi";

export function useRechercheGlobale() {
  const [terme, setTerme] = useState("");
  const [resultats, setResultats] = useState({ memoires: [], etudiants: [], filieres: [] });
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    if (terme.trim().length < 2) {
      setResultats({ memoires: [], etudiants: [], filieres: [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        const { data } = await rechercherGlobal(terme.trim());
        setResultats(data);
      } catch {
        setResultats({ memoires: [], etudiants: [], filieres: [] });
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [terme]);

  function reset() {
    setTerme("");
    setResultats({ memoires: [], etudiants: [], filieres: [] });
  }

  return { terme, setTerme, resultats, loading, reset };
}