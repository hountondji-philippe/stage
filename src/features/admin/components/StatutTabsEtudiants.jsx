const TABS = [
  { key: "", label: "Tout" },
  { key: "1", label: "Actifs" },
  { key: "0", label: "Non actifs" },
];

export default function StatutTabsEtudiants({ statut, onStatutChange }) {
  return (
    <div className="flex gap-2 border-b border-gray-200">
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
  );
}