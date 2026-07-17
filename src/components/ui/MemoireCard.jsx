import { useNavigate } from "react-router-dom";
import { FileText, Eye, User, GraduationCap, School } from "lucide-react";
import { ROUTES } from "../../router/paths";

export function MemoireCard({ memoire }) {
  const navigate = useNavigate();

  const auteur = memoire.user?.etudiant_autorise
    ? `${memoire.user.etudiant_autorise.prenom} ${memoire.user.etudiant_autorise.nom}`
    : "Auteur inconnu";

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-50">
        {memoire.couverture_url ? (
          <img src={memoire.couverture_url} alt="Couverture" className="h-full w-full object-cover" />
        ) : (
          <FileText size={48} className="text-gray-300" />
        )}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span
          className="rounded-full px-3 py-1 text-xs font-bold text-white"
          style={{ backgroundColor: "var(--color-status-valide)" }}
        >
          Validé
        </span>
        <span className="text-sm font-medium text-gray-500">{memoire.annee}</span>
      </div>

      <h3 className="mb-4 line-clamp-2 text-lg font-bold leading-tight text-gray-900">
        {memoire.titre}
      </h3>

      <div className="mb-6 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <User size={16} className="text-gray-400" />
          <span className="font-semibold text-gray-800">{auteur}</span>
        </div>
        <div className="flex items-center gap-2">
          <GraduationCap size={16} className="text-gray-400" />
          <span>{memoire.filiere?.nom || "Filière non définie"}</span>
        </div>
        <div className="flex items-center gap-2">
          <School size={16} className="text-gray-400" />
          <span>{memoire.encadrant || "Non renseigné"}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Eye size={16} />
          <span>{memoire.views_count || 0} vues</span>
        </div>
      </div>

      <div className="mt-auto">
        <button
          onClick={() => navigate(ROUTES.memoirePublic(memoire.id))}
          className="w-full rounded-lg border-2 border-[var(--color-primary)] py-2.5 font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
        >
          Consulter le mémoire
        </button>
      </div>
    </div>
  );
}