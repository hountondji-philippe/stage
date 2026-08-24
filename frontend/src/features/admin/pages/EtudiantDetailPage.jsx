import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mail, GraduationCap, Hash, Calendar, BadgeCheck, BadgeX, ArrowLeft, Pencil } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import EtudiantMemoireRow from "../components/EtudiantMemoireRow";
import EtudiantFormModal from "../components/EtudiantFormModal";
import { useEtudiantDetail } from "../hooks/useEtudiantDetail";

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-[var(--color-primary)]">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-tight text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value || "—"}</p>
      </div>
    </div>
  );
}

export default function EtudiantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { etudiant, loading, error, refetch } = useEtudiantDetail(id);
  const [formOpen, setFormOpen] = useState(false);

  if (loading) {
    return (
      <AdminLayout>
        <div className="relative min-h-[400px]">
          <LoadingScreen fullScreen={false} message="Chargement de l'étudiant..." />
        </div>
      </AdminLayout>
    );
  }

  if (error || !etudiant) {
    return (
      <AdminLayout>
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
          <p className="mb-4 text-sm text-red-600">{error || "Étudiant introuvable."}</p>
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            Retour à la liste
          </button>
        </div>
      </AdminLayout>
    );
  }

  const memoires = etudiant.user?.memoires ?? [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[var(--color-primary)]"
        >
          <ArrowLeft size={16} />
          Retour à la liste des étudiants
        </button>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Colonne infos */}
          <div className="w-full space-y-6 lg:w-[360px] lg:shrink-0">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-start justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg font-bold text-white">
                    {etudiant.prenom?.charAt(0)}
                    {etudiant.nom?.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-lg font-extrabold text-[var(--color-primary)]">
                      {etudiant.prenom} {etudiant.nom}
                    </h1>
                    <span
                      className={`mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        etudiant.compte_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {etudiant.compte_active ? <BadgeCheck size={14} /> : <BadgeX size={14} />}
                      {etudiant.compte_active ? "Compte actif" : "Compte non actif"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setFormOpen(true)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
                  aria-label="Modifier les informations"
                >
                  <Pencil size={17} />
                </button>
              </div>

              <div className="space-y-4">
                <InfoItem icon={Hash} label="Matricule" value={etudiant.matricule} />
                <InfoItem icon={Mail} label="Email" value={etudiant.email} />
                <InfoItem icon={GraduationCap} label="Filière" value={etudiant.filiere?.nom} />
                <InfoItem icon={Calendar} label="Année scolaire" value={etudiant.annee_scolaire} />
                <InfoItem icon={GraduationCap} label="Niveau" value={etudiant.niveau} />
              </div>

              <button
                onClick={() => setFormOpen(true)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[var(--color-primary)] py-2.5 text-sm font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
              >
                <Pencil size={16} />
                Modifier les informations
              </button>
            </div>
          </div>

          {/* Colonne dépôts */}
          <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-bold text-gray-900">
              Mémoires déposés ({memoires.length})
            </h2>

            {memoires.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-400">
                {etudiant.compte_active
                  ? "Cet étudiant n'a encore déposé aucun mémoire."
                  : "Le compte de cet étudiant n'est pas encore activé."}
              </p>
            ) : (
              <div className="space-y-3">
                {memoires.map((m) => (
                  <EtudiantMemoireRow key={m.id} memoire={m} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <EtudiantFormModal
        open={formOpen}
        etudiant={etudiant}
        onClose={() => setFormOpen(false)}
        onSaved={() => {
          setFormOpen(false);
          refetch();
        }}
      />
    </AdminLayout>
  );
}