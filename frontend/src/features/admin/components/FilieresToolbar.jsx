import { Plus } from "lucide-react";
import Button from "../../../components/ui/Button";

export default function FilieresToolbar({ onAddClick }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-extrabold text-[var(--color-primary)] md:text-3xl">
          Filières
        </h2>
        <p className="text-gray-500">Gérez les filières et leurs sous-filières.</p>
      </div>
      <Button variant="primary" onClick={onAddClick}>
        <Plus className="h-4 w-4" />
        Ajouter une filière
      </Button>
    </div>
  );
}