import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import StatusBadge from "../../../components/ui/StatusBadge";
import { ROUTES } from "../../../router/paths";

const ACCENTS = [
  "var(--color-primary-light)",
  "var(--color-primary)",
  "var(--color-accent)",
];

export default function MemoireCard({ memoire, index = 0 }) {
  const navigate = useNavigate();
  const accentColor = ACCENTS[index % ACCENTS.length];

  return (
    <div
      className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(19,36,107,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(19,36,107,0.08)]"
      style={{ borderTop: `4px solid ${accentColor}` }}
    >
      <div className="mb-4 flex items-start justify-between">
        <StatusBadge statut={memoire.statut} />
        <span className="text-xs text-gray-400">{memoire.annee}</span>
      </div>

      <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-[var(--color-primary)]">
        {memoire.titre}
      </h3>
      <p className="mb-2 text-sm text-gray-600">
        Par <span className="font-semibold">{memoire.auteur}</span>
      </p>
      <div className="mb-6 text-sm font-semibold text-[var(--color-primary-light)]">
        {memoire.filiere}
      </div>

      <div className="mt-auto">
        <Button
          variant="outline"
          fullWidth
          onClick={() => navigate(ROUTES.memoirePublic(memoire.id))}
        >
          Consulter
        </Button>
      </div>
    </div>
  );
}