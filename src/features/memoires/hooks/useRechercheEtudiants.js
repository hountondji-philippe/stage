import { useCallback, useEffect, useMemo, useState } from "react";
import { getEtudiants } from "../../admin/api/adminService";

/**
 * Recherche + filtres combinés (ET) pour sélectionner l'étudiant auteur
 * d'un dépôt manuel (mode admin).
 *
 * - recherche / filiereId / promo (année scolaire) : envoyés au backend
 *   (paramètres supportés par EtudiantAutoriseController::index)
 * - niveau (cycle) : filtré côté frontend, le backend ne le supporte pas
 */
export function useRechercheEtudiants() {
  const [recherche, setRecherche] = useState("");
  const [filiereId, setFiliereId] = useState("");
  const [cycle, setCycle] = useState(""); // "" | "licence" | "master"
  const [anneeScolaire, setAnneeScolaire] = useState("");

  const [etudiants, setEtudiants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEtudiants = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getEtudiants({ recherche, filiereId, promo: anneeScolaire });
      setEtudiants(data.data ?? data.etudiants ?? data ?? []);
    } catch (err) {
      setError("Impossible de charger la liste des étudiants.");
    } finally {
      setLoading(false);
    }
  }, [recherche, filiereId, anneeScolaire]);

  // Recherche différée (debounce) pour éviter un appel à chaque frappe
  useEffect(() => {
    const timeout = setTimeout(fetchEtudiants, 300);
    return () => clearTimeout(timeout);
  }, [fetchEtudiants]);

  // Filtre cycle (Licence = L1/L2/L3, Master = M1/M2), fait côté frontend
  const resultats = useMemo(() => {
    if (!cycle) return etudiants;
    const prefixe = cycle === "licence" ? "L" : "M";
    return etudiants.filter((e) => e.niveau?.startsWith(prefixe));
  }, [etudiants, cycle]);

  return {
    recherche,
    setRecherche,
    filiereId,
    setFiliereId,
    cycle,
    setCycle,
    anneeScolaire,
    setAnneeScolaire,
    resultats,
    loading,
    error,
  };
}
