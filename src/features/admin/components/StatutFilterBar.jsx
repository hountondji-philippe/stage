const TABS = [
  { key: "", label: "Tout" },
  { key: "en_attente", label: "En attente" },
  { key: "valide", label: "Validés" },
  { key: "rejete", label: "Rejetés" },
];

export default function StatutFilterBar({ statut, onStatutChange, total }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-500">
        <span className="font-bold text-gray-900">{total}</span> mémoire(s) au total
      </p>

      <div className="flex gap-2 border-b border-gray-200 sm:border-b-0">
        {TABS.map((tab) => {
          const actif = statut === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onStatutChange(tab.key)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                actif ? "text-[var(--color-primary)]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
              {actif && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[var(--color-primary)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}