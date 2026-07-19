import { useState } from "react";
import EtudiantLayout from "../components/EtudiantLayout";
import DepotCard from "../components/DepotCard";
import EmptyState from "../components/EmptyState";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import { useMesDepots } from "../hooks/useMesDepots";

const TABS = [
  { key: "tout", label: "Tout" },
  { key: "en_attente", label: "En attente" },
  { key: "valide", label: "Validés" },
  { key: "rejete", label: "Rejetés" },
];

export default function MesDepotsPage() {
  const { memoires, counts, loading, error } = useMesDepots();
  const [ongletActif, setOngletActif] = useState("tout");

  const memoiresFiltres =
    ongletActif === "tout" ? memoires : memoires.filter((m) => m.statut === ongletActif);

  return (
    <EtudiantLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[var(--color-primary)] sm:text-3xl">Mes dépôts</h1>
        <p className="mt-1 text-gray-500">Historique complet de vos mémoires déposés.</p>
      </div>

      <div className="mb-8 flex gap-2 border-b border-gray-200">
        {TABS.map((tab) => {
          const count =
            tab.key === "tout"
              ? memoires.length
              : counts?.[tab.key] ?? memoires.filter((m) => m.statut === tab.key).length;
          const actif = ongletActif === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setOngletActif(tab.key)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                actif ? "text-[var(--color-primary)]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  actif ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "bg-gray-100 text-gray-400"
                }`}
              >
                {count}
              </span>
              {actif && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[var(--color-primary)]" />}
            </button>
          );
        })}
      </div>

      <div className="relative">
        {loading && <LoadingScreen fullScreen={false} message="Chargement de vos dépôts..." />}

        {!loading && error && (
          <div className="rounded-2xl bg-red-50 p-10 text-center text-red-600">{error}</div>
        )}

        {!loading && !error && memoiresFiltres.length === 0 && <EmptyState />}

        {!loading && !error && memoiresFiltres.length > 0 && (
          <div className="space-y-4">
            {memoiresFiltres.map((depot) => (
              <DepotCard key={depot.id} depot={depot} />
            ))}
          </div>
        )}
      </div>
    </EtudiantLayout>
  );
}