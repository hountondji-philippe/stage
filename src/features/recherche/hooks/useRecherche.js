import { useState, useEffect, useCallback } from 'react';
import { searchMemoires, getFilieres } from '../api/rechercheApi';

export function useRecherche() {
  const [memoires, setMemoires] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [meta, setMeta] = useState(null); // current_page, last_page, total, per_page...
  const [activeFilters, setActiveFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // handleSearch est mémorisé pour éviter les boucles infinies
  const handleSearch = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    setActiveFilters(filters); // on garde les filtres utilisés pour la pagination
    try {
      const results = await searchMemoires(filters);
      // Laravel paginate() renvoie { data, links, meta }
      setMemoires(results?.data || []);
      setMeta(results?.meta || null);
    } catch (err) {
      console.error("Erreur de recherche:", err);
      setError(err);
      setMemoires([]); // Vide les résultats en cas d'erreur
      setMeta(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Va à une page donnée en conservant les filtres actifs
  const goToPage = useCallback((page) => {
    handleSearch({ ...activeFilters, page });
  }, [activeFilters, handleSearch]);

  // Initialisation : on charge les filières une seule fois
  useEffect(() => {
    async function init() {
      try {
        const filiereData = await getFilieres();
        setFilieres(Array.isArray(filiereData) ? filiereData : (filiereData?.data || []));

        // Chargement initial des mémoires
        await handleSearch({});
      } catch (err) {
        console.error("Erreur d'initialisation:", err);
        setError(err);
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // volontairement vide : ne doit tourner qu'au montage, pas à chaque nouvelle recherche

  return { memoires, filieres, meta, activeFilters, loading, error, handleSearch, goToPage };
}