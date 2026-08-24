import { useNavigate } from "react-router-dom";
import { FileText, GraduationCap, Layers, Search } from "lucide-react";
import { ROUTES } from "../../../router/paths";

export default function RechercheGlobaleDropdown({ terme, resultats, loading, onClose }) {
  const navigate = useNavigate();

  function aller(chemin) {
    onClose();
    navigate(chemin);
  }

  function voirTout() {
    onClose();
    navigate(`${ROUTES.archive}?q=${encodeURIComponent(terme)}`);
  }

  const { memoires, filieres, sous_filieres } = resultats;
  const aDesResultats = memoires.length > 0 || filieres.length > 0 || sous_filieres.length > 0;

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-[0_8px_30px_rgba(19,36,107,0.12)]">
      {loading && <p className="p-4 text-center text-sm text-gray-400">Recherche en cours...</p>}

      {!loading && terme.trim().length < 2 && (
        <p className="p-4 text-center text-sm text-gray-400">Tapez au moins 2 caractères...</p>
      )}

      {!loading && terme.trim().length >= 2 && !aDesResultats && (
        <p className="p-4 text-center text-sm text-gray-400">Aucun résultat pour "{terme}".</p>
      )}

      {!loading && memoires.length > 0 && (
        <div className="border-b border-gray-50 py-2">
          <p className="px-4 pb-1 pt-2 text-xs font-bold uppercase tracking-wide text-gray-400">Mémoires</p>
          {memoires.map((m) => (
            <button
              key={m.id}
              onClick={() => aller(ROUTES.memoirePublic(m.id))}
              className="flex w-full items-start gap-3 px-4 py-2.5 text-left hover:bg-gray-50"
            >
              <FileText size={16} className="mt-0.5 shrink-0 text-[var(--color-primary)]" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-gray-900">{m.titre}</span>
                <span className="block text-xs text-gray-400">
                  {m.filiere?.nom} • {m.annee}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      {!loading && filieres.length > 0 && (
        <div className="border-b border-gray-50 py-2">
          <p className="px-4 pb-1 pt-2 text-xs font-bold uppercase tracking-wide text-gray-400">Filières</p>
          {filieres.map((f) => (
            <button
              key={f.id}
              onClick={() => aller(`${ROUTES.archive}?filiere_id=${f.id}`)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50"
            >
              <GraduationCap size={16} className="shrink-0 text-[var(--color-primary)]" />
              <span className="text-sm font-medium text-gray-900">{f.nom}</span>
            </button>
          ))}
        </div>
      )}

      {!loading && sous_filieres.length > 0 && (
        <div className="py-2">
          <p className="px-4 pb-1 pt-2 text-xs font-bold uppercase tracking-wide text-gray-400">Sous-filières</p>
          {sous_filieres.map((sf) => (
            <button
              key={sf.id}
              onClick={() => aller(`${ROUTES.archive}?filiere_id=${sf.filiere_id}&sous_filiere_id=${sf.id}`)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50"
            >
              <Layers size={16} className="shrink-0 text-[var(--color-primary)]" />
              <span className="text-sm font-medium text-gray-900">
                {sf.nom} <span className="text-xs text-gray-400">({sf.filiere?.nom})</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {!loading && aDesResultats && terme.trim().length >= 2 && (
        <button
          onClick={voirTout}
          className="flex w-full items-center justify-center gap-2 border-t border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-[var(--color-primary)] hover:bg-gray-100"
        >
          <Search size={14} />
          Voir tous les résultats pour "{terme}"
        </button>
      )}
    </div>
  );
}