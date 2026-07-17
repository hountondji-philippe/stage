import { useEtudiantsOptions } from "../../hooks/useEtudiantsOptions";

export default function SelectionAuteur({ value, onChange, error }) {
  const { etudiants, loading } = useEtudiantsOptions();

  return (
    <div className="mb-6 rounded-xl border border-dashed border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 p-4">
      <label className="mb-1.5 block text-sm font-medium text-gray-900">
        Étudiant auteur du mémoire
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">
          {loading ? "Chargement..." : "Sélectionnez l'étudiant auteur"}
        </option>
        {etudiants.map((e) => (
          <option key={e.id} value={e.id}>
            {e.nom} {e.prenom} — {e.matricule}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      <p className="mt-2 text-xs text-gray-500">
        Ce dépôt sera enregistré comme s'il avait été déposé par l'étudiant sélectionné.
      </p>
    </div>
  );
}
