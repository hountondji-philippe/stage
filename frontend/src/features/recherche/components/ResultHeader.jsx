export default function ResultHeader({ count, sort, onSortChange }) {
  return (
    <div className="mb-6 flex flex-col items-end justify-between gap-4 md:flex-row md:items-center">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">Résultats de recherche</h2>
        <p className="text-sm text-gray-400">
          {count > 0
            ? `${count} ${count > 1 ? "mémoires trouvés" : "mémoire trouvé"}`
            : "Aucun résultat pour votre recherche"}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Trier par :</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="cursor-pointer border-none bg-transparent text-sm font-bold text-[var(--color-primary-light)] outline-none focus:ring-0"
        >
          <option value="recent">Plus récent</option>
          <option value="ancien">Plus ancien</option>
<option value="titre">Ordre alphabétique</option>        </select>
      </div>
    </div>
  );
}