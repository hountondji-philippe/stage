import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../../../components/ui/StatusBadge";

export default function EtudiantCard({ etudiant, isSelected, onToggleSelected, onEdit, onDeleteOne }) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border-l-4 border-l-[var(--color-primary)] bg-white p-6 shadow-[0_4px_20px_rgba(19,36,107,0.06)] sm:flex-row sm:items-center sm:justify-between ${
        isSelected ? "bg-[var(--color-primary)]/5" : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelected(etudiant.id)}
          className="mt-1.5 h-4 w-4 shrink-0 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
        />

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-3">
            <StatusBadge status={etudiant.compte_active ? "actif" : "non_active"} />
            <span className="text-xs text-gray-400">{etudiant.matricule}</span>
          </div>

          <p className="text-lg font-bold text-[var(--color-primary)]">
            {etudiant.nom} {etudiant.prenom}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>{etudiant.email}</span>
            {etudiant.filiere?.nom && <span>• {etudiant.filiere.nom}</span>}
            {etudiant.annee_scolaire && <span>• {etudiant.annee_scolaire}</span>}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
        <button
          onClick={() => onEdit(etudiant)}
          className="rounded-full p-2 text-gray-500 transition-colors hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
          aria-label="Modifier"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => onDeleteOne(etudiant)}
          className="rounded-full p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
          aria-label="Supprimer"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}