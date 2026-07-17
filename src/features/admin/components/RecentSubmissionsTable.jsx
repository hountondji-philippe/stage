import { useNavigate } from "react-router-dom";

function nomAuteur(m) {
  const etudiant = m.user?.etudiantAutorise ?? m.user?.etudiant_autorise;
  return etudiant ? `${etudiant.nom} ${etudiant.prenom}` : m.user?.email ?? "—";
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function RecentSubmissionsTable({ memoires }) {
  const navigate = useNavigate();
  const recents = memoires.slice(0, 5);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <div>
          <h4 className="text-base font-bold text-gray-900">Dépôts en attente récents</h4>
          <p className="text-sm text-gray-500">{memoires.length} nouveau(x) mémoire(s) à examiner.</p>
        </div>
        <button
          onClick={() => navigate("/admin/depots-en-attente")}
          className="text-sm font-bold text-[var(--color-primary)] hover:underline"
        >
          Voir tout
        </button>
      </div>

      <div className="max-h-[400px] flex-1 overflow-y-auto">
        {recents.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">Aucun dépôt en attente.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-500">Titre</th>
                <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-500">Auteur</th>
                <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-500">Date</th>
                <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recents.map((m) => (
                <tr key={m.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <p className="line-clamp-1 text-sm font-bold text-gray-900">{m.titre}</p>
                    <p className="text-xs font-semibold text-[var(--color-primary)]">{m.filiere?.nom}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{nomAuteur(m)}</td>
                  <td className="px-5 py-4 text-sm italic text-gray-500">{formatDate(m.created_at)}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => navigate(`/admin/memoires/${m.id}`)}
                      className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md active:scale-95"
                    >
                      Examiner
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
