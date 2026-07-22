import { useState } from "react";
import { Plus, LifeBuoy } from "lucide-react";
import EtudiantLayout from "../../memoires/components/EtudiantLayout";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import TicketCard from "../components/TicketCard";
import OuvrirTicketModal from "../components/OuvrirTicketModal";
import { useMesTickets } from "../hooks/useMesTickets";

export default function MesTicketsPage() {
  const { tickets, loading, error, refetch } = useMesTickets();
  const [modalOuvert, setModalOuvert] = useState(false);

  return (
    <EtudiantLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--color-primary)] sm:text-3xl">
            Mes tickets
          </h1>
          <p className="mt-1 text-gray-500">Vos demandes d'assistance et leurs réponses.</p>
        </div>
        <button
          onClick={() => setModalOuvert(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          <Plus size={18} />
          Ouvrir un ticket
        </button>
      </div>

      {loading ? (
        <div className="relative min-h-[320px] rounded-2xl border border-gray-100 bg-white shadow-sm">
          <LoadingScreen fullScreen={false} message="Chargement de vos tickets..." />
        </div>
      ) : error ? (
        <div className="rounded-2xl bg-red-50 p-10 text-center text-red-600">{error}</div>
      ) : tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white p-14 text-center shadow-sm">
          <LifeBuoy size={40} className="text-gray-300" />
          <p className="text-sm text-gray-400">Vous n'avez ouvert aucun ticket pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((t) => (
            <TicketCard key={t.id} ticket={t} />
          ))}
        </div>
      )}

      <OuvrirTicketModal
        open={modalOuvert}
        onClose={() => setModalOuvert(false)}
        onCreated={refetch}
      />
    </EtudiantLayout>
  );
}