import { X } from "lucide-react";

const SIZES = {
  sm: "max-w-sm",
  md: "max-w-xl",
  lg: "max-w-2xl",
};

/**
 * Modal générique réutilisable (overlay + carte centrée).
 *
 * Usage :
 * <Modal open={open} onClose={() => setOpen(false)} title="Ajouter un étudiant" size="md"
 *        footer={<>...boutons...</>}>
 *   ...contenu...
 * </Modal>
 */
export default function Modal({
  open,
  onClose,
  title,
  size = "md",
  footer,
  children,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#1B1B20]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative w-full ${SIZES[size]} max-h-[90vh] flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl`}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <h3 className="text-lg font-bold text-[var(--color-primary)]">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">{children}</div>

        {footer && (
          <div className="flex flex-col justify-end gap-3 bg-gray-50 p-6 sm:flex-row">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
