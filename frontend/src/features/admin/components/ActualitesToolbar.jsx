import { Plus } from "lucide-react";
import Button from "../../../components/ui/Button";

export default function ActualitesToolbar({ onAddClick }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-extrabold text-[var(--color-primary)] md:text-3xl">Actualités</h2>
        <p className="text-gray-500">Gérez les actualités affichées sur la page d'accueil.</p>
      </div>
      <Button variant="primary" onClick={onAddClick}>
        <Plus className="h-4 w-4" />
        Ajouter une actualité
      </Button>
    </div>
  );
}