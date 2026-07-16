import { useState } from 'react';
import FilterActions from './FilterActions';

const CYCLES = ['Licence', 'Master']; // TODO: confirmer si "Doctorat" existe côté back

export default function AdvancedFilters({ filieres, departements = [], onFilter, onReset }) {
  const [local, setLocal] = useState({ filiere_id: '', departement_id: '', cycle: '', annee: '' });

  const handleChange = (e) => {
    setLocal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleApply = () => {
    onFilter(local);
  };

  const handleReset = () => {
    const cleared = { filiere_id: '', departement_id: '', cycle: '', annee: '' };
    setLocal(cleared);
    onFilter(cleared);
    onReset?.();
  };

  return (
    <div className="space-y-stack-lg">
      {/* 4 colonnes pour les sélecteurs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-stack-md">
        <div className="space-y-1">
          <label className="font-label-sm text-outline">Filière</label>
          <select
            name="filiere_id"
            value={local.filiere_id}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-outline-variant bg-surface-bright text-on-surface font-body-md focus:border-secondary"
          >
            <option value="">Toutes les filières</option>
            {filieres?.map((f) => (
              <option key={f.id} value={f.id}>{f.nom}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="font-label-sm text-outline">Département</label>
          <select
            name="departement_id"
            value={local.departement_id}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-outline-variant bg-surface-bright text-on-surface font-body-md focus:border-secondary"
          >
            <option value="">Tous les départements</option>
            {departements?.map((d) => (
              <option key={d.id} value={d.id}>{d.nom}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="font-label-sm text-outline">Cycle</label>
          <select
            name="cycle"
            value={local.cycle}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-outline-variant bg-surface-bright text-on-surface font-body-md focus:border-secondary"
          >
            <option value="">Tous les cycles</option>
            {CYCLES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="font-label-sm text-outline">Année</label>
          <select
            name="annee"
            value={local.annee}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-outline-variant bg-surface-bright text-on-surface font-body-md focus:border-secondary"
          >
            <option value="">Toutes les années</option>
            {Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <FilterActions onApply={handleApply} onReset={handleReset} />
    </div>
  );
}