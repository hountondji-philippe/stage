import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ChevronRight,
  Subtitles,
  GraduationCap,
  CalendarDays,
  User,
  History,
  Paperclip,
  FileText,
  Eye,
  Download,
  Check,
  Hourglass,
  X,
  PenLine,
  Globe2,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";
import EtudiantLayout from "../components/EtudiantLayout";
import Button from "../../../components/ui/Button";
import StatusBadge from "../../../components/ui/StatusBadge";
import { useDetailDepot } from "../hooks/useDetailDepot";
import { getFichierBlobUrl, telechargerFichierAuthentifie } from "../api/memoiresApi";
import { ROUTES } from "../../../router/paths";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-bg)] text-[var(--color-primary)]">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{label}</p>
        <p className="text-sm font-medium text-[var(--color-text)]">{value || "—"}</p>
      </div>
    </div>
  );
}

function FichierRow({ nom, memoireId, type, disponible }) {
  const [chargement, setChargement] = useState(null); // "voir" | "telecharger" | null

  async function handleVoir() {
    setChargement("voir");
    try {
      const url = await getFichierBlobUrl(memoireId, type);
      window.open(url, "_blank");
    } catch {
      alert("Impossible d'afficher ce fichier.");
    } finally {
      setChargement(null);
    }
  }

  async function handleTelecharger() {
    setChargement("telecharger");
    try {
      await telechargerFichierAuthentifie(memoireId, type, nom);
    } catch {
      alert("Le téléchargement a échoué.");
    } finally {
      setChargement(null);
    }
  }

  return (
    <div className="group flex items-center justify-between rounded-xl border border-gray-200 p-4 transition-colors hover:border-[var(--color-primary-light)]">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-red-50 text-[var(--color-status-rejete)]">
          <FileText className="h-6 w-6" />
        </div>
        <p className="truncate text-sm font-medium text-[var(--color-text)]">{nom}</p>
      </div>
      {disponible && (
        <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={handleVoir}
            disabled={chargement !== null}
            className="rounded-full p-2 text-[var(--color-primary)] hover:bg-[var(--color-bg)] disabled:opacity-40"
            title="Voir"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={handleTelecharger}
            disabled={chargement !== null}
            className="rounded-full p-2 text-[var(--color-primary)] hover:bg-[var(--color-bg)] disabled:opacity-40"
            title="Télécharger"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function Timeline({ statut, dateDepot }) {
  const etape2EnCours = statut === "en_attente";
  const etape3Valide = statut === "valide";
  const etape3Rejetee = statut === "rejete";

  return (
    <div className="relative space-y-8">
      <div className="absolute bottom-2 left-4 top-2 w-0.5 bg-gray-200" />

      <div className="relative flex items-start gap-4">
        <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white ring-4 ring-white">
          <Check className="h-4 w-4" strokeWidth={3} />
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--color-text)]">Dépôt envoyé</p>
          <p className="text-xs text-gray-400">{formatDate(dateDepot)}</p>
        </div>
      </div>

      <div className="relative flex items-start gap-4">
        <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white ${etape2EnCours ? "border-2 border-orange-200 bg-orange-50" : "bg-green-500 text-white"}`}>
          {etape2EnCours ? (
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--color-status-attente)]" />
          ) : (
            <Check className="h-4 w-4" strokeWidth={3} />
          )}
        </div>
        <div>
          <p className={`text-sm font-semibold ${etape2EnCours ? "text-[var(--color-status-attente)]" : "text-[var(--color-text)]"}`}>
            En cours de validation
          </p>
          <p className="text-xs text-gray-400">Analyse par l'administration</p>
        </div>
      </div>

      <div className="relative flex items-start gap-4">
        <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white ${etape3Valide ? "bg-green-500 text-white" : etape3Rejetee ? "bg-red-500 text-white" : "bg-gray-100 text-gray-400"}`}>
          {etape3Valide && <Check className="h-4 w-4" strokeWidth={3} />}
          {etape3Rejetee && <X className="h-4 w-4" strokeWidth={3} />}
          {!etape3Valide && !etape3Rejetee && <Hourglass className="h-4 w-4" />}
        </div>
        <div>
          <p className={`text-sm font-semibold ${etape3Valide ? "text-green-600" : etape3Rejetee ? "text-[var(--color-status-rejete)]" : "text-gray-400"}`}>
            Décision finale
          </p>
          <p className="text-xs italic text-gray-400">
            {etape3Valide && "Mémoire validé et publié"}
            {etape3Rejetee && "Dépôt rejeté"}
            {!etape3Valide && !etape3Rejetee && "En attente de validation"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DetailDepotPage() {
  const navigate = useNavigate();
  const { depot, loading, error } = useDetailDepot();

  if (loading) {
    return (
      <EtudiantLayout>
        <div className="rounded-2xl bg-white p-10 text-center text-gray-400 shadow-[0_4px_20px_rgba(19,36,107,0.06)]">
          Chargement du dépôt...
        </div>
      </EtudiantLayout>
    );
  }

  if (error || !depot) {
    return (
      <EtudiantLayout>
        <div className="rounded-2xl bg-red-50 p-10 text-center text-red-600">
          {error || "Ce dépôt est introuvable."}
        </div>
      </EtudiantLayout>
    );
  }

  const { id, titre, resume, statut, filiere, annee, encadrant, created_at, updated_at, motif_rejet, fichier_memoire, fichier_preuve, views_count } = depot;

  return (
    <EtudiantLayout>
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link to={ROUTES.espaceEtudiant} className="hover:text-[var(--color-primary)]">Mes dépôts</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="max-w-xs truncate font-bold text-[var(--color-primary)] sm:max-w-md">{titre}</span>
      </nav>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="max-w-4xl text-2xl font-extrabold text-[var(--color-primary)] sm:text-3xl">{titre}</h1>
        <StatusBadge status={statut} />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_380px]">
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[var(--color-primary)]">
              <Subtitles className="h-5 w-5 text-[var(--color-primary-light)]" />
              Résumé du mémoire
            </h2>
            <p className="leading-relaxed text-gray-600">{resume}</p>
            <div className="mt-8 grid grid-cols-1 gap-6 border-t border-gray-100 pt-6 sm:grid-cols-2">
              <InfoItem icon={GraduationCap} label="Filière" value={filiere?.nom} />
              <InfoItem icon={CalendarDays} label="Année académique" value={annee} />
              <InfoItem icon={User} label="Encadrant" value={encadrant} />
              <InfoItem icon={History} label="Dernière modification" value={formatDate(updated_at || created_at)} />
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[var(--color-primary)]">
              <Paperclip className="h-5 w-5 text-[var(--color-primary-light)]" />
              Documents joints
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FichierRow nom="Mémoire (PDF)" memoireId={id} type="memoire" disponible={Boolean(fichier_memoire)} />
              <FichierRow nom="Preuve de soutenance (PDF)" memoireId={id} type="preuve" disponible={Boolean(fichier_preuve)} />
            </div>
          </section>
        </div>

        <aside className="order-1 space-y-6 lg:sticky lg:top-6 lg:order-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-6 text-lg font-bold text-[var(--color-primary)]">Suivi du dossier</h3>
            <Timeline statut={statut} dateDepot={created_at} />

            {statut === "rejete" && motif_rejet && (
              <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                <p className="mb-1 font-semibold">Motif du rejet</p>
                <p>{motif_rejet}</p>
              </div>
            )}

            <div className="mt-8">
              {statut === "en_attente" && (
                <>
                  <Button variant="primary" fullWidth className="py-3.5" onClick={() => navigate(ROUTES.depotEtudiantModifier(id))}>
                    <PenLine className="h-4 w-4" />
                    Modifier mon dépôt
                  </Button>
                  <p className="mt-3 text-center text-xs leading-relaxed text-gray-400">
                    La modification reste possible tant que le statut n'est pas « Validé » ou « Rejeté ».
                  </p>
                </>
              )}

              {statut === "valide" && (
                <Button variant="primary" fullWidth className="py-3.5" onClick={() => navigate(ROUTES.memoirePublic(id))}>
                  <Globe2 className="h-4 w-4" />
                  Voir la page publique
                  {typeof views_count === "number" && <span className="text-white/70">· {views_count} vues</span>}
                </Button>
              )}

              {statut === "rejete" && (
                <Button variant="primary" fullWidth className="py-3.5" onClick={() => navigate(ROUTES.depotEtudiantModifier(id))}>
                  <PenLine className="h-4 w-4" />
                  Corriger et redéposer
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--color-bg)] p-6">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)]/5 text-[var(--color-primary)]">
                <LifeBuoy className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-[var(--color-primary)]">Besoin d'aide ?</h4>
            </div>
            <p className="mb-4 text-sm text-gray-500">Un problème avec votre dépôt ? Contactez le support académique.</p>
            <button className="flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline">
              Ouvrir un ticket
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </aside>
      </div>
    </EtudiantLayout>
  );
}