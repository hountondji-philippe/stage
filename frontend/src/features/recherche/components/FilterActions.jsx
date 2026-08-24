import { CheckCircle2, RotateCcw } from "lucide-react";

export default function FilterActions({ onApply, onReset }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <button
        type="button"
        onClick={onApply}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--color-status-valide)] py-3 font-bold text-white transition-opacity hover:opacity-90"
      >
        <CheckCircle2 size={20} />
        <span>Appliquer les filtres</span>
      </button>
      <button
        type="button"
        onClick={onReset}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-100 py-3 font-bold text-gray-600 transition-colors hover:bg-gray-200"
      >
        <RotateCcw size={20} />
        <span>Réinitialiser</span>
      </button>
    </div>
  );
}