import { useEffect, useState, useCallback } from "react";
import { getFilieres, getSousFilieres, getMemoiresAdmin } from "../api/filieresApi";

const ONGLETS = {
  tous: null,
  en_attente: "en_attente",
  valide: "valide",
  rejete: "rejete",
};

export function useFiliereDetailAdmin(filiereId) {
  const [filiere, setFiliere] = useState(null);
  const [sousFilieres, setSousFilieres] = useState([]);
  const [sousFiliereActive, setSousFiliereActiveState] = useState(null);
  const [onglet, setOngletState] = useState("tous");
  const [memoires, setMemoires] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [loading, setLoading] = useState(true);
  const [loadingMemoires, setLoadingMemoires] = useState(false);
  const [error, setError] = useState(null);

  const chargerInfos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [filieresList, sousFilieresList] = await Promise.all([
        getFilieres(),
        getSousFilieres(filiereId),
      ]);

      const filiereTrouvee = filieresList.find((f) => String(f.id) === String(filiereId));
      if (!filiereTrouvee) {
        setError("Filière introuvable.");
        setFiliere(null);
        return;
      }

      setFiliere(filiereTrouvee);
      setSousFilieres(sousFilieresList);
    } catch (err) {
      setError("Impossible de charger les informations de cette filière.");
    } finally {
      setLoading(false);
    }
  }, [filiereId]);

  const chargerMemoires = useCallback(async () => {
    setLoadingMemoires(true);
    try {
      const params = sousFiliereActive
        ? { sous_filiere_id: sousFiliereActive, page }
        : { filiere_id: filiereId, page };

      const statut = ONGLETS[onglet];
      if (statut) params.statut = statut;

      const resultat = await getMemoiresAdmin(params);
      // Laravel paginate() renvoie { data: [...], current_page, last_page, total, per_page }
      setMemoires(resultat?.data ?? []);
      setTotalPages(resultat?.last_page ?? 1);
      setTotalItems(resultat?.total ?? 0);
      setPageSize(resultat?.per_page ?? 15);
    } catch (err) {
      setMemoires([]);
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setLoadingMemoires(false);
    }
  }, [filiereId, sousFiliereActive, onglet, page]);

  // Reset à la page 1 quand on change de filtre
  function setSousFiliereActive(valeur) {
    setPage(1);
    setSousFiliereActiveState(valeur);
  }

  function setOnglet(valeur) {
    setPage(1);
    setOngletState(valeur);
  }

  useEffect(() => {
    if (filiereId) chargerInfos();
  }, [filiereId, chargerInfos]);

  useEffect(() => {
    if (filiereId) chargerMemoires();
  }, [filiereId, chargerMemoires]);

  return {
    filiere,
    sousFilieres,
    sousFiliereActive,
    setSousFiliereActive,
    onglet,
    setOnglet,
    memoires,
    page,
    setPage,
    totalPages,
    totalItems,
    pageSize,
    loading,
    loadingMemoires,
    error,
    refetchInfos: chargerInfos,
    refetchMemoires: chargerMemoires,
  };
}