import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getEtudiants,
  deleteEtudiant,
  deleteEtudiants,
} from "../api/etudiantsAutorisesApi";

export function useEtudiantsAutorises() {
  const [etudiants, setEtudiants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filiere, setFiliere] = useState("");
  const [statutFiltre, setStatutFiltre] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchEtudiants = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getEtudiants({
        recherche: search,
        filiereId: filiere,
        compteActive: statutFiltre,
        anneeValidee: "1",
      });
      setEtudiants(response.data ?? response);
    } catch (err) {
      setError("Impossible de charger la liste des étudiants.");
    } finally {
      setLoading(false);
    }
  }, [search, filiere, statutFiltre]);

  useEffect(() => {
    const timeout = setTimeout(fetchEtudiants, 300);
    return () => clearTimeout(timeout);
  }, [fetchEtudiants]);

  function toggleSelected(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function toggleSelectAll() {
    setSelectedIds((prev) =>
      prev.length === etudiants.length ? [] : etudiants.map((e) => e.id)
    );
  }

  function clearSelection() {
    setSelectedIds([]);
  }

  async function removeOne(id) {
    await deleteEtudiant(id);
    setSelectedIds((prev) => prev.filter((x) => x !== id));
    await fetchEtudiants();
  }

  async function removeSelected() {
    const { succeeded, failed } = await deleteEtudiants(selectedIds);
    setSelectedIds((prev) => prev.filter((id) => !succeeded.includes(id)));
    await fetchEtudiants();
    return { succeeded, failed };
  }

  const allSelected = useMemo(
    () => etudiants.length > 0 && selectedIds.length === etudiants.length,
    [etudiants, selectedIds]
  );

  return {
    etudiants,
    loading,
    error,
    search,
    setSearch,
    filiere,
    setFiliere,
    statutFiltre,
    setStatutFiltre,
    selectedIds,
    allSelected,
    toggleSelected,
    toggleSelectAll,
    clearSelection,
    removeOne,
    removeSelected,
    refetch: fetchEtudiants,
  };
}