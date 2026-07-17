import { useState, useEffect } from "react";
import FilterActions from "./FilterActions";
import { getSousFilieres } from "../api/sousFilieresApi";

const CYCLES = ["Licence", "Master"];

const INITIAL = { filiere_id: "", sous_filiere_id: "", cycle: "", annee: "" };

export default function AdvancedFilters({ filieres, onFilter, onReset }) {
  const [local, setLocal] = useState(INITIAL);
  const [sousFilieres, setSousFilieres] = useState([]);
  const [loadingSousFilieres, setLoadingSousFilieres] = useState(false);

  // Recharge les sous-filières dès que la filière change
  useEffect(() => {
    if (!local.filiere_id) {
      setSousFilieres([]);
      return;
    }
    let mounted = true;
    setLoadingSousFilieres(true);
    getSousFilieres(local.filiere_id)
      .then((data) => mounted && setSousFilieres(Array.isArray(data) ? data : data?.data || []))
      .catch(() => mounted && setSousFilieres([]))
      .finally(() => mounted && setLoadingSousFilieres(false));
    return () => {
      mounted = false;
    };
  }, [local.filiere_id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setLocal((prev) => {
      // Changer de filière invalide la sous-filière déjà choisie
      if (name === "filiere_id") {
        return { ...prev, filiere_id: value, sous_filiere_id: "" };
      }
      return { ...prev, [name]: value };
    });
  }

  function handleApply() {
    onFilter(local);
  }

  function handleReset() {
    setLocal(INITIAL);
    onFilter(INITIAL);
    onReset?.();
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500">Filière</label>
          <select
            name="filiere_id"
            value={local.filiere_id}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm outline-none focus:border-[var(--color-primary-light)]"
          >
            <option value="">Toutes les filières</option>
            {filieres?.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500">Sous-filière</label>
          <select
            name="sous_filiere_id"
            value={local.sous_filiere_id}
            onChange={handleChange}
            disabled={!local.filiere_id || loadingSousFilieres}
            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm outline-none focus:border-[var(--color-primary-light)] disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">
              {!local.filiere_id
                ? "Choisir une filière d'abord"
                : loadingSousFilieres
                ? "Chargement..."
                : "Toutes les sous-filières"}
            </option>
            {sousFilieres.map((sf) => (
              <option key={sf.id} value={sf.id}>
                {sf.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500">Cycle</label>
          <select
            name="cycle"
            value={local.cycle}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm outline-none focus:border-[var(--color-primary-light)]"
          >
            <option value="">Tous les cycles</option>
            {CYCLES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-500">Année</label>
          <input
            type="text"
            name="annee"
            value={local.annee}
            onChange={handleChange}
            placeholder="ex : 2024"
            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm outline-none focus:border-[var(--color-primary-light)]"
          />
        </div>
      </div>

      <FilterActions onApply={handleApply} onReset={handleReset} />
    </div>
  );
}