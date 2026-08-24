import { useMemo, useState } from "react";

// ⚠️ MOCK TEMPORAIRE — sert uniquement à visualiser l'écran sans backend.
// Ne fait AUCUN appel API. À supprimer et remplacer par
// useEtudiantsAutorises.js dès que le backend Laravel est prêt.

const MOCK_ETUDIANTS = [
  {
    id: 1,
    matricule: "24ENE-001",
    nom: "Kouamé",
    prenom: "Koffi",
    email: "k.kouame@eneam.edu",
    filiere: "eco",
    filiere_nom: "Économie Appliquée",
    promo: "2024",
    compte_active: true,
  },
  {
    id: 2,
    matricule: "24ENE-042",
    nom: "N'Guessan",
    prenom: "Marie",
    email: "m.nguessan@eneam.edu",
    filiere: "gestion",
    filiere_nom: "Gestion de Projets",
    promo: "2024",
    compte_active: false,
  },
  {
    id: 3,
    matricule: "24ENE-115",
    nom: "Diallo",
    prenom: "Amadou",
    email: "a.diallo@eneam.edu",
    filiere: "stat",
    filiere_nom: "Statistiques Industrielles",
    promo: "2024",
    compte_active: true,
  },
];

export function useEtudiantsAutorisesMock() {
  const [etudiants, setEtudiants] = useState(MOCK_ETUDIANTS);
  const [search, setSearch] = useState("");
  const [filiere, setFiliere] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  // Filtrage 100% local, juste pour tester la recherche/le filtre visuellement
  const filtered = useMemo(() => {
    return etudiants.filter((e) => {
      const matchSearch =
        !search ||
        `${e.nom} ${e.prenom} ${e.matricule} ${e.email}`
          .toLowerCase()
          .includes(search.toLowerCase());
      const matchFiliere = !filiere || e.filiere === filiere;
      return matchSearch && matchFiliere;
    });
  }, [etudiants, search, filiere]);

  function toggleSelected(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function toggleSelectAll() {
    setSelectedIds((prev) =>
      prev.length === filtered.length ? [] : filtered.map((e) => e.id)
    );
  }

  function clearSelection() {
    setSelectedIds([]);
  }

  // Simule la suppression/l'ajout localement, sans API
  async function removeOne(id) {
    setEtudiants((prev) => prev.filter((e) => e.id !== id));
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  }

  async function removeSelected() {
    setEtudiants((prev) => prev.filter((e) => !selectedIds.includes(e.id)));
    clearSelection();
  }

  return {
    etudiants: filtered,
    loading: false,
    error: "",
    search,
    setSearch,
    filiere,
    setFiliere,
    selectedIds,
    allSelected: filtered.length > 0 && selectedIds.length === filtered.length,
    toggleSelected,
    toggleSelectAll,
    clearSelection,
    removeOne,
    removeSelected,
    refetch: () => {}, // no-op en mock
  };
}
