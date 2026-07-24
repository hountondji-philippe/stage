import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { iconeParNom } from "../../admin/components/iconesActualites";
import { ROUTES } from "../../../router/paths";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

export function ActualiteCard({ id, icone, date_publication, titre, contenu }) {
  const Icon = iconeParNom(icone);

  return (
    <article className="flex h-full w-[320px] shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md sm:w-[380px]">
      <div className="relative flex h-48 shrink-0 items-center justify-center bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)]">
        <Icon size={56} className="text-white/30" strokeWidth={1.5} />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[var(--color-primary)] backdrop-blur-sm">
          {formatDate(date_publication)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Link
          to={ROUTES.actualiteDetail(id)}
          className="mb-3 line-clamp-2 text-lg font-bold leading-tight text-gray-900 hover:underline"
        >
          {titre}
        </Link>
        <p className="mb-5 flex-1 line-clamp-3 text-sm leading-relaxed text-gray-500">
          {contenu}
        </p>

        <Link
          to={ROUTES.actualiteDetail(id)}
          className="flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary)] transition-all hover:gap-2.5 hover:underline"
        >
          Lire la suite <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}