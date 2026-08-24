import { useNavigate } from "react-router-dom";
import StatusBadge from "../../../components/ui/StatusBadge";
import { ROUTES } from "../../../router/paths";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function EtudiantMemoireRow({ memoire }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(ROUTES.memoireDetailAdmin(memoire.id))}
      className="flex w-full items-center justify-between gap-4 rounded-xl border border-gray-100 p-4 text-left transition-colors hover:bg-gray-50"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-gray-900">{memoire.titre}</p>
        <p className="text-xs text-gray-400">
          {memoire.filiere?.nom} • Déposé le {formatDate(memoire.created_at)}
        </p>
      </div>
      <StatusBadge status={memoire.statut} />
    </button>
  );
}