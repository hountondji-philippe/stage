export default function FilterActions({ onApply, onReset }) {
  return (
    <div className="flex flex-col sm:flex-row gap-stack-md">
      <button
        type="button"
        onClick={onApply}
        className="flex-1 flex items-center justify-center gap-2 py-3 bg-status-valide text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
      >
        <span className="material-symbols-outlined">check_circle</span>
        <span>Appliquer les filtres</span>
      </button>
      <button
        type="button"
        onClick={onReset}
        className="flex-1 flex items-center justify-center gap-2 py-3 bg-surface-container text-on-surface-variant rounded-lg font-bold hover:bg-outline-variant/20 transition-colors"
      >
        <span className="material-symbols-outlined">restart_alt</span>
        <span>Réinitialiser</span>
      </button>
    </div>
  );
}