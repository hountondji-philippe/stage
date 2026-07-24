import { useParams, Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useActualiteDetail } from "../hooks/useActualiteDetail";
import { iconeParNom } from "../../admin/components/iconesActualites";import { ROUTES } from "../../../router/paths";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ActualiteDetailPage() {
  const { id } = useParams();
  const { actualite, loading, error } = useActualiteDetail(id);

  if (loading) {
    return <div className="py-24 text-center text-gray-400">Chargement...</div>;
  }

  if (error || !actualite) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-red-600">{error || "Cette actualité est introuvable."}</p>
        <Link to={ROUTES.actualites} className="text-[var(--color-primary)] hover:underline">
          Retour aux actualités
        </Link>
      </div>
    );
  }

  const Icon = iconeParNom(actualite.icone);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="relative flex h-64 items-center justify-center bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] sm:h-80">
        <Icon size={90} className="text-white/25" strokeWidth={1.5} />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="-mt-12 rounded-2xl border border-gray-100 bg-white p-6 shadow-[0px_4px_20px_rgba(19,36,107,0.08)] sm:-mt-16 sm:p-10">
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
            <Link to={ROUTES.actualites} className="flex items-center gap-1 hover:text-[var(--color-primary)]">
              <ChevronLeft size={14} />
              Actualités
            </Link>
            <ChevronRight size={14} />
            <span className="max-w-[200px] truncate text-gray-600">{actualite.titre}</span>
          </nav>

          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--color-primary-light)]">
            {formatDate(actualite.date_publication)}
          </p>
          <h1 className="mb-6 text-2xl font-extrabold leading-tight text-[var(--color-primary)] sm:text-3xl">
            {actualite.titre}
          </h1>
          <p className="whitespace-pre-line text-base leading-relaxed text-gray-600">
            {actualite.contenu}
          </p>
        </div>
      </div>
    </div>
  );
}