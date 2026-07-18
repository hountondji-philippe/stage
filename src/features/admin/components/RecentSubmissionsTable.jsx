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
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[var(--color-primary)] shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 p-5">
        <div>
          <h4 className="text-base font-bold text-white">Dépôts en attente récents</h4>
          <p className="text-sm text-[#B9C3FF]">{memoires.length} nouveau(x) mémoire(s) à examiner.</p>
        </div>
        <button
          onClick={() => navigate("/admin/depots-en-attente")}
          className="text-sm font-bold text-[var(--color-accent)] hover:underline"
        >
          Voir tout
        </button>
      </div>

      <div className="max-h-[400px] flex-1 overflow-y-auto">
        {recents.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#B9C3FF]">Aucun dépôt en attente.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-[var(--color-primary)]">
              <tr>
                <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#B9C3FF]">Titre</th>
                <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#B9C3FF]">Auteur</th>
                <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#B9C3FF]">Date</th>
                <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wide text-[#B9C3FF]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {recents.map((m) => (
                <tr key={m.id} className="transition-colors hover:bg-white/5">
                  <td className="px-5 py-4">
                    <p className="line-clamp-1 text-sm font-bold text-white">{m.titre}</p>
                    <p className="text-xs font-semibold text-[var(--color-accent)]">{m.filiere?.nom}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-[#B9C3FF]">{nomAuteur(m)}</td>
                  <td className="px-5 py-4 text-sm italic text-[#B9C3FF]">{formatDate(m.created_at)}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => navigate(`/admin/memoires/${m.id}`)}
                      className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-bold text-[var(--color-primary)] shadow-sm transition-all hover:opacity-90 active:scale-95"
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