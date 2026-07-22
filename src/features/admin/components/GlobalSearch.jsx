import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, User, Layers, X } from "lucide-react";
import StatusBadge from "../../../components/ui/StatusBadge";
import { ROUTES } from "../../../router/paths";
import { useRechercheGlobale } from "../hooks/useRechercheGlobale";

export default function GlobalSearch() {
  const navigate = useNavigate();
  const { terme, setTerme, resultats, loading, reset } = useRechercheGlobale();
  const [ouvert, setOuvert] = useState(false);
  const wrapperRef = useRef(null);

  const aDesResultats =
    resultats.memoires.length > 0 || resultats.etudiants.length > 0 || resultats.filieres.length > 0;
  const afficherDropdown = ouvert && terme.trim().length >= 2;

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOuvert(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function allerVersMemoire(id) {
    navigate(ROUTES.memoireDetailAdmin(id));
    setOuvert(false);
    reset();
  }

  function allerVersEtudiant(id) {
    navigate(ROUTES.etudiantDetailAdmin(id));
    setOuvert(false);
    reset();
  }

  function allerVersFiliere(id) {
  navigate(ROUTES.filiereDetailAdmin(id));
  setOuvert(false);
  reset();
}

  return (
    <div ref={wrapperRef} className="relative w-full max-w-sm">
      <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={terme}
        onChange={(e) => setTerme(e.target.value)}
        onFocus={() => setOuvert(true)}
        placeholder="Rechercher un dossier, un étudiant..."
        className="w-full rounded-xl border border-gray-200 bg-[var(--color-bg)] py-2 pl-10 pr-9 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]/40"
      />
      {terme && (
        <button
          onClick={reset}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Effacer"
        >
          <X size={16} />
        </button>
      )}

      {afficherDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[420px] overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-[0_8px_30px_rgba(19,36,107,0.12)]">
          {loading ? (
            <div className="p-4 text-center text-sm text-gray-400">Recherche...</div>
          ) : !aDesResultats ? (
            <div className="p-4 text-center text-sm text-gray-400">Aucun résultat pour "{terme}".</div>
          ) : (
            <>
              {resultats.memoires.length > 0 && (
                <div className="border-b border-gray-100 p-2">
                  <p className="px-2 py-1 text-xs font-bold uppercase tracking-wide text-gray-400">
                    Mémoires
                  </p>
                  {resultats.memoires.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => allerVersMemoire(m.id)}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left hover:bg-gray-50"
                    >
                      <FileText size={16} className="shrink-0 text-[var(--color-primary)]" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">{m.titre}</p>
                        <p className="truncate text-xs text-gray-400">{m.filiere?.nom}</p>
                      </div>
                      <StatusBadge status={m.statut} />
                    </button>
                  ))}
                </div>
              )}

              {resultats.etudiants.length > 0 && (
                <div className="border-b border-gray-100 p-2">
                  <p className="px-2 py-1 text-xs font-bold uppercase tracking-wide text-gray-400">
                    Étudiants
                  </p>
                  {resultats.etudiants.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => allerVersEtudiant(e.id)}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left hover:bg-gray-50"
                    >
                      <User size={16} className="shrink-0 text-[var(--color-primary)]" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {e.prenom} {e.nom}
                        </p>
                        <p className="truncate text-xs text-gray-400">{e.matricule}</p>
                      </div>
                      <StatusBadge status={e.compte_active ? "actif" : "non_active"} />
                    </button>
                  ))}
                </div>
              )}

              {resultats.filieres.length > 0 && (
                <div className="p-2">
                  <p className="px-2 py-1 text-xs font-bold uppercase tracking-wide text-gray-400">
                    Filières
                  </p>
                  {resultats.filieres.map((f) => (
  <button
    key={f.id}
    onClick={() => allerVersFiliere(f.id)}
    className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left hover:bg-gray-50"
  >
                      <Layers size={16} className="shrink-0 text-[var(--color-primary)]" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">{f.nom}</p>
                        <p className="truncate text-xs text-gray-400">
                          {f.memoires_count ?? 0} mémoire{f.memoires_count === 1 ? "" : "s"}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}