import { useState } from "react";
import { Clock, CheckCircle2, XCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EtudiantLayout from "../components/EtudiantLayout";
import StatCard from "../components/StatCard";
import DepotCard from "../components/DepotCard";
import EmptyState from "../components/EmptyState";
import Button from "../../../components/ui/Button";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import { useMesDepots } from "../hooks/useMesDepots";
import { useAuth } from "../../auth/hooks/useAuth";
import { ROUTES } from "../../../router/paths";

export default function DashboardEtudiantPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { memoires, counts, loading, error, filtreStatut, toggleFiltre, refetch } = useMesDepots();
  const [deleteError, setDeleteError] = useState(null);

  const prenom = user?.etudiant_autorise?.prenom || "";

  async function handleDelete(id) {
    try {
      // TODO: appeler l'endpoint de suppression une fois défini côté backend
      await refetch();
    } catch {
      setDeleteError("La suppression a échoué. Réessayez.");
    }
  }

  return (
    <EtudiantLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--color-primary)] sm:text-3xl">
            Bonjour {prenom}
          </h1>
          <p className="mt-1 text-gray-500">Voici le statut de vos dépôts académiques.</p>
        </div>
        <Button variant="accent" onClick={() => navigate(ROUTES.depotEtudiant)}>
          <Plus size={18} />
          Déposer un nouveau mémoire
        </Button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={Clock}
          count={counts.en_attente}
          label="En attente"
          scheme="attente"
          active={filtreStatut === "en_attente"}
          onClick={() => toggleFiltre("en_attente")}
        />
        <StatCard
          icon={CheckCircle2}
          count={counts.valide}
          label="Validés"
          scheme="valide"
          active={filtreStatut === "valide"}
          onClick={() => toggleFiltre("valide")}
        />
        <StatCard
          icon={XCircle}
          count={counts.rejete}
          label="Rejetés"
          scheme="rejete"
          active={filtreStatut === "rejete"}
          onClick={() => toggleFiltre("rejete")}
        />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[var(--color-text)]">Dépôts récents</h2>
        <button
          onClick={() => navigate(ROUTES.mesDepots)}
          className="text-sm font-semibold text-[var(--color-primary-light)] hover:underline"
        >
          Voir tout l'historique
        </button>
      </div>

      {deleteError && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{deleteError}</p>
      )}

      <div className="relative">
        {loading && (
          <LoadingScreen fullScreen={false} message="Chargement de vos dépôts..." />
        )}

        {!loading && error && (
          <div className="rounded-2xl bg-red-50 p-10 text-center text-red-600">{error}</div>
        )}

        {!loading && !error && memoires.length === 0 && <EmptyState />}

        {!loading && !error && memoires.length > 0 && (
          <div className="space-y-4">
            {memoires.map((depot) => (
              <DepotCard key={depot.id} depot={depot} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </EtudiantLayout>
  );
}