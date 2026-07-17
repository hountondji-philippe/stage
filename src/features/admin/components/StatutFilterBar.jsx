export default function StatutFilterBar({ statut, onStatutChange, total }) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <p className="text-sm text-gray-500">
        <span className="font-bold text-gray-900">{total}</span> mémoire(s) au total
      </p>
      <select
        value={statut}
        onChange={(e) => onStatutChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-[var(--color-primary)] sm:w-auto"
      >
        <option value="">Tous les statuts</option>
        <option value="en_attente">En attente</option>
        <option value="valide">Validés</option>
        <option value="rejete">Rejetés</option>
      </select>
    </div>
  );
}
