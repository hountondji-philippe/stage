import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CheckCircle2, XCircle, GraduationCap, User, CalendarDays, Eye } from "lucide-react";
import EtudiantLayout from "../components/EtudiantLayout";
import Button from "../../../components/ui/Button";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import { useConfirmationBinome } from "../hooks/useConfirmationBinome";
import { ROUTES } from "../../../router/paths";

export default function ConfirmationBinomePage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { memoire, loading, error, actionLoading, actionError, traite, confirmer, refuser, getFichierBlobUrl } =
    useConfirmationBinome(token);
  const [apercuLoading, setApercuLoading] = useState(false);

  async function handleVoirMemoire() {
    setApercuLoading(true);
    try {
      const url = await getFichierBlobUrl("memoire");
      window.open(url, "_blank");
    } catch {
      alert("Impossible d'afficher le document.");
    } finally {
      setApercuLoading(false);
    }
  }

  if (loading) {
    return <LoadingScreen message="Chargement de la demande de confirmation..." />;
  }

  if (error) {
    return (
      <EtudiantLayout>
        <div className="mx-auto flex max-w-[600px] flex-col items-center justify-center rounded-2xl bg-white px-6 py-16 text-center shadow-[0_4px_20px_rgba(19,36,107,0.08)]">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <XCircle size={32} className="text-red-500" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-[var(--color-primary)]">Demande introuvable</h2>
          <p className="mb-6 max-w-sm text-sm text-gray-500">{error}</p>
          <Button variant="primary" onClick={() => navigate(ROUTES.espaceEtudiant)}>
            Retour à mes dépôts
          </Button>
        </div>
      </EtudiantLayout>
    );
  }

  if (traite === "confirme") {
    return (
      <EtudiantLayout>
        <div className="mx-auto flex max-w-[600px] flex-col items-center justify-center rounded-2xl bg-white px-6 py-16 text-center shadow-[0_4px_20px_rgba(19,36,107,0.08)]">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-[var(--color-primary)]">Dépôt confirmé</h2>
          <p className="mb-6 max-w-sm text-sm text-gray-500">
            Merci ! Ce dépôt est désormais transmis à l'administration pour validation. Vous recevrez le reçu
            par email.
          </p>
          <Button variant="primary" onClick={() => navigate(ROUTES.espaceEtudiant)}>
            Retour à mes dépôts
          </Button>
        </div>
      </EtudiantLayout>
    );
  }

  if (traite === "refuse") {
    return (
      <EtudiantLayout>
        <div className="mx-auto flex max-w-[600px] flex-col items-center justify-center rounded-2xl bg-white px-6 py-16 text-center shadow-[0_4px_20px_rgba(19,36,107,0.08)]">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <XCircle size={32} className="text-gray-400" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-[var(--color-primary)]">Association refusée</h2>
          <p className="mb-6 max-w-sm text-sm text-gray-500">
            Vous avez refusé cette association. L'étudiant en sera informé.
          </p>
          <Button variant="primary" onClick={() => navigate(ROUTES.espaceEtudiant)}>
            Retour à mes dépôts
          </Button>
        </div>
      </EtudiantLayout>
    );
  }

  const auteur = memoire?.user?.etudiantAutorise ?? memoire?.user?.etudiant_autorise;
  const nomAuteur = auteur ? `${auteur.prenom} ${auteur.nom}` : memoire?.user?.email;

  return (
    <EtudiantLayout>
      <div className="mx-auto max-w-[700px]">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-extrabold text-[var(--color-primary)] sm:text-3xl">
            Confirmation de dépôt en binôme
          </h1>
          <p className="text-gray-500">
            {nomAuteur} vous a désigné comme binôme sur ce mémoire. Vérifiez les informations avant de confirmer.
          </p>
        </div>

        <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(19,36,107,0.06)]">
          <div className="border-b border-gray-100 p-6">
            <h2 className="mb-4 text-lg font-bold text-gray-900">{memoire?.titre}</h2>
            <p className="mb-6 text-sm leading-relaxed text-gray-600">{memoire?.resume}</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-bg)] text-[var(--color-primary)]">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Auteur principal</p>
                  <p className="text-sm font-medium text-gray-900">{nomAuteur}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-bg)] text-[var(--color-primary)]">
                  <GraduationCap size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Filière</p>
                  <p className="text-sm font-medium text-gray-900">{memoire?.filiere?.nom}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-bg)] text-[var(--color-primary)]">
                  <CalendarDays size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Année</p>
                  <p className="text-sm font-medium text-gray-900">{memoire?.annee}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <Button variant="outline" fullWidth loading={apercuLoading} onClick={handleVoirMemoire}>
              <Eye size={16} />
              Consulter le mémoire (PDF)
            </Button>
          </div>
        </div>

        {actionError && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{actionError}</p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            fullWidth
            loading={actionLoading}
            onClick={refuser}
            className="!border-red-200 !text-red-600 hover:!bg-red-50"
          >
            <XCircle size={16} />
            Refuser
          </Button>
          <Button variant="primary" fullWidth loading={actionLoading} onClick={confirmer}>
            <CheckCircle2 size={16} />
            Confirmer ce dépôt
          </Button>
        </div>
      </div>
    </EtudiantLayout>
  );
}