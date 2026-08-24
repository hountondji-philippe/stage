import { AlertTriangle, HelpCircle } from "lucide-react";

export default function ConfirmDialog({
  open,
  titre = "Confirmer l'action",
  message,
  labelConfirmer = "Confirmer",
  labelAnnuler = "Annuler",
  onConfirm,
  onCancel,
  danger = true,
}) {
  if (!open) return null;

  const Icon = danger ? AlertTriangle : HelpCircle;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
        <div
          className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ring-8 ${
            danger
              ? "bg-red-50 text-red-600 ring-red-50/60"
              : "bg-[var(--color-bg)] text-[var(--color-primary)] ring-[var(--color-bg)]/60"
          }`}
        >
          <Icon size={28} />
        </div>

        <h3 className="mb-2 text-lg font-bold text-[var(--color-text)]">{titre}</h3>
        <p className="mb-7 text-sm leading-relaxed text-gray-500">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-50"
          >
            {labelAnnuler}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-xl py-2.5 text-sm font-bold text-white shadow-sm transition-colors ${
              danger
                ? "bg-red-600 shadow-red-600/30 hover:bg-red-700"
                : "bg-[var(--color-primary)] shadow-[var(--color-primary)]/30 hover:bg-[var(--color-primary-light)]"
            }`}
          >
            {labelConfirmer}
          </button>
        </div>
      </div>
    </div>
  );
}