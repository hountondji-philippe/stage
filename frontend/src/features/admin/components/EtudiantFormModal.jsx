import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useFilieres } from "../hooks/useFilieres";
import { useEtudiantForm } from "../hooks/useEtudiantForm";

const NIVEAUX = ["L1", "L2", "L3", "M1", "M2"];

export default function EtudiantFormModal({ open, onClose, etudiant, onSaved }) {
  const { filieres } = useFilieres();

  const {
    form,
    updateField,
    errors,
    serverError,
    loading,
    isEditing,
    submit,
  } = useEtudiantForm({
    etudiant,
    onSuccess: () => {
      onSaved?.();
      onClose();
    },
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? "Modifier l'étudiant" : "Ajouter un étudiant"}
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>

          <Button variant="primary" loading={loading} onClick={submit}>
            {isEditing ? "Enregistrer" : "Ajouter l'étudiant"}
          </Button>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        {serverError && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Matricule"
            name="matricule"
            value={form.matricule}
            onChange={(e) => updateField("matricule", e.target.value)}
            placeholder="Ex: 24ENE-001"
            error={errors.matricule}
            required
          />

          <Input
            label="Année scolaire"
            name="annee_scolaire"
            value={form.annee_scolaire}
            onChange={(e) =>
              updateField("annee_scolaire", e.target.value)
            }
            placeholder="Ex: 2025-2026"
            error={errors.annee_scolaire}
            required
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="niveau"
            className="mb-1.5 block text-sm font-medium text-gray-900"
          >
            Niveau
          </label>

          <select
            id="niveau"
            value={form.niveau}
            onChange={(e) => updateField("niveau", e.target.value)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15 ${
              errors.niveau ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Sélectionnez un niveau</option>

            {NIVEAUX.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          {errors.niveau && (
            <p className="mt-1 text-xs text-red-600">{errors.niveau}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Nom"
            name="nom"
            value={form.nom}
            onChange={(e) => updateField("nom", e.target.value)}
            placeholder="Nom de famille"
            error={errors.nom}
            required
          />

          <Input
            label="Prénom"
            name="prenom"
            value={form.prenom}
            onChange={(e) => updateField("prenom", e.target.value)}
            placeholder="Prénom(s)"
            error={errors.prenom}
            required
          />
        </div>

        <Input
          label="Email institutionnel"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="etudiant@eneam.edu"
          error={errors.email}
          required
        />

        <div className="w-full">
          <label
            htmlFor="filiere_id"
            className="mb-1.5 block text-sm font-medium text-gray-900"
          >
            Filière
          </label>

          <select
            id="filiere_id"
            value={form.filiere_id}
            onChange={(e) => updateField("filiere_id", e.target.value)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15 ${
              errors.filiere_id ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Sélectionnez une filière</option>

            {filieres.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nom}
              </option>
            ))}
          </select>

          {errors.filiere_id && (
            <p className="mt-1 text-xs text-red-600">
              {errors.filiere_id}
            </p>
          )}
        </div>
      </form>
    </Modal>
  );
}