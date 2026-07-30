import { Search, Upload, CheckCircle2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useFilieres } from "../hooks/useFilieres";

export default function EtudiantsToolbar({
  search,
  onSearchChange,
  filiere,
  onFiliereChange,
  onImportClick,
  onAddClick,
}) {
  const { filieres } = useFilieres();

  return (
    <div className="flex flex-col flex-wrap items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center">
      <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex-1">
        <div className="relative w-full sm:w-80 lg:max-w-xs lg:flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher par nom, matricule ou email..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
          />
        </div>

        <select
          value={filiere}
          onChange={(e) => onFiliereChange(e.target.value)}
          className="w-full shrink-0 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-[var(--color-primary)] sm:w-auto"
        >
          <option value="">Toutes les filières</option>
          {filieres.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nom}
            </option>
          ))}
        </select>
      </div>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <Button variant="outline" fullWidth onClick={onImportClick} className="sm:w-auto">
          <Upload size={18} />
          Importer
        </Button>
        <Button variant="accent" fullWidth onClick={onAddClick} className="sm:w-auto">
          <CheckCircle2 size={18} />
          Valider l'année
        </Button>
      </div>
    </div>
  );
}