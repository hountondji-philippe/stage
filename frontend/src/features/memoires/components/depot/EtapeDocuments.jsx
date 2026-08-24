import { FileUp } from "lucide-react";
import Button from "../../../../components/ui/Button";
import FileDropzone from "./FileDropzone";

export default function EtapeDocuments({ files, errors, onFileChange, onPrev, onNext }) {
  const canGoNext = Boolean(files.memoire);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(19,36,107,0.06)]">
        <div className="flex items-center gap-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] px-5 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
            <FileUp size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Document à joindre</p>
            <p className="text-xs text-white/70">Mémoire complet</p>
          </div>
        </div>

        <div className="space-y-8 p-5 md:p-8">
          <FileDropzone
            label="Mémoire complet (PDF)"
            hint="PDF uniquement, 20 Mo maximum"
            maxSizeMo={20}
            file={files.memoire}
            error={errors.memoire}
            onFileSelect={(file, error) => onFileChange("memoire", file, error)}
            onFileRemove={() => onFileChange("memoire", null, null)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <Button variant="outline" onClick={onPrev}>
          Précédent
        </Button>
        <Button variant="primary" disabled={!canGoNext} onClick={onNext}>
          Suivant
        </Button>
      </div>
    </div>
  );
}