import { Clock, CheckCircle2, MessageSquareReply } from "lucide-react";

const CATEGORIES_LABELS = {
  depot: "Problème de dépôt",
  compte: "Compte / connexion",
  bug: "Erreur technique",
  administratif: "Question administrative",
  autre: "Autre",
};

function nomAuteur(ticket) {
  const etudiant = ticket.user?.etudiantAutorise ?? ticket.user?.etudiant_autorise;
  return etudiant ? `${etudiant.prenom} ${etudiant.nom}` : ticket.user?.email ?? "—";
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function TicketAdminCard({ ticket, onRepondre }) {
  const resolu = ticket.statut === "resolu";

  return (
    <div className="flex flex-col gap-4 rounded-2xl border-l-4 border-l-[var(--color-primary)] bg-white p-6 shadow-[0_4px_20px_rgba(19,36,107,0.06)] sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
              resolu ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
            }`}
          >
            {resolu ? <CheckCircle2 size={14} /> : <Clock size={14} />}
            {resolu ? "Résolu" : "Ouvert"}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {CATEGORIES_LABELS[ticket.categorie] ?? ticket.categorie}
          </span>
        </div>

        <h3 className="text-base font-bold text-gray-900">{ticket.sujet}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {nomAuteur(ticket)} • Ouvert le {formatDate(ticket.created_at)}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{ticket.description}</p>

        {resolu && ticket.reponse && (
          <div className="mt-3 rounded-xl border border-green-100 bg-green-50 p-3">
            <p className="text-xs font-bold uppercase tracking-wide text-green-700">Réponse envoyée</p>
            <p className="text-sm text-green-800">{ticket.reponse}</p>
          </div>
        )}
      </div>

      {!resolu && (
        <button
          onClick={() => onRepondre(ticket)}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          <MessageSquareReply size={16} />
          Répondre
        </button>
      )}
    </div>
  );
}