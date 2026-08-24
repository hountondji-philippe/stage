import { useCallback, useEffect, useState } from "react";
import { rechercherGlobal } from "../api/rechercheGlobaleApi";

const VIDE = { memoires: [], filieres: [], sous_filieres: [] };

export function useRechercheGlobale() {
  const [terme, setTerme] = useState("");
  const [resultats, setResultats] = useState(VIDE);
  const [loading, setLoading] = useState(false);
  const [ouvert, setOuvert] = useState(false);

  const rechercher = useCallback(async (valeur) => {
    if (valeur.trim().length < 2) {
      setResultats(VIDE);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data } = await rechercherGlobal(valeur);
      setResultats({
        memoires: data.memoires ?? [],
        filieres: data.filieres ?? [],
        sous_filieres: data.sous_filieres ?? [],
      });
    } catch {
      setResultats(VIDE);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => rechercher(terme), 300);
    return () => clearTimeout(timeout);
  }, [terme, rechercher]);

  const aDesResultats =
    resultats.memoires.length > 0 || resultats.filieres.length > 0 || resultats.sous_filieres.length > 0;

  return { terme, setTerme, resultats, loading, ouvert, setOuvert, aDesResultats };
}