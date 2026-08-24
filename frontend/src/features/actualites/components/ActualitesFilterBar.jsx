import { Search, Calendar, ArrowUpDown, RotateCcw } from "lucide-react";

export default function ActualitesFilterBar({
  recherche,
  onRechercheChange,
  dateDebut,
  onDateDebutChange,
  dateFin,
  onDateFinChange,
  tri,
  onTriChange,
  onReset,
}) {
  return (
    <div className="mb-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-[0px_4px_20px_rgba(19,36,107,0.05)] sm:p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={recherche}
            onChange={(e) => onRechercheChange(e.target.value)}
            placeholder="Rechercher par titre..."
            className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[var(--color-primary-light)] focus:ring-1 focus:ring-[var(--color-primary-light)]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} className="shrink-0 text-gray-400" />
          <input
            type="date"
            value={dateDebut}
            onChange={(e) => onDateDebutChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-gray-600 outline-none focus:border-[var(--color-primary-light)]"
          />
          <span className="text-gray-300">–</span>
          <input
            type="date"
            value={dateFin}
            onChange={(e) => onDateFinChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm text-gray-600 outline-none focus:border-[var(--color-primary-light)]"
          />
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown size={16} className="shrink-0 text-gray-400" />
          <select
            value={tri}
            onChange={(e) => onTriChange(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-[var(--color-primary-light)]"
          >
            <option value="recent">Plus récent</option>
            <option value="ancien">Plus ancien</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-[var(--color-primary)]"
        >
          <RotateCcw size={14} />
          Réinitialiser
        </button>
      </div>
    </div>
  );
}