import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import DepotDetailPdfViewer from "../components/DepotDetailPdfViewer";
import DepotDetailInfoCard from "../components/DepotDetailInfoCard";
import DepotDetailActions from "../components/DepotDetailActions";
import { useMemoireDetail } from "../hooks/useMemoireDetail";

export default function DepotDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { memoire, loading, error } = useMemoireDetail(id);
  const [isFullscreen, setIsFullscreen] = useState(false);

  function retourListe() {
    navigate("/admin/depots-en-attente");
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-12 text-center text-sm text-gray-500">Chargement du dépôt...</div>
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
            Dépôts en attente
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
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
            En attente
          </span>
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
            <DepotDetailActions
              memoireId={memoire.id}
              onValidated={retourListe}
              onRejected={retourListe}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
