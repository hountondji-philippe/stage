import { Search, CheckCircle2, GraduationCap, Layers, CalendarDays, UserRound } from "lucide-react";
import Button from "../../../../components/ui/Button";
import { useFilieres } from "../../hooks/useFilieres";
import { useRechercheEtudiants } from "../../hooks/useRechercheEtudiants";

export default function SelectionAuteur({ value, onChange, error, onNext }) {
  const { filieres } = useFilieres();
  const {
    recherche,
    setRecherche,
    filiereId,
    setFiliereId,
    cycle,
    setCycle,
    anneeScolaire,
    setAnneeScolaire,
    resultats,
    loading,
  } = useRechercheEtudiants();

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(19,36,107,0.06)]">
        {/* En-tête coloré */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] px-5 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
            <UserRound size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Étudiant auteur du mémoire</p>
            <p className="text-xs text-white/70">Ce dépôt sera enregistré en son nom</p>
          </div>
        </div>

        <div className="space-y-4 p-5">
          {/* Barre de recherche */}
          <div className="relative">
            <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary)]/50" />
            <input
              type="text"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Rechercher par nom, prénom ou matricule..."
              className="w-full rounded-xl border border-[var(--color-primary)]/15 bg-[var(--color-primary)]/[0.03] py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/10"
            />
          </div>

          {/* Filtres combinés */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="relative">
              <GraduationCap size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)]/50" />
              <select
                value={filiereId}
                onChange={(e) => setFiliereId(e.target.value)}
                className="w-full appearance-none rounded-lg border border-[var(--color-primary)]/15 bg-[var(--color-primary)]/[0.03] py-2.5 pl-9 pr-3 text-sm font-medium text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-primary)] focus:bg-white"
              >
                <option value="">Toutes les filières</option>
                {filieres.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nom}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Layers size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)]/50" />
              <select
                value={cycle}
                onChange={(e) => setCycle(e.target.value)}
                className="w-full appearance-none rounded-lg border border-[var(--color-primary)]/15 bg-[var(--color-primary)]/[0.03] py-2.5 pl-9 pr-3 text-sm font-medium text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-primary)] focus:bg-white"
              >
                <option value="">Tous les cycles</option>
                <option value="licence">Licence</option>
                <option value="master">Master</option>
              </select>
            </div>

            <div className="relative">
              <CalendarDays size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)]/50" />
              <input
                type="text"
                value={anneeScolaire}
                onChange={(e) => setAnneeScolaire(e.target.value)}
                placeholder="Année (2026-2027)"
                className="w-full rounded-lg border border-[var(--color-primary)]/15 bg-[var(--color-primary)]/[0.03] py-2.5 pl-9 pr-3 text-sm font-medium text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-primary)] focus:bg-white"
              />
            </div>
          </div>

          {/* Résultats */}
          <div className="max-h-64 overflow-y-auto rounded-xl border border-gray-100">
            {loading ? (
              <p className="p-6 text-center text-sm text-gray-400">Recherche en cours...</p>
            ) : resultats.length === 0 ? (
              <p className="p-6 text-center text-sm text-gray-400">Aucun étudiant ne correspond à ces critères.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {resultats.map((e) => {
                  const selectionne = String(value) === String(e.id);
                  return (
                    <li key={e.id}>
                      <button
                        type="button"
                        onClick={() => onChange(String(e.id))}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                          selectionne ? "bg-[var(--color-primary)]/[0.06]" : "hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            selectionne
                              ? "bg-[var(--color-primary)] text-white"
                              : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                          }`}
                        >
                          {e.prenom?.charAt(0)}
                          {e.nom?.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {e.nom} {e.prenom}
                          </p>
                          <p className="truncate text-xs text-gray-500">
                            {e.matricule} • {e.filiere?.nom} • {e.niveau}
                          </p>
                        </div>
                        {selectionne && <CheckCircle2 size={20} className="shrink-0 text-[var(--color-primary)]" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {error && <p className="text-xs font-medium text-red-600">{error}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" disabled={!value} onClick={onNext}>
          Suivant
        </Button>
      </div>
    </div>
  );
}