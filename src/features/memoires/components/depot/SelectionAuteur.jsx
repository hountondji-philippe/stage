import { useMemo } from "react";
import { Search, CheckCircle2, GraduationCap, Layers, CalendarDays, UserRound, User, Users } from "lucide-react";
import Button from "../../../../components/ui/Button";
import { useFilieres } from "../../hooks/useFilieres";
import { useRechercheEtudiants } from "../../hooks/useRechercheEtudiants";

/**
 * Étape 1 du dépôt : choix seul/binôme + sélection du ou des étudiants.
 *
 * @param {"admin"|"etudiant"} mode
 * @param {"seul"|"binome"} modeDepot
 * @param {(v: "seul"|"binome") => void} onModeDepotChange
 * @param {string} auteurId - id de l'auteur principal (mode admin uniquement)
 * @param {(id: string) => void} onAuteurChange
 * @param {string} matriculeBinome - matricule du binôme (les deux modes, si modeDepot === "binome")
 * @param {(matricule: string, etudiant: object) => void} onMatriculeBinomeChange
 * @param {string} [currentUserMatricule] - matricule de l'étudiant connecté (mode étudiant, pour s'auto-exclure)
 * @param {string} error
 * @param {() => void} onNext
 */
export default function SelectionAuteur({
  mode = "admin",
  modeDepot,
  onModeDepotChange,
  auteurId,
  onAuteurChange,
  matriculeBinome,
  onMatriculeBinomeChange,
  currentUserMatricule,
  error,
  onNext,
}) {
  const isAdmin = mode === "admin";

const rechercheAuteur = useRechercheEtudiants("", "admin", isAdmin);
const rechercheBinome = useRechercheEtudiants(currentUserMatricule, "binome");
const resultatsBinome = rechercheBinome.resultats;
  function handleChangeModeDepot(next) {
    onModeDepotChange(next);
    if (next === "seul") {
      onMatriculeBinomeChange("", null);
    }
  }

  const peutContinuer = isAdmin
    ? modeDepot === "binome"
      ? Boolean(auteurId) && Boolean(matriculeBinome)
      : Boolean(auteurId)
    : modeDepot === "binome"
    ? Boolean(matriculeBinome)
    : true;

  return (
    <div className="space-y-4">
      {/* Choix seul / binôme */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleChangeModeDepot("seul")}
          className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
            modeDepot === "seul"
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/[0.06]"
              : "border-gray-100 bg-white hover:bg-gray-50"
          }`}
        >
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              modeDepot === "seul" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
            }`}
          >
            <User size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Dépôt seul</p>
            <p className="text-xs text-gray-500">Un seul auteur pour ce mémoire</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleChangeModeDepot("binome")}
          className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
            modeDepot === "binome"
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/[0.06]"
              : "border-gray-100 bg-white hover:bg-gray-50"
          }`}
        >
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              modeDepot === "binome" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
            }`}
          >
            <Users size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Dépôt en binôme</p>
            <p className="text-xs text-gray-500">Deux auteurs pour ce mémoire</p>
          </div>
        </button>
      </div>

      {/* Bloc auteur principal — admin uniquement */}
      {isAdmin && (
        <BlocRecherche
          titre="Étudiant auteur du mémoire"
          sousTitre="Ce dépôt sera enregistré en son nom"
          recherche={rechercheAuteur}
          resultats={rechercheAuteur.resultats}
          selectedValue={auteurId}
          getValue={(e) => String(e.id)}
          onSelect={(e) => onAuteurChange(String(e.id))}
        />
      )}

      {/* Bloc binôme — admin (si binôme) ou étudiant (si binôme) */}
      {modeDepot === "binome" && (
        <BlocRecherche
          titre={isAdmin ? "Second auteur (binôme)" : "Votre binôme"}
          sousTitre={isAdmin ? "Le mémoire sera aussi enregistré à son nom" : "Recherchez-le par nom, prénom ou matricule"}
          recherche={rechercheBinome}
          resultats={resultatsBinome}
          selectedValue={matriculeBinome}
          getValue={(e) => e.matricule}
          onSelect={(e) => onMatriculeBinomeChange(e.matricule, e)}
        />
      )}

      {isAdmin && modeDepot === "binome" && auteurId && matriculeBinome && (
        <MessageSiMemePersonne
          resultats={rechercheAuteur.resultats}
          auteurId={auteurId}
          matriculeBinome={matriculeBinome}
        />
      )}

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      <div className="flex justify-end">
        <Button variant="primary" disabled={!peutContinuer} onClick={onNext}>
          Suivant
        </Button>
      </div>
    </div>
  );
}

function MessageSiMemePersonne({ resultats, auteurId, matriculeBinome }) {
  const auteur = resultats.find((e) => String(e.id) === String(auteurId));
  if (!auteur || auteur.matricule !== matriculeBinome) return null;
  return <p className="text-xs font-medium text-red-600">L'auteur principal et le binôme ne peuvent pas être la même personne.</p>;
}

function BlocRecherche({ titre, sousTitre, recherche, resultats, selectedValue, getValue, onSelect }) {
  const { filieres } = useFilieres();
  const { recherche: terme, setRecherche, filiereId, setFiliereId, cycle, setCycle, anneeScolaire, setAnneeScolaire, loading } = recherche;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(19,36,107,0.06)]">
      <div className="flex items-center gap-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] px-5 py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
          <UserRound size={18} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">{titre}</p>
          <p className="text-xs text-white/70">{sousTitre}</p>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="relative">
          <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-primary)]/50" />
          <input
            type="text"
            value={terme}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher par nom, prénom ou matricule..."
            className="w-full rounded-xl border border-[var(--color-primary)]/15 bg-[var(--color-primary)]/[0.03] py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-[var(--color-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/10"
          />
        </div>

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

        <div className="max-h-64 overflow-y-auto rounded-xl border border-gray-100">
          {loading ? (
            <p className="p-6 text-center text-sm text-gray-400">Recherche en cours...</p>
          ) : resultats.length === 0 ? (
            <p className="p-6 text-center text-sm text-gray-400">Aucun étudiant ne correspond à ces critères.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {resultats.map((e) => {
                const selectionne = String(selectedValue) === String(getValue(e));
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(e)}
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
      </div>
    </div>
  );
}