import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../../../components/ui/StatusBadge";

export default function EtudiantsCardList({ etudiants, onEdit, onDeleteOne }) {
  if (etudiants.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm md:hidden">
        <p className="text-sm text-gray-500">Aucun étudiant ne correspond à votre recherche.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:hidden">
      {etudiants.map((etudiant) => (
        <div
          key={etudiant.id}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="mb-3 flex items-start justify-between">
            <div>
              <p className="font-bold text-gray-900">
                {etudiant.nom} {etudiant.prenom}
              </p>
              <p className="text-xs text-gray-500">
                {etudiant.matricule} • {etudiant.promo}
              </p>
            </div>
            <StatusBadge status={etudiant.compte_active ? "actif" : "non_active"} />
          </div>

          <p className="mb-4 text-sm text-gray-600">{etudiant.filiere?.nom}</p>

          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <span className="text-xs text-gray-500">{etudiant.email}</span>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(etudiant)}
                className="rounded-lg bg-[var(--color-primary)]/10 p-2 text-[var(--color-primary)]"
                aria-label="Modifier"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => onDeleteOne(etudiant)}
                className="rounded-lg bg-red-50 p-2 text-red-600"
                aria-label="Supprimer"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
