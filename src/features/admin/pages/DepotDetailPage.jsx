import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Mail, CheckCircle2 } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import DepotDetailPdfViewer from "../components/DepotDetailPdfViewer";
import DepotDetailInfoCard from "../components/DepotDetailInfoCard";
import DepotDetailActions from "../components/DepotDetailActions";
import StatusBadge from "../../../components/ui/StatusBadge";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import { useMemoireDetail } from "../hooks/useMemoireDetail";
import { apiClient } from "../../../lib/apiClient";

export default function DepotDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { memoire, loading, error } = useMemoireDetail(id, location.state?.memoire);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [renvoiLoading, setRenvoiLoading] = useState(false);
  const [renvoiMessage, setRenvoiMessage] = useState(null); // { type: 'succes' | 'erreur', texte }

  function retourListe() {
    navigate(-1);
  }

  async function handleRenvoyerFiche() {
    setRenvoiLoading(true);
    setRenvoiMessage(null);
    try {
      const { data } = await apiClient.post(`/admin/memoires/${id}/renvoyer-fiche`);
      setRenvoiMessage({ type: "succes", texte: data.message || "La fiche a été renvoyée par email." });
    } catch (err) {
      setRenvoiMessage({
        type: "erreur",
        texte: err.response?.data?.message || "Impossible de renvoyer la fiche.",
      });
    } finally {
      setRenvoiLoading(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="relative min-h-[400px]">
          <LoadingScreen fullScreen={false} message="Chargement du dépôt..." />
        </div>
      </AdminLayout>
    );
  }

  if (error || !memoire) {
    return (
      <AdminLayout>
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
          <p className="mb-4 text-sm text-red-600">{error}</p>
          <button
            onClick={retourListe}
            className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            Retour à la liste des dépôts en attente
          </button>
        </div>
      </AdminLayout>
    );
  }

  // Mode plein écran : uniquement la visionneuse, le reste (fil d'ariane,
  // titre, colonne infos, actions) disparaît pour lui laisser toute la
  // place. Le sidebar/header restent gérés par AdminLayout, inchangés.
  if (isFullscreen) {
    return (
      <AdminLayout>
        <DepotDetailPdfViewer
          memoireId={memoire.id}
          isFullscreen
          onToggleFullscreen={() => setIsFullscreen(false)}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 pb-24 md:pb-0">
        {/* Fil d'ariane */}
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <button onClick={retourListe} className="hover:text-[var(--color-primary)]">
            Retour
          </button>
          <span>/</span>
          <span className="max-w-[240px] truncate font-semibold text-gray-900 md:max-w-none">
            {memoire.titre}
          </span>
        </nav>

        {/* Titre + statut */}
        <div>
          <h1 className="mb-2 text-xl font-extrabold leading-tight text-[var(--color-primary)] md:text-2xl">
            {memoire.titre}
          </h1>
          <StatusBadge status={memoire.statut} />
        </div>

        {/* Deux colonnes */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <DepotDetailPdfViewer
              memoireId={memoire.id}
              isFullscreen={false}
              onToggleFullscreen={() => setIsFullscreen(true)}
            />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-4">
            <DepotDetailInfoCard memoire={memoire} />
            {memoire.statut === "en_attente" ? (
              <DepotDetailActions
                memoireId={memoire.id}
                onValidated={retourListe}
                onRejected={retourListe}
              />
            ) : memoire.statut === "valide" ? (
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-700">
                  <CheckCircle2 size={18} />
                  Mémoire validé
                </div>
                <p className="mb-4 text-sm text-gray-500">
                  La fiche de dépôt a été envoyée par email à l'étudiant (et à son binôme le cas échéant)
                  au moment de la validation. Vous pouvez la renvoyer si besoin.
                </p>

                {renvoiMessage && (
                  <p
                    className={`mb-3 text-sm font-medium ${
                      renvoiMessage.type === "succes" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {renvoiMessage.texte}
                  </p>
                )}

                <button
                  onClick={handleRenvoyerFiche}
                  disabled={renvoiLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[var(--color-primary)] py-3 text-sm font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white disabled:opacity-50"
                >
                  <Mail size={16} />
                  {renvoiLoading ? "Envoi en cours..." : "Renvoyer la fiche par email"}
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
                Ce mémoire a déjà été rejeté — aucune action possible ici.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}