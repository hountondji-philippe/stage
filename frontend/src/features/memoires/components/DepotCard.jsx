import { useNavigate } from "react-router-dom";
import { GraduationCap, AlertCircle, Users, Pencil } from "lucide-react";
import Button from "../../../components/ui/Button";
import StatusBadge from "../../../components/ui/StatusBadge";
import { useAuth } from "../../auth/hooks/useAuth";
import { ROUTES } from "../../../router/paths";

const BORDER_COLOR = {
  en_attente: "border-l-orange-400",
  en_attente_binome: "border-l-purple-400",
  valide: "border-l-green-500",
  rejete: "border-l-red-500",
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DepotCard({ depot }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    id,
    titre,
    statut,
    filiere,
    created_at,
    motif_rejet,
    user_id,
    matricule_binome,
    binome_token,
  } = depot;

  // L'utilisateur connecté est-il le binôme (pas le propriétaire) de ce dépôt ?
  const estProprietaire = user?.id === user_id;
  const matriculeConnecte = user?.etudiant_autorise?.matricule;
  const estBinome = !estProprietaire && matriculeConnecte && matriculeConnecte === matricule_binome;

  const enAttenteConfirmationBinome = statut === "en_attente_binome";
  const estRejete = statut === "rejete";

  function handleVoirDetail() {
    navigate(ROUTES.memoireDetailEtudiant(id));
  }

  function handleCorriger() {
    navigate(ROUTES.depotEtudiantModifier(id));
  }

  function handleAllerConfirmation() {
    navigate(ROUTES.binomeConfirmation(binome_token));
  }

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border-l-4 bg-white p-6 shadow-[0_4px_20px_rgba(19,36,107,0.06)] sm:flex-row sm:items-center sm:justify-between ${
        BORDER_COLOR[statut] || "border-l-gray-300"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <StatusBadge status={statut} />
          {estBinome && (
            <span className="flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">
              <Users size={13} />
              Vous êtes le binôme
            </span>
          )}
          <span className="text-xs text-gray-400">Déposé le {formatDate(created_at)}</span>
        </div>

        {enAttenteConfirmationBinome && estBinome ? (
          <span className="text-left text-lg font-bold text-[var(--color-primary)]">{titre}</span>
        ) : (
          <button
            onClick={handleVoirDetail}
            className="text-left text-lg font-bold text-[var(--color-primary)] hover:underline"
          >
            {titre}
          </button>
        )}

        {enAttenteConfirmationBinome && (
          <p className="mt-1.5 text-sm text-gray-500">
            {estBinome
              ? "Consultez l'email reçu, ou cliquez sur \"Confirmer / Refuser\" ci-contre."
              : "En attente de la confirmation de votre binôme, reçue par email."}
          </p>
        )}

        {estRejete && motif_rejet && (
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
        {enAttenteConfirmationBinome && estBinome ? (
          <Button variant="primary" onClick={handleAllerConfirmation}>
            Confirmer / Refuser
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={handleVoirDetail}>
              Consulter
            </Button>
            {estRejete && estProprietaire && (
              <Button variant="primary" onClick={handleCorriger}>
                <Pencil size={16} className="mr-1.5" />
                Corriger
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}