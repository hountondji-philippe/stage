import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  BookOpen,
  GraduationCap,
  Calendar,
  User,
  History,
  Headset,
  ArrowRight,
  Pencil,
} from "lucide-react";
import { apiClient } from "../../../lib/apiClient";
import EtudiantLayout from "../components/EtudiantLayout";
import StatutTimeline from "../components/StatutTimeline";
import DocumentsJoints from "../components/DocumentsJoints";
import OuvrirTicketModal from "../../support/components/OuvrirTicketModal";
import Button from "../../../components/ui/Button";
import { ROUTES } from "../../../router/paths";

const STATUT_LABELS = {
  en_attente: { label: "En attente", color: "#D48806", bg: "#FFF7E6", border: "#FFE58F" },
  valide: { label: "Validé", color: "#1A7F37", bg: "#E6F6EA", border: "#B7E4C7" },
  rejete: { label: "Rejeté", color: "#BA1A1A", bg: "#FFDAD6", border: "#FFB4AB" },
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
};

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-[var(--color-primary)]">
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-tight text-gray-400">{label}</p>
        <p className="break-words text-sm font-medium text-gray-800">{value || "—"}</p>
      </div>
    </div>
  );
}

export default function DetailDepotPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [memoire, setMemoire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketModalOuvert, setTicketModalOuvert] = useState(false);

  useEffect(() => {
    apiClient
      .get(`/memoires/${id}`)
      .then((res) => setMemoire(res.data.memoire))
      .catch(() => setError("Impossible de charger ce dépôt."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <EtudiantLayout>
        <div className="flex h-64 items-center justify-center text-gray-400">Chargement...</div>
      </EtudiantLayout>
    );
  }

  if (error || !memoire) {
    return (
      <EtudiantLayout>
        <div className="flex h-64 items-center justify-center text-red-600">
          {error || "Dépôt introuvable."}
        </div>
      </EtudiantLayout>
    );
  }

  const statut = STATUT_LABELS[memoire.statut] || STATUT_LABELS.en_attente;
  const estRejete = memoire.statut === "rejete";

  return (
    <EtudiantLayout>
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 overflow-hidden text-sm text-gray-500">
        <Link to={ROUTES.espaceEtudiant} className="shrink-0 hover:text-[var(--color-primary)]">
          Mes dépôts
        </Link>
        <ChevronRight size={16} className="shrink-0" />
        <span className="truncate font-bold text-[var(--color-primary)]">{memoire.titre}</span>
      </nav>

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="max-w-4xl break-words text-2xl font-bold text-[var(--color-primary)] md:text-3xl">
          {memoire.titre}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex w-fit items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-semibold"
            style={{ backgroundColor: statut.bg, color: statut.color, borderColor: statut.border }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: statut.color }} />
            {statut.label}
          </span>
          {estRejete && (
            <Button
              variant="primary"
              onClick={() => navigate(ROUTES.depotEtudiantModifier(memoire.id))}
            >
              <Pencil size={16} className="mr-1.5" />
              Corriger et renvoyer
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_380px]">
        {/* LEFT */}
        <div className="order-2 space-y-6 lg:order-1">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-[var(--color-primary)]">
              <BookOpen size={20} />
              Résumé du mémoire
            </h2>
            <p className="mb-8 text-base leading-relaxed text-gray-600 md:text-lg">{memoire.resume}</p>

            <div className="grid grid-cols-1 gap-6 border-t border-gray-100 pt-8 md:grid-cols-2">
              <InfoItem icon={GraduationCap} label="Filière" value={memoire.filiere?.nom} />
              <InfoItem icon={Calendar} label="Année Académique" value={memoire.annee} />
              <InfoItem icon={User} label="Encadrant" value={memoire.encadrant} />
              <InfoItem icon={History} label="Dernière modification" value={formatDate(memoire.updated_at)} />
            </div>

            {estRejete && memoire.motif_rejet && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="mb-1 text-sm font-semibold text-red-700">Motif du rejet</p>
                <p className="text-sm text-red-600">{memoire.motif_rejet}</p>
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={() => navigate(ROUTES.depotEtudiantModifier(memoire.id))}
                >
                  <Pencil size={16} className="mr-1.5" />
                  Corriger et renvoyer ce dépôt
                </Button>
              </div>
            )}
          </section>

          <DocumentsJoints memoire={memoire} />
        </div>

        {/* RIGHT */}
        <aside className="order-1 space-y-6 lg:sticky lg:top-28 lg:order-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-8 text-xl font-semibold text-[var(--color-primary)]">Suivi du dossier</h3>
            <StatutTimeline statut={memoire.statut} createdAt={memoire.created_at} valideLe={memoire.valide_le} />
          </div>

          <div className="rounded-2xl border border-[var(--color-primary)]/10 bg-[var(--color-bg)] p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)]/5 text-[var(--color-primary)]">
                <Headset size={20} />
              </div>
              <h4 className="font-semibold text-[var(--color-primary)]">Besoin d'aide ?</h4>
            </div>
            <p className="mb-4 text-sm text-gray-500">
              Un problème avec votre dépôt ? Contactez le support académique.
            </p>
            <button
              onClick={() => setTicketModalOuvert(true)}
              className="flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
            >
              Ouvrir un ticket
              <ArrowRight size={16} />
            </button>
          </div>
        </aside>
      </div>

      <OuvrirTicketModal open={ticketModalOuvert} onClose={() => setTicketModalOuvert(false)} />
    </EtudiantLayout>
  );
}