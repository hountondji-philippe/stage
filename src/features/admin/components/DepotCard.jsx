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

export default function DepotCard({ m }) {
  const urgent = estUrgent(m.created_at);
  const etudiant = m.user?.etudiantAutorise ?? m.user?.etudiant_autorise;
  const nomComplet = etudiant ? `${etudiant.nom} ${etudiant.prenom}` : m.user?.email ?? "—";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          {urgent && (
            <div className="flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-red-600" />
              <span className="text-xs font-bold uppercase text-red-600">Urgent</span>
            </div>
          )}
          <h3 className="text-sm font-semibold text-gray-900">{m.titre}</h3>
          <p className="text-xs text-gray-500">
            {nomComplet} • {m.filiere?.nom}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-orange-100 px-2 py-1 text-[10px] font-bold text-orange-700">
          Attente
        </span>
      </div>

      <p className="mb-4 text-xs text-gray-500">Déposé le {formatDate(m.created_at)}</p>

      <a
        href={`/admin/memoires/${m.id}`}
        className="block w-full rounded-lg bg-[var(--color-primary)] py-3 text-center text-sm font-bold text-white"
      >
        Examiner le dossier
      </a>
    </div>
  );
}
