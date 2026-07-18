import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import Pagination from "./Pagination";
import { iconeParNom } from "./iconesActualites";

const TAILLE_PAGE = 8;

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

export default function ActualitesTable({ actualites, onEdit, onDelete }) {
  const [menuOuvert, setMenuOuvert] = useState(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(actualites.length / TAILLE_PAGE));
  const actualitesPage = actualites.slice((page - 1) * TAILLE_PAGE, page * TAILLE_PAGE);

  if (actualites.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500 shadow-sm">
        Aucune actualité pour le moment.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-6 py-3 font-semibold">Actualité</th>
            <th className="px-6 py-3 font-semibold">Date de publication</th>
            <th className="px-6 py-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {actualitesPage.map((a) => {
            const Icon = iconeParNom(a.icone);
            return (
              <tr key={a.id} className="hover:bg-gray-50/60">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                      <Icon size={18} className="text-[var(--color-primary)]" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-[var(--color-text)]">{a.titre}</p>
                      <p className="truncate text-xs text-gray-500">{a.contenu}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{formatDate(a.date_publication)}</td>
                <td className="px-6 py-4">
                  <div className="relative flex justify-end">
                    <button
                      onClick={() => setMenuOuvert(menuOuvert === a.id ? null : a.id)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      aria-label="Actions"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {menuOuvert === a.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setMenuOuvert(null)} />
                        <div className="absolute right-0 z-20 mt-8 w-40 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">
                          <button
                            onClick={() => {
                              setMenuOuvert(null);
                              onEdit(a);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Modifier
                          </button>
                          <button
                            onClick={() => {
                              setMenuOuvert(null);
                              onDelete(a);
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={actualites.length}
        pageSize={TAILLE_PAGE}
        onPageChange={setPage}
      />
    </div>
  );
}