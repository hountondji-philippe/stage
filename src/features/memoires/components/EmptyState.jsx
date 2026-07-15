import { FilePlus2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { ROUTES } from "../../../router/paths";

/**
 * Affiché quand l'étudiant n'a encore aucun dépôt.
 * "Une invitation à agir" plutôt qu'un simple message d'absence de données.
 */
export default function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-20 text-center shadow-[0_4px_20px_rgba(19,36,107,0.06)]">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)]/15">
        <FilePlus2 size={30} className="text-[var(--color-accent)]" strokeWidth={2} />
      </div>
      <h3 className="mb-2 text-lg font-bold text-[var(--color-primary)]">
        Aucun dépôt pour le moment
      </h3>
      <p className="mb-6 max-w-sm text-sm text-gray-500">
        Déposez votre mémoire pour lancer le suivi de validation par l'administration.
      </p>
      <Button variant="accent" onClick={() => navigate(ROUTES.depotEtudiant)}>
        Déposer mon premier mémoire
      </Button>
    </div>
  );
}