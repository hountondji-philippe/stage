import EtudiantCard from "./EtudiantCard";

export default function EtudiantsListe({
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
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
        <p className="text-sm text-gray-500">Aucun étudiant ne correspond à votre recherche.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <label className="flex w-fit items-center gap-2 text-sm text-gray-500">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onToggleSelectAll}
          className="h-4 w-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
        />
        Tout sélectionner
      </label>

      {etudiants.map((etudiant) => (
        <EtudiantCard
          key={etudiant.id}
          etudiant={etudiant}
          isSelected={selectedIds.includes(etudiant.id)}
          onToggleSelected={onToggleSelected}
          onEdit={onEdit}
          onDeleteOne={onDeleteOne}
        />
      ))}
    </div>
  );
}