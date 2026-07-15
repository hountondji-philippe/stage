import { AlertTriangle } from "lucide-react";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

/**
 * Modale de confirmation réutilisée pour :
 * - la suppression d'un seul étudiant (target = l'étudiant)
 * - la suppression groupée (target = null, count = nb sélectionné)
 */
export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  target,
  count = 0,
  loading = false,
}) {
  const isBulk = !target && count > 0;

  const description = isBulk
    ? `Êtes-vous sûr de vouloir retirer ces ${count} étudiants de la liste ? Cette action est irréversible.`
    : "Êtes-vous sûr de vouloir retirer cet étudiant de la liste ? Cette action est irréversible.";

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertTriangle size={32} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Confirmer la suppression</h3>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
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
