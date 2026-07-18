import Button from "../../../components/ui/Button";

export default function ConfirmSuppressionActualiteModal({ open, actualite, loading, error, onClose, onConfirm }) {
  if (!open || !actualite) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="mb-2 text-lg font-bold text-[var(--color-text)]">Supprimer l'actualité</h3>
        <p className="mb-4 text-sm text-gray-500">
          Voulez-vous vraiment supprimer « <span className="font-semibold">{actualite.titre}</span> » ?
          Cette action est irréversible.
        </p>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <Button variant="outline" fullWidth onClick={onClose} disabled={loading}>
            Annuler
          </Button>
          <Button variant="danger" fullWidth loading={loading} onClick={onConfirm}>
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
}