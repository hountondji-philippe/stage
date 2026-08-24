import { useState } from "react";
import { X } from "lucide-react";

const CATEGORIES_LABELS = {
  depot: "Problème de dépôt",
  compte: "Compte / connexion",
  bug: "Erreur technique",
  administratif: "Question administrative",
  autre: "Autre",
};

export default function RepondreTicketModal({ ticket, onClose, onSubmit }) {
  const [reponse, setReponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!ticket) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onSubmit(ticket.id, reponse);
      setReponse("");
      onClose();
    } catch (err) {
      setError(err.response?.data?.message ?? "Impossible d'envoyer la réponse.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--color-primary)]">Répondre au ticket</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4 rounded-xl bg-gray-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
            {CATEGORIES_LABELS[ticket.categorie] ?? ticket.categorie}
          </p>
          <p className="mb-2 text-sm font-bold text-gray-900">{ticket.sujet}</p>
          <p className="text-sm text-gray-600">{ticket.description}</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Votre réponse</label>
            <textarea
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
              placeholder="Rédigez votre réponse à l'étudiant..."
              required
              maxLength={2000}
              rows={5}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--color-primary)] py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Envoi..." : "Envoyer la réponse et résoudre"}
          </button>
        </form>
      </div>
    </div>
  );
}