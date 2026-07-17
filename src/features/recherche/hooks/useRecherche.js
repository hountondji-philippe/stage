import { useState, useEffect, useCallback } from 'react';
import { searchMemoires, getFilieres } from '../api/rechercheApi';

export function useRecherche() {
  const [memoires, setMemoires] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [meta, setMeta] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    setActiveFilters(filters);
    try {
      const results = await searchMemoires(filters);
      const { data, ...paginationMeta } = results || {};
      setMemoires(data || []);
      setMeta(data ? paginationMeta : null);
    } catch (err) {
      console.error("Erreur de recherche:", err);
      setError(err);
      setMemoires([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const goToPage = useCallback((page) => {
    handleSearch({ ...activeFilters, page });
  }, [activeFilters, handleSearch]);

  const changeSort = useCallback((tri) => {
    handleSearch({ ...activeFilters, tri, page: 1 });
  }, [activeFilters, handleSearch]);

  useEffect(() => {
    async function init() {
      try {
        const filiereData = await getFilieres();
        setFilieres(filiereData);
        await handleSearch({});
      } catch (err) {
        console.error("Erreur d'initialisation:", err);
        setError(err);
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { memoires, filieres, meta, activeFilters, loading, error, handleSearch, goToPage, changeSort };
}