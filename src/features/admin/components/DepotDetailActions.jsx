import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import { useValidationActions } from "../hooks/useValidationActions";

export default function DepotDetailActions({ memoireId, onValidated, onRejected }) {
  const [confirmValidateOpen, setConfirmValidateOpen] = useState(false);
  const [showRejectionForm, setShowRejectionForm] = useState(false);
  const [motif, setMotif] = useState("");

  const { valider, rejeter, loading, error } = useValidationActions(memoireId, {
    onValidated,
    onRejected,
  });

  async function handleConfirmValidate() {
    await valider();
    setConfirmValidateOpen(false);
  }

  async function handleConfirmReject() {
    await rejeter(motif);
  }

  return (
    <>
      {/* Zone actions desktop / tablette */}
      <div className="hidden flex-col gap-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 md:flex">
        {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        {!showRejectionForm ? (
          <>
            <button
              onClick={() => setConfirmValidateOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-4 font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <CheckCircle2 size={20} />
              Valider ce dépôt
            </button>
            <button
              onClick={() => setShowRejectionForm(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-red-600 px-6 py-4 font-bold text-red-600 transition-all hover:bg-red-50 active:scale-[0.98]"
            >
              <XCircle size={20} />
              Rejeter ce dépôt
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <label className="text-sm font-semibold text-gray-900">Motif du rejet</label>
            <textarea
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              placeholder="Expliquez pourquoi le dépôt est rejeté..."
              className="min-h-[120px] w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
            />
            <div className="flex gap-3">
              <Button variant="outline" fullWidth onClick={() => setShowRejectionForm(false)}>
                Annuler
              </Button>
              <Button
                loading={loading}
                disabled={!motif.trim()}
                onClick={handleConfirmReject}
                className="flex-[2] !border-none !bg-red-600 !text-white hover:!bg-red-700"
              >
                Confirmer le rejet
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Barre d'actions mobile collée en bas */}
      <div className="fixed bottom-0 left-0 z-40 flex w-full gap-3 border-t border-gray-200 bg-white p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] md:hidden">
        <button
          onClick={() => setConfirmValidateOpen(true)}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-green-700 py-3 text-sm font-bold text-white"
        >
          <CheckCircle2 size={18} />
          Valider
        </button>
        <button
          onClick={() => setShowRejectionForm(true)}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border-2 border-red-600 py-3 text-sm font-bold text-red-600"
        >
          <XCircle size={18} />
          Rejeter
        </button>
      </div>

      {/* Formulaire de rejet en plein écran sur mobile (affiché seulement si ouvert) */}
      {showRejectionForm && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/30 md:hidden">
          <div className="rounded-t-2xl bg-white p-6">
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
            )}
            <label className="text-sm font-semibold text-gray-900">Motif du rejet</label>
            <textarea
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              placeholder="Expliquez pourquoi le dépôt est rejeté..."
              className="mt-2 min-h-[120px] w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
            />
            <div className="mt-4 flex gap-3">
              <Button variant="outline" fullWidth onClick={() => setShowRejectionForm(false)}>
                Annuler
              </Button>
              <Button
                loading={loading}
                disabled={!motif.trim()}
                onClick={handleConfirmReject}
                className="flex-[2] !border-none !bg-red-600 !text-white hover:!bg-red-700"
              >
                Confirmer le rejet
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modale de confirmation de validation */}
      <Modal
        open={confirmValidateOpen}
        onClose={() => setConfirmValidateOpen(false)}
        size="sm"
      >
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-700">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Confirmer la validation ?</h3>
            <p className="mt-2 text-sm text-gray-600">
              Ce mémoire sera immédiatement visible publiquement sur la plateforme MÉMOIRES+.
            </p>
          </div>
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-left text-sm text-red-700">{error}</div>
          )}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => setConfirmValidateOpen(false)}>
            Annuler
          </Button>
          <Button
            loading={loading}
            onClick={handleConfirmValidate}
            className="!border-none !bg-green-700 !text-white hover:!bg-green-800"
          >
            Confirmer
          </Button>
        </div>
      </Modal>
    </>
  );
}
