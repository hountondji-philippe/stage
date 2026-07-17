import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../../../components/ui/StatusBadge";

function nomAuteur(m) {
  const etudiant = m.user?.etudiantAutorise ?? m.user?.etudiant_autorise;
  return etudiant ? `${etudiant.nom} ${etudiant.prenom}` : m.user?.email ?? "—";
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function MemoiresListeCard({ m, onDeleteClick }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{m.titre}</h3>
          <p className="text-xs text-gray-500">
            {nomAuteur(m)} • {m.filiere?.nom}
          </p>
        </div>
        <StatusBadge status={m.statut} className="shrink-0" />
      </div>

      <p className="mb-4 text-xs text-gray-500">Déposé le {formatDate(m.created_at)}</p>

      <div className="flex items-center gap-2">
        {m.statut === "en_attente" ? (
          <button
            onClick={() => navigate(`/admin/memoires/${m.id}`, { state: { memoire: m } })}
            className="flex-1 rounded-lg bg-[var(--color-primary)] py-2.5 text-sm font-bold text-white"
          >
            Examiner
          </button>
        ) : (
          <button
            onClick={() => navigate(`/admin/memoires/${m.id}`, { state: { memoire: m } })}
            className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-bold text-gray-700"
          >
            Consulter
          </button>
        )}
        <button
          onClick={() => onDeleteClick(m)}
          className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
