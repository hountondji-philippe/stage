import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, MoreVertical, Trash2, Eye } from "lucide-react";
import Button from "../../../components/ui/Button";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { ROUTES } from "../../../router/paths";

function estUrgent(createdAt) {
  if (!createdAt) return false;
  const joursEcoules = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
  return joursEcoules > 15;
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminDepotCard({ memoire, onDelete }) {
  const navigate = useNavigate();
  const { id, titre, created_at, filiere } = memoire;
  const urgent = estUrgent(created_at);
  const etudiant = memoire.user?.etudiantAutorise ?? memoire.user?.etudiant_autorise;
  const nomComplet = etudiant ? `${etudiant.nom} ${etudiant.prenom}` : memoire.user?.email ?? "—";

  const [menuOuvert, setMenuOuvert] = useState(false);
  const [confirmationOuverte, setConfirmationOuverte] = useState(false);
  const menuRef = useRef(null);

  function handleVoirDetail() {
    navigate(ROUTES.memoireDetailAdmin(id));
  }

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
    <div className="flex flex-col gap-4 rounded-2xl border-l-4 border-l-[var(--color-primary)] bg-white p-6 shadow-[0_4px_20px_rgba(19,36,107,0.06)] sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
            En attente
          </span>
          {urgent && (
            <span className="flex items-center gap-1.5 rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600">
              <AlertTriangle size={12} />
              Urgent (&gt; 15 jours)
            </span>
          )}
          <span className="text-xs text-gray-400">Déposé le {formatDate(created_at)}</span>
        </div>

        <button
          onClick={handleVoirDetail}
          className="text-left text-lg font-bold text-[var(--color-primary)] hover:underline"
        >
          {titre}
        </button>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span>{nomComplet}</span>
          {filiere?.nom && <span>• {filiere.nom}</span>}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button variant="primary" onClick={handleVoirDetail}>
          Examiner le dossier
        </Button>

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
              <button
                onClick={handleConsulterDepuisMenu}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Eye size={16} />
                Consulter
              </button>
              <button
                onClick={handleDemanderSuppression}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
                Supprimer
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