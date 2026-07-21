import { useCallback, useEffect, useMemo, useState } from "react";
import { getEtudiants } from "../../admin/api/adminService";
import { rechercherBinome } from "../api/binomeApi";

/**
 * @param {string} [excludeMatricule]
 * @param {"admin"|"binome"} [source]
 * @param {boolean} [enabled] - si false, aucune requête n'est déclenchée
 * (utile quand le hook est appelé pour respecter les règles des hooks,
 * mais que son résultat ne sera pas utilisé dans ce rendu)
 */
export function useRechercheEtudiants(excludeMatricule = "", source = "admin", enabled = true) {
  const [recherche, setRecherche] = useState("");
  const [filiereId, setFiliereId] = useState("");
  const [cycle, setCycle] = useState("");
  const [anneeScolaire, setAnneeScolaire] = useState("");

  const [etudiants, setEtudiants] = useState([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState("");

  const fetchEtudiants = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError("");
    try {
      const fetcher = source === "binome" ? rechercherBinome : getEtudiants;
      const { data } = await fetcher({
        recherche,
        filiereId,
        promo: anneeScolaire,
        excludeMatricule: excludeMatricule || undefined,
      });
      setEtudiants(data.data ?? data.etudiants ?? data ?? []);
    } catch (err) {
      setError("Impossible de charger la liste des étudiants.");
    } finally {
      setLoading(false);
    }
  }, [recherche, filiereId, anneeScolaire, excludeMatricule, source, enabled]);

  useEffect(() => {
    if (!enabled) return;
    const timeout = setTimeout(fetchEtudiants, 300);
    return () => clearTimeout(timeout);
  }, [fetchEtudiants, enabled]);

  const resultats = useMemo(() => {
    if (!cycle) return etudiants;
    const prefixe = cycle === "licence" ? "L" : "M";
    return etudiants.filter((e) => e.niveau?.startsWith(prefixe));
  }, [etudiants, cycle]);

  return { recherche, setRecherche, filiereId, setFiliereId, cycle, setCycle, anneeScolaire, setAnneeScolaire, resultats, loading, error };
}