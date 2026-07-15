import { Trash2 } from "lucide-react";

export default function BulkActionsBar({ count, onDeleteClick }) {
  if (count === 0) return null;

  return (
    <div className="sticky top-20 z-30 flex items-center justify-between rounded-xl bg-[var(--color-primary)] p-3 text-white shadow-lg">
      <span className="px-2 text-sm font-bold">{count} étudiant(s) sélectionné(s)</span>
      <button
        onClick={onDeleteClick}
        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold transition-colors hover:bg-red-700"
      >
        <Trash2 size={18} />
        Supprimer la sélection
      </button>
    </div>
  );
}
