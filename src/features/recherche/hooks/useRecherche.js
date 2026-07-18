import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMemoires, getFilieres } from '../api/rechercheApi';

export function useRecherche() {
  const [searchParams] = useSearchParams();
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

        // Filtres initiaux construits depuis l'URL (?filiere_id=X&sous_filiere_id=Y...)
        const filtresDepuisUrl = {};
        const filiereId = searchParams.get("filiere_id");
        const sousFiliereId = searchParams.get("sous_filiere_id");
        const recherche = searchParams.get("recherche");
        const annee = searchParams.get("annee");

        if (filiereId) filtresDepuisUrl.filiere_id = filiereId;
        if (sousFiliereId) filtresDepuisUrl.sous_filiere_id = sousFiliereId;
        if (recherche) filtresDepuisUrl.recherche = recherche;
        if (annee) filtresDepuisUrl.annee = annee;

        await handleSearch(filtresDepuisUrl);
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