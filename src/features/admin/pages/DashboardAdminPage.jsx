import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle2, XCircle, FolderOpen } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import StatCard from "../components/StatCard";
import FiliereChart from "../components/FiliereChart";
import RecentSubmissionsTable from "../components/RecentSubmissionsTable";
import ActivityTimeline from "../components/ActivityTimeline";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import { useAdminStats } from "../hooks/useAdminStats";
import { useActiviteRecente } from "../hooks/useActiviteRecente";
import { getMemoiresEnAttente } from "../api/adminService";
import { ROUTES } from "../../../router/paths";

export default function DashboardAdminPage() {
  const navigate = useNavigate();
  const { stats, loading: statsLoading } = useAdminStats();
  const { activites, loading: activitesLoading } = useActiviteRecente(6);
  const [depotsRecents, setDepotsRecents] = useState([]);
  const [depotsLoading, setDepotsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getMemoiresEnAttente();
        setDepotsRecents(data.memoires || []);
      } catch (err) {
        // silencieux : la carte affiche juste "aucun dépôt" en cas d'échec
      } finally {
        setDepotsLoading(false);
      }
    })();
  }, []);

  // Un seul état de chargement global pour toute la page
  const isLoading = statsLoading || depotsLoading || activitesLoading;

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="relative min-h-[70vh]">
          <LoadingScreen fullScreen={false} message="Chargement du tableau de bord..." />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--color-primary)] md:text-3xl">
            Tableau de bord
          </h2>
          <p className="text-gray-500">Vue d'ensemble de la plateforme de gestion des mémoires.</p>
        </div>

        {/* 4 cartes stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="En attente"
            value={stats.en_attente}
            icon={AlertTriangle}
            accentColor="#F5B800"
            onClick={() => navigate(ROUTES.depotsEnAttenteAdmin)}
          />
          <StatCard
            label="Validés"
            value={stats.valide}
            icon={CheckCircle2}
            accentColor="#4ADE80"
            onClick={() => navigate(ROUTES.memoiresListeAdmin, { state: { statutInitial: "valide" } })}
          />
          <StatCard
            label="Rejetés"
            value={stats.rejete}
            icon={XCircle}
            accentColor="#F87171"
            onClick={() => navigate(ROUTES.memoiresListeAdmin, { state: { statutInitial: "rejete" } })}
          />
          <StatCard
            label="Total des dépôts"
            value={stats.total}
            icon={FolderOpen}
            accentColor="#ffffff"
            onClick={() => navigate(ROUTES.memoiresListeAdmin, { state: { statutInitial: "" } })}
          />
        </div>

        {/* Graphique par filière + tableau dépôts récents */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-1">
            <h4 className="mb-4 text-base font-bold text-gray-900">Répartition par filière</h4>
            <FiliereChart parFiliere={stats.par_filiere} />
          </div>

          <div className="xl:col-span-2">
            <RecentSubmissionsTable memoires={depotsRecents} />
          </div>
        </div>

        {/* Activité récente */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h4 className="mb-4 text-base font-bold text-gray-900">Activité récente</h4>
          <ActivityTimeline activites={activites} />
        </div>
      </div>
    </AdminLayout>
  );
}