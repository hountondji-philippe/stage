import { useState } from "react";
import { MoreVertical, FolderPlus, Pencil, Trash2 } from "lucide-react";
import Pagination from "./Pagination";
const TAILLE_PAGE = 12;

export default function FilieresTable({ filieres, onAjouterSousFiliere, onEdit, onDelete }) {
  const [menuOuvert, setMenuOuvert] = useState(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(filieres.length / TAILLE_PAGE));
  const filieresPage = filieres.slice((page - 1) * TAILLE_PAGE, page * TAILLE_PAGE);

  if (filieres.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500 shadow-sm">
        Aucune filière pour le moment.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-6 py-3 font-semibold">Nom</th>
            <th className="px-6 py-3 font-semibold">Description</th>
            <th className="px-6 py-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filieresPage.map((filiere) => (
            <tr key={filiere.id} className="hover:bg-gray-50/60">
              <td className="px-6 py-4 font-semibold text-[var(--color-text)]">{filiere.nom}</td>
              <td className="px-6 py-4 text-gray-500">{filiere.description || "—"}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onAjouterSousFiliere(filiere)}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
                  >
                    <FolderPlus className="h-3.5 w-3.5" />
                    Ajouter sous-filière
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setMenuOuvert(menuOuvert === filiere.id ? null : filiere.id)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      aria-label="Actions"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {menuOuvert === filiere.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setMenuOuvert(null)} />
                        <div className="absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">
                          <button
                            onClick={() => {
                              setMenuOuvert(null);
                              onEdit(filiere);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Modifier
                          </button>
                          <button
                            onClick={() => {
                              setMenuOuvert(null);
                              onDelete(filiere);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Supprimer
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={filieres.length}
        pageSize={TAILLE_PAGE}
        onPageChange={setPage}
      />
    </div>
  );
}