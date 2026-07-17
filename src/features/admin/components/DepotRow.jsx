import { AlertTriangle } from "lucide-react";

function estUrgent(createdAt) {
  if (!createdAt) return false;
  const joursEcoules = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
  return joursEcoules > 15;
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DepotRow({ m }) {
  const urgent = estUrgent(m.created_at);
  const etudiant = m.user?.etudiantAutorise ?? m.user?.etudiant_autorise;
  const nomComplet = etudiant ? `${etudiant.nom} ${etudiant.prenom}` : m.user?.email ?? "—";

  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="p-4">
        <div className="flex items-start gap-3">
          {urgent && <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-600" />}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-900">{m.titre}</span>
            {urgent && (
              <span className="w-fit rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600">
                Urgent (&gt; 15 jours)
              </span>
            )}
          </div>
        </div>
      </td>
      <td className="p-4 text-sm text-gray-600">{nomComplet}</td>
      <td className="p-4 text-sm text-gray-600">{m.filiere?.nom}</td>
      <td className="p-4 text-sm text-gray-600">{formatDate(m.created_at)}</td>
      <td className="p-4 text-center">
        <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
          En attente
        </span>
      </td>
      <td className="p-4 text-right">
        <a
          href={`/admin/memoires/${m.id}`}
          className="inline-flex items-center rounded-lg bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-light)]"
        >
          Examiner
        </a>
      </td>
    </tr>
  );
}
