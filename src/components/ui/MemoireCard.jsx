import { useNavigate } from "react-router-dom";
import { FileText, Eye, User, GraduationCap, School } from "lucide-react";
import { ROUTES } from "../../router/paths";

export function MemoireCard({ memoire }) {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Zone visuelle : Affichage de la couverture PDF ou icône */}
      <div className="mb-4 flex h-40 w-full items-center justify-center rounded-lg bg-gray-50 overflow-hidden">
        {memoire.couverture_url ? (
          <img src={memoire.couverture_url} alt="Couverture" className="h-full w-full object-cover" />
        ) : (
          <FileText size={48} className="text-gray-300" />
        )}
      </div>

      {/* Header : Validé et Année */}
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
          ✅ Validé
        </span>
        <span className="text-sm font-medium text-gray-500">{memoire.annee}</span>
      </div>

      {/* Titre */}
      <h3 className="mb-4 line-clamp-2 text-lg font-bold text-gray-900 leading-tight">
        {memoire.titre}
      </h3>

      {/* Informations complémentaires */}
      <div className="space-y-2 mb-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <User size={16} className="text-gray-400" />
          <span className="font-semibold text-gray-800">{memoire.user?.nom} {memoire.user?.prenom}</span>
        </div>
        <div className="flex items-center gap-2">
          <GraduationCap size={16} className="text-gray-400" />
          <span>{memoire.filiere?.nom || "Filière non définie"}</span>
        </div>
        <div className="flex items-center gap-2">
          <School size={16} className="text-gray-400" />
          <span>{memoire.encadreur || "Non renseigné"}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Eye size={16} />
          <span>{memoire.views_count || 0} vues</span>
        </div>
      </div>

      {/* Bouton */}
      <div className="mt-auto">
        <button
          onClick={() => navigate(ROUTES.detailMemoire.replace(':id', memoire.id))}
          className="w-full rounded-lg border-2 border-indigo-600 py-2.5 font-bold text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white"
        >
          Consulter le mémoire
        </button>
      </div>
    </div>
  );
}