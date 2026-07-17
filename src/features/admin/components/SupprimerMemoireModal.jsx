import { AlertTriangle } from "lucide-react";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

export default function SupprimerMemoireModal({ open, onClose, onConfirm, memoire, loading, error }) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertTriangle size={32} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Supprimer définitivement ce mémoire ?</h3>
          <p className="mt-2 text-sm text-gray-600">
            {memoire && (
              <>
                <span className="font-semibold">« {memoire.titre} »</span> et ses fichiers (mémoire +
                preuve de soutenance) seront supprimés définitivement. Cette action est irréversible.
              </>
            )}
          </p>
        </div>
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-left text-sm text-red-700">{error}</div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button
          loading={loading}
          onClick={onConfirm}
          className="!border-none !bg-red-600 !text-white hover:!bg-red-700"
        >
          Supprimer
        </Button>
      </div>
    </Modal>
  );
}
