import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, AlertCircle, MoreVertical, Trash2, Eye } from "lucide-react";
import Button from "../../../components/ui/Button";
import StatusBadge from "../../../components/ui/StatusBadge";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { ROUTES } from "../../../router/paths";

const BORDER_COLOR = "border-l-[var(--color-primary)]";

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
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [confirmationOuverte, setConfirmationOuverte] = useState(false);
  const menuRef = useRef(null);
  const enAttente = statut === "en_attente";

  function handleVoirDetail() {
    navigate(ROUTES.memoireDetailEtudiant(id));
  }

  // Ferme le menu "..." si on clique en dehors
  useEffect(() => {
    if (!menuOuvert) return;
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOuvert(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOuvert]);

  function handleDemanderSuppression() {
    setMenuOuvert(false);
    setConfirmationOuverte(true);
  }

  function handleConfirmerSuppression() {
    setConfirmationOuverte(false);
    onDelete?.(id);
  }

  function handleConsulterDepuisMenu() {
    setMenuOuvert(false);
    handleVoirDetail();
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
        {enAttente ? (
          <Button variant="outline" onClick={() => navigate(ROUTES.depotEtudiantModifier(id))}>
            Modifier
          </Button>
        ) : (
          <Button variant="primary" onClick={handleVoirDetail}>
            Consulter
          </Button>
        )}

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOuvert((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50"
            aria-label="Plus d'options"
          >
            <MoreVertical size={18} />
          </button>
          {menuOuvert && (
            <div className="absolute right-0 top-12 z-10 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
              {enAttente && (
                <button
                  onClick={handleConsulterDepuisMenu}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Eye size={16} />
                  Consulter
                </button>
              )}
              <button
                onClick={handleDemanderSuppression}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
                Supprimer le dépôt
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmationOuverte}
        titre="Supprimer ce dépôt ?"
        message={`Cette action est irréversible. "${titre}" sera définitivement supprimé.`}
        labelConfirmer="Supprimer"
        onConfirm={handleConfirmerSuppression}
        onCancel={() => setConfirmationOuverte(false)}
        danger
      />
    </div>
  );
}