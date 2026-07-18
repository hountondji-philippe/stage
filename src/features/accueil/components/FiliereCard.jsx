import { useNavigate } from "react-router-dom";
import { FileText, ArrowRight } from "lucide-react";

export function FiliereCard({ filiere }) {
  const navigate = useNavigate();
  const { id, nom, description, icon: Icon, memoires_count } = filiere;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
        <Icon size={28} strokeWidth={1.75} />
      </div>

      <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900">{nom}</h3>

      {description && (
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500">{description}</p>
      )}

      <div className="mb-6 mt-auto flex items-center gap-2 text-sm text-gray-400">
        <FileText size={16} />
        <span>
          {memoires_count ?? 0} mémoire{memoires_count === 1 ? "" : "s"}
        </span>
      </div>

      <button
        onClick={() => navigate(`/archive?filiere_id=${id}`)}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[var(--color-primary)] py-2.5 font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
      >
        Consulter
        <ArrowRight size={18} />
      </button>
    </div>
  );
}