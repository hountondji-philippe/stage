import { Search } from "lucide-react";

export default function DepotToolbar({
  search,
  onSearchChange,
  filiereId,
  onFiliereChange,
  filieres,
  sort,
  onSortChange,
}) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
      <div className="relative w-full md:w-96">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher par titre ou auteur..."
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
        />
      </div>

      <div className="flex w-full gap-3 md:w-auto">
        <select
          value={filiereId}
          onChange={(e) => onFiliereChange(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-[var(--color-primary)] md:flex-none"
        >
          <option value="">Filière : Toutes</option>
          {filieres.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nom}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-[var(--color-primary)] md:flex-none"
        >
          <option value="ancien">Plus ancien d'abord</option>
          <option value="recent">Plus récent</option>
        </select>
      </div>
    </div>
  );
}
