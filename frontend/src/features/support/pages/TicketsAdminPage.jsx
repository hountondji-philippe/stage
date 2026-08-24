import { useState } from "react";
import AdminLayout from "../../admin/components/AdminLayout";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import Pagination from "../../admin/components/Pagination";
import TicketAdminCard from "../components/TicketAdminCard";
import RepondreTicketModal from "../components/RepondreTicketModal";
import { useTicketsAdmin } from "../hooks/useTicketsAdmin";

const TABS = [
  { key: "", label: "Tout" },
  { key: "ouvert", label: "Ouverts" },
  { key: "resolu", label: "Résolus" },
];

export default function TicketsAdminPage() {
  const { tickets, meta, statut, updateStatut, setPage, loading, error, envoyerReponse } =
    useTicketsAdmin();
  const [ticketAReppondre, setTicketAReppondre] = useState(null);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[var(--color-primary)] md:text-3xl">Tickets de support</h1>
        <p className="mt-1 text-gray-500">Gérez les demandes d'assistance des étudiants.</p>
      </div>

      <div className="mb-6 flex gap-2 border-b border-gray-200">
        {TABS.map((tab) => {
          const actif = statut === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => updateStatut(tab.key)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                actif ? "text-[var(--color-primary)]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
              {actif && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[var(--color-primary)]" />
              )}
            </button>
          );
        })}
      </div>

      {error && <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      {loading ? (
        <div className="relative min-h-[320px] rounded-2xl border border-gray-200 bg-white shadow-sm">
          <LoadingScreen fullScreen={false} message="Chargement..." />
        </div>
      ) : tickets.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-400 shadow-sm">
          Aucun ticket dans cette catégorie.
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((t) => (
            <TicketAdminCard key={t.id} ticket={t} onRepondre={setTicketAReppondre} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={meta.current_page}
        totalPages={meta.last_page}
        totalItems={meta.total}
        pageSize={meta.per_page}
        onPageChange={setPage}
      />

      <RepondreTicketModal
        ticket={ticketAReppondre}
        onClose={() => setTicketAReppondre(null)}
        onSubmit={envoyerReponse}
      />
    </AdminLayout>
  );
}