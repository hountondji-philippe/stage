import { useEffect } from "react";
import { FileText, Layers } from "lucide-react";
import Button from "../../../../components/ui/Button";
import { useFilieres } from "../../hooks/useFilieres";
import { useSousFilieres } from "../../../admin/hooks/useSousFilieres";

const ANNEE_COURANTE = new Date().getFullYear();
const ANNEES = [ANNEE_COURANTE, ANNEE_COURANTE - 1, ANNEE_COURANTE - 2].map(String);
const CYCLES = [
  { value: "licence", label: "Licence" },
  { value: "master", label: "Master" },
];
const LABELS_CYCLE = { licence: "Licence", master: "Master" };

/**
 * @param {string|null} [cycleImpose] - si fourni (mode étudiant), le cycle
 * est déduit automatiquement du niveau et affiché en lecture seule —
 * l'étudiant ne peut pas choisir un cycle différent du sien.
 * En mode admin (cycleImpose absent/null), le select manuel reste actif.
 */
export default function EtapeInformations({ data, onChange, onNext, onPrev, cycleImpose = null }) {
  const { filieres, loading: loadingFilieres } = useFilieres();
  const { sousFilieres, loading: loadingSousFilieres } = useSousFilieres(data.filiere_id);

  // Impose le cycle déduit dès qu'il est connu (mode étudiant) —
  // synchronise data.cycle sans attendre une action de l'utilisateur.
  useEffect(() => {
    if (cycleImpose && data.cycle !== cycleImpose) {
      onChange({ ...data, cycle: cycleImpose });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycleImpose]);

  function handleField(e) {
    const { name, value } = e.target;

    if (name === "filiere_id") {
      onChange({ ...data, filiere_id: value, sous_filiere_id: "" });
      return;
    }

    onChange({ ...data, [name]: value });
  }

  const resumeLength = data.resume?.length || 0;
  const aDesSousFilieres = sousFilieres.length > 0;

  const canGoNext = Boolean(
    data.titre?.trim() &&
      data.resume?.trim() &&
      data.filiere_id &&
      data.cycle &&
      data.annee &&
      data.encadrant?.trim() &&
      (!aDesSousFilieres || data.sous_filiere_id)
  );

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(19,36,107,0.06)]">
        <div className="flex items-center gap-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] px-5 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
            <FileText size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Informations du mémoire</p>
            <p className="text-xs text-white/70">Titre, résumé et filière du travail</p>
          </div>
        </div>

        <div className="space-y-4 p-5 md:p-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text)]">Titre du mémoire</label>
            <input
              type="text"
              name="titre"
              value={data.titre || ""}
              onChange={handleField}
              placeholder="Entrez le titre complet..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-[var(--color-primary-light)] focus:ring-2 focus:ring-[var(--color-primary-light)]/40"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[var(--color-text)]">Résumé</label>
              <span className="text-xs text-gray-400">{resumeLength} / 1000 caractères</span>
            </div>
            <textarea
              name="resume"
              value={data.resume || ""}
              onChange={handleField}
              maxLength={1000}
              rows={6}
              placeholder="Décrivez brièvement votre travail..."
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-[var(--color-primary-light)] focus:ring-2 focus:ring-[var(--color-primary-light)]/40"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text)]">Filière</label>
              <select
                name="filiere_id"
                value={data.filiere_id || ""}
                onChange={handleField}
                disabled={loadingFilieres}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[var(--color-primary-light)] focus:ring-2 focus:ring-[var(--color-primary-light)]/40"
              >
                <option value="" disabled>
                  {loadingFilieres ? "Chargement..." : "Choisir une filière"}
                </option>
                {filieres.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nom}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text)]">Cycle</label>
              {cycleImpose ? (
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
                  <Layers size={16} className="text-[var(--color-primary)]" />
                  {LABELS_CYCLE[cycleImpose] || cycleImpose}
                  <span className="ml-auto text-xs italic text-gray-400">Selon votre niveau</span>
                </div>
              ) : (
                <select
                  name="cycle"
                  value={data.cycle || ""}
                  onChange={handleField}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[var(--color-primary-light)] focus:ring-2 focus:ring-[var(--color-primary-light)]/40"
                >
                  <option value="" disabled>
                    Choisir un cycle
                  </option>
                  {CYCLES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text)]">Année académique</label>
              <select
                name="annee"
                value={data.annee || ANNEES[0]}
                onChange={handleField}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[var(--color-primary-light)] focus:ring-2 focus:ring-[var(--color-primary-light)]/40"
              >
                {ANNEES.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {data.filiere_id && aDesSousFilieres && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text)]">Sous-filière</label>
              <select
                name="sous_filiere_id"
                value={data.sous_filiere_id || ""}
                onChange={handleField}
                disabled={loadingSousFilieres}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[var(--color-primary-light)] focus:ring-2 focus:ring-[var(--color-primary-light)]/40"
              >
                <option value="" disabled>
                  {loadingSousFilieres ? "Chargement..." : "Choisir une sous-filière"}
                </option>
                {sousFilieres.map((sf) => (
                  <option key={sf.id} value={sf.id}>
                    {sf.nom}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--color-text)]">
              Maître de mémoire (Encadreur)
            </label>
            <input
              type="text"
              name="encadrant"
              value={data.encadrant || ""}
              onChange={handleField}
              placeholder="Prénom et NOM de l'encadreur"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all focus:border-[var(--color-primary-light)] focus:ring-2 focus:ring-[var(--color-primary-light)]/40"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        {onPrev ? (
          <Button variant="outline" onClick={onPrev}>
            Précédent
          </Button>
        ) : (
          <span />
        )}
        <Button variant="primary" disabled={!canGoNext} onClick={onNext}>
          Suivant
        </Button>
      </div>
    </div>
  );
}