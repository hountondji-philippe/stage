import { FileText, Pencil, ClipboardCheck, User, Users } from "lucide-react";
import Button from "../../../../components/ui/Button";

export default function EtapeRecapitulatif({
  data,
  files,
  filiereNom,
  modeDepot,
  etudiantBinome,
  certifie,
  onCertifieChange,
  onEditStep,
  onPrev,
  onSubmit,
  submitting,
  submitError,
}) {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(19,36,107,0.06)]">
        <div className="flex items-center gap-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] px-5 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
            <ClipboardCheck size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Récapitulatif</p>
            <p className="text-xs text-white/70">Vérifiez les informations avant l'envoi final</p>
          </div>
        </div>

        <div className="space-y-8 p-5 md:p-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                Auteur(s)
              </h3>
              <button
                type="button"
                onClick={() => onEditStep(1)}
                className="flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline"
              >
                <Pencil size={14} /> Modifier
              </button>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-[var(--color-bg)] p-3">
              {modeDepot === "binome" ? <Users size={18} className="shrink-0 text-[var(--color-primary)]" /> : <User size={18} className="shrink-0 text-[var(--color-primary)]" />}
              <span className="text-sm font-medium text-[var(--color-text)]">
                {modeDepot === "binome"
                  ? etudiantBinome
                    ? `Dépôt en binôme avec ${etudiantBinome.prenom} ${etudiantBinome.nom}`
                    : "Dépôt en binôme"
                  : "Dépôt seul"}
              </span>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                Informations générales
              </h3>
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline"
              >
                <Pencil size={14} /> Modifier
              </button>
            </div>
            <div className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Titre</p>
                <p className="text-sm font-medium text-[var(--color-text)]">{data.titre}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Filière &amp; Année
                </p>
                <p className="text-sm font-medium text-[var(--color-text)]">
                  {filiereNom} ({data.annee})
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Encadreur</p>
                <p className="text-sm font-medium text-[var(--color-text)]">{data.encadrant}</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                Pièce jointe
              </h3>
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline"
              >
                <Pencil size={14} /> Modifier
              </button>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-[var(--color-bg)] p-3">
              <FileText size={18} className="shrink-0 text-red-600" />
              <span className="truncate text-sm">{files.memoire?.name}</span>
            </div>
          </section>

          <div className="flex gap-4 rounded-lg bg-[var(--color-primary)]/5 p-4">
            <input
              id="certify"
              type="checkbox"
              checked={certifie}
              onChange={(e) => onCertifieChange(e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            />
            <label htmlFor="certify" className="text-sm text-gray-600">
              Je certifie sur l'honneur que ce mémoire est le fruit de mes travaux originaux et qu'il
              est conforme à la version validée par mon maître de mémoire après soutenance.
            </label>
          </div>

          {submitError && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{submitError}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <Button variant="outline" onClick={onPrev}>
          Précédent
        </Button>
        <Button
          variant="accent"
          fullWidth
          className="md:max-w-[300px]"
          disabled={!certifie || submitting}
          loading={submitting}
          onClick={onSubmit}
        >
          {submitting ? "Envoi en cours..." : "Confirmer le dépôt"}
        </Button>
      </div>
    </div>
  );
}