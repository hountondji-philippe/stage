import { AlertTriangle } from "lucide-react";

export default function LogoutConfirmModal({
  onCancel,
  onConfirm,
  message = "Tu devras te reconnecter pour accéder à ton espace.",
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/60">
          <AlertTriangle size={28} className="text-red-600" />
        </div>

        <h3 className="mb-2 text-lg font-bold text-[var(--color-text)]">
          Confirmer la déconnexion
        </h3>
        <p className="mb-7 text-sm leading-relaxed text-gray-500">
          Es-tu sûr de vouloir te déconnecter ? {message}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white shadow-sm shadow-red-600/30 transition-colors hover:bg-red-700"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}