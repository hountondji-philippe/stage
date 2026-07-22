import { Clock, CheckCircle2 } from "lucide-react";

const CATEGORIES_LABELS = {
  depot: "Problème de dépôt",
  compte: "Compte / connexion",
  bug: "Erreur technique",
  administratif: "Question administrative",
  autre: "Autre",
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function TicketCard({ ticket }) {
  const resolu = ticket.statut === "resolu";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {CATEGORIES_LABELS[ticket.categorie] ?? ticket.categorie}
          </p>
          <h3 className="text-base font-bold text-gray-900">{ticket.sujet}</h3>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
            resolu ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
          }`}
        >
          {resolu ? <CheckCircle2 size={14} /> : <Clock size={14} />}
          {resolu ? "Résolu" : "Ouvert"}
        </span>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-gray-600">{ticket.description}</p>

      <p className="text-xs text-gray-400">Ouvert le {formatDate(ticket.created_at)}</p>

      {resolu && ticket.reponse && (
        <div className="mt-4 rounded-xl border border-green-100 bg-green-50 p-4">
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-green-700">
            Réponse de l'administration
          </p>
          <p className="text-sm text-green-800">{ticket.reponse}</p>
          {ticket.repondu_le && (
            <p className="mt-2 text-xs text-green-600">Répondu le {formatDate(ticket.repondu_le)}</p>
          )}
        </div>
      )}
    </div>
  );
}