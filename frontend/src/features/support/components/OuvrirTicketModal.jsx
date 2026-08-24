import { useState } from "react";
import { X } from "lucide-react";
import { creerTicket } from "../api/ticketsApi";

const CATEGORIES = [
  { value: "depot", label: "Problème de dépôt de mémoire" },
  { value: "compte", label: "Compte / connexion" },
  { value: "bug", label: "Erreur technique (bug)" },
  { value: "administratif", label: "Question administrative" },
  { value: "autre", label: "Autre" },
];

export default function OuvrirTicketModal({ open, onClose, onCreated }) {
  const [sujet, setSujet] = useState("");
  const [categorie, setCategorie] = useState("depot");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  function resetEtFermer() {
    setSujet("");
    setCategorie("depot");
    setDescription("");
    setError("");
    onClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await creerTicket({ sujet, categorie, description });
      onCreated?.();
      resetEtFermer();
    } catch (err) {
      setError(err.response?.data?.message ?? "Impossible d'ouvrir le ticket. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--color-primary)]">Ouvrir un ticket</h2>
          <button onClick={resetEtFermer} className="text-gray-400 hover:text-gray-600" aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Sujet</label>
            <input
              type="text"
              value={sujet}
              onChange={(e) => setSujet(e.target.value)}
              placeholder="Résumez votre problème en quelques mots"
              required
              maxLength={255}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Catégorie</label>
            <select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre problème en détail..."
              required
              maxLength={2000}
              rows={5}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
            />
            <p className="mt-1 text-right text-xs text-gray-400">{description.length}/2000</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--color-primary)] py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Envoi..." : "Envoyer le ticket"}
          </button>
        </form>
      </div>
    </div>
  );
}