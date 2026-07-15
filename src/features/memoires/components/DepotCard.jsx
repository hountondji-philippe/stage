import { useNavigate } from "react-router-dom";
import { GraduationCap, AlertCircle, MoreVertical, Trash2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import StatusBadge from "../../../components/ui/StatusBadge";
import { ROUTES } from "../../../router/paths";

const BORDER_COLOR = {
  en_attente: "border-l-[var(--color-status-attente)]",
  valide: "border-l-[var(--color-status-valide)]",
  rejete: "border-l-[var(--color-status-rejete)]",
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DepotCard({ depot, onDelete }) {
  const navigate = useNavigate();
  const { id, titre, statut, filiere, created_at, motif_rejet } = depot;

  function handleVoirDetail() {
    navigate(ROUTES.memoireDetailEtudiant(id));
  }

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border-l-4 bg-white p-6 shadow-[0_4px_20px_rgba(19,36,107,0.06)] sm:flex-row sm:items-center sm:justify-between ${BORDER_COLOR[statut]}`}
    >
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-3">
          <StatusBadge status={statut} />
          <span className="text-xs text-gray-400">Déposé le {formatDate(created_at)}</span>
        </div>

        <button
          onClick={handleVoirDetail}
          className="text-left text-lg font-bold text-[var(--color-primary)] hover:underline"
        >
          {titre}
        </button>

        {statut === "rejete" && motif_rejet && (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-[var(--color-status-rejete)]">
            <AlertCircle size={15} />
            Motif : {motif_rejet}
          </p>
        )}

        {filiere?.nom && (
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <GraduationCap size={16} />
              Filière : {filiere.nom}
            </span>
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {statut === "en_attente" && (
          <>
            <Button variant="outline" onClick={() => navigate(ROUTES.depotEtudiantModifier(id))}>
              Modifier
            </Button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50"
              aria-label="Plus d'options"
            >
              <MoreVertical size={18} />
            </button>
          </>
        )}

        {statut === "rejete" && (
          <>
            <Button variant="primary" onClick={handleVoirDetail}>
              Voir le détail
            </Button>
            <button
              onClick={() => onDelete?.(id)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600"
              aria-label="Supprimer"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}

        {statut === "valide" && (
          <Button variant="primary" onClick={() => navigate(ROUTES.memoirePublic(id))}>
            Voir la page publique
          </Button>
        )}
      </div>
    </div>
  );
}