import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../../../../components/ui/StatusBadge";

function nomAuteur(m) {
  const etudiant = m.user?.etudiantAutorise ?? m.user?.etudiant_autorise;
  return etudiant ? `${etudiant.nom} ${etudiant.prenom}` : m.user?.email ?? "—";
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function MemoiresListeRow({ m, onDeleteClick }) {
  const navigate = useNavigate();

  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="p-4">
        <span className="text-sm font-semibold text-gray-900">{m.titre}</span>
      </td>
      <td className="p-4 text-sm text-gray-600">{nomAuteur(m)}</td>
      <td className="p-4 text-sm text-gray-600">{m.filiere?.nom}</td>
      <td className="p-4 text-sm text-gray-600">{formatDate(m.created_at)}</td>
      <td className="p-4 text-center">
        <StatusBadge status={m.statut} />
      </td>
      <td className="p-4 text-right">
        <div className="flex items-center justify-end gap-2">
          {m.statut === "en_attente" ? (
            <button
              onClick={() => navigate(`/admin/memoires/${m.id}`, { state: { memoire: m } })}
              className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-light)]"
            >
              Examiner
            </button>
          ) : (
            <button
              onClick={() => navigate(`/admin/memoires/${m.id}`, { state: { memoire: m } })}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            >
              Consulter
            </button>
          )}
          <button
            onClick={() => onDeleteClick(m)}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label="Supprimer"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
