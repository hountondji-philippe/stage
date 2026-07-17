import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, XCircle, FolderOpen } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import StatCard from "../components/StatCard";
import FiliereChart from "../components/FiliereChart";
import RecentSubmissionsTable from "../components/RecentSubmissionsTable";
import ActivityTimeline from "../components/ActivityTimeline";
import { useAdminStats } from "../hooks/useAdminStats";
import { useActiviteRecente } from "../hooks/useActiviteRecente";
import { getMemoiresEnAttente } from "../api/adminService";

export default function DashboardAdminPage() {
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
            value={statsLoading ? "…" : stats.en_attente}
            icon={AlertTriangle}
            colorClass="border-orange-400"
            iconBgClass="bg-orange-100 text-orange-600"
          />
          <StatCard
            label="Validés"
            value={statsLoading ? "…" : stats.valide}
            icon={CheckCircle2}
            colorClass="border-green-500"
            iconBgClass="bg-green-100 text-green-600"
          />
          <StatCard
            label="Rejetés"
            value={statsLoading ? "…" : stats.rejete}
            icon={XCircle}
            colorClass="border-red-500"
            iconBgClass="bg-red-100 text-red-600"
          />
          <StatCard
            label="Total des dépôts"
            value={statsLoading ? "…" : stats.total}
            icon={FolderOpen}
            colorClass="border-[var(--color-primary)]"
            iconBgClass="bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
          />
        </div>

        {/* Graphique par filière + tableau dépôts récents */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-1">
            <h4 className="mb-4 text-base font-bold text-gray-900">Répartition par filière</h4>
            {statsLoading ? (
              <div className="py-8 text-center text-sm text-gray-500">Chargement...</div>
            ) : (
              <FiliereChart parFiliere={stats.par_filiere} />
            )}
          </div>

          <div className="xl:col-span-2">
            {depotsLoading ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
                Chargement...
              </div>
            ) : (
              <RecentSubmissionsTable memoires={depotsRecents} />
            )}
          </div>
        </div>

        {/* Activité récente */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h4 className="mb-4 text-base font-bold text-gray-900">Activité récente</h4>
          {activitesLoading ? (
            <div className="py-8 text-center text-sm text-gray-500">Chargement...</div>
          ) : (
            <ActivityTimeline activites={activites} />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
