import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { ROUTES } from "../../../router/paths";

export function TopMemoireRow({ memoire }) {
  const navigate = useNavigate();
  const { id, rang, titre, auteur, filiere, vues } = memoire;
  const estPremier = rang === 1;

  return (
    <div
      onClick={() => navigate(ROUTES.memoirePublic(id))}
      className="flex cursor-pointer items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:gap-6 sm:p-6"
    >
      <span
        className={`w-10 shrink-0 text-center text-3xl font-black sm:w-16 sm:text-5xl ${
          estPremier ? "text-[var(--color-accent)]" : "text-gray-200"
        }`}
      >
        {rang}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="mb-1 line-clamp-1 text-base font-bold leading-tight text-gray-900 sm:text-lg">
          {titre}
        </h3>
        <p className="truncate text-sm text-gray-500">
          {auteur} • {filiere}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2 text-gray-400">
        <Eye size={18} />
        <span className="font-bold text-gray-700">{vues}</span>
      </div>
    </div>
  );
}