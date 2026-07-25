import { Pencil, Trash2, CheckCircle2, Circle } from "lucide-react";
import StatusBadge from "../../../components/ui/StatusBadge";

export default function EtudiantsTable({
  etudiants = [],
  selectedIds = [],
  allSelected,
  onToggleSelected,
  onToggleSelectAll,
  onEdit,
  onDeleteOne,
}) {
  if (!Array.isArray(etudiants)) {
    etudiants = [];
  }

  if (etudiants.length === 0) {
    return (
      <div className="hidden rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm md:block">
        <p className="text-sm text-gray-500">
          Aucun étudiant ne correspond à votre recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block">
      <table className="w-full border-collapse text-left">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="w-12 p-4">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleSelectAll}
                className="h-4 w-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
            </th>
            <th className="p-4 text-sm font-bold text-gray-900">Matricule</th>
            <th className="p-4 text-sm font-bold text-gray-900">Nom &amp; Prénom</th>
            <th className="p-4 text-sm font-bold text-gray-900">Email</th>
            <th className="p-4 text-sm font-bold text-gray-900">Filière</th>
            <th className="p-4 text-sm font-bold text-gray-900">Année scolaire</th>
            <th className="p-4 text-sm font-bold text-gray-900">Compte</th>
            <th className="p-4 text-sm font-bold text-gray-900">Année validée</th>
            <th className="p-4 text-right text-sm font-bold text-gray-900">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {etudiants.map((etudiant) => {
            const isSelected = selectedIds.includes(etudiant.id);

            return (
              <tr
                key={etudiant.id}
                className={`transition-colors hover:bg-gray-50 ${
                  isSelected ? "bg-[var(--color-primary)]/5" : ""
                }`}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelected(etudiant.id)}
                    className="h-4 w-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                </td>
                <td className="p-4 text-sm text-gray-600">{etudiant.matricule}</td>
                <td className="p-4 text-sm font-bold text-gray-900">
                  {etudiant.nom} {etudiant.prenom}
                </td>
                <td className="p-4 text-sm text-gray-600">{etudiant.email}</td>
                <td className="p-4 text-sm text-gray-600">{etudiant.filiere?.nom}</td>
                <td className="p-4 text-sm text-gray-600">{etudiant.annee_scolaire}</td>
                <td className="p-4">
                  <StatusBadge status={etudiant.compte_active ? "actif" : "non_active"} />
                </td>
                <td className="p-4">
                  {etudiant.annee_validee ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 size={13} />
                      Validée
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                      <Circle size={13} />
                      Non validée
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1">
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}