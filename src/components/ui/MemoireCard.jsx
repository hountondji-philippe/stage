import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { ROUTES } from "../../router/paths";

export function MemoireCard({ memoire }) {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Zone visuelle */}
      <div className="mb-4 flex h-40 w-full items-center justify-center rounded-lg bg-gray-50 text-gray-300">
        <FileText size={48} />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
          Validé
        </span>
        <span className="text-sm text-gray-500">{memoire.annee}</span>
      </div>
      
      <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900">
        {memoire.titre}
      </h3>
      
      <div className="mb-6 text-sm text-gray-600">
        Par <span className="font-semibold">{memoire.user?.nom} {memoire.user?.prenom}</span>
      </div>
      
      <div className="mt-auto">
        <button
          onClick={() => navigate(ROUTES.detailMemoire.replace(':id', memoire.id))}
          className="w-full rounded-lg border-2 border-indigo-600 py-2.5 font-bold text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white"
        >
          Consulter
        </button>
      </div>
    </div>
  );
}