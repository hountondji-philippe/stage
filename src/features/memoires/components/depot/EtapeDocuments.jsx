import Button from "../../../../components/ui/Button";
import FileDropzone from "./FileDropzone";

export default function EtapeDocuments({ files, errors, onFileChange, onPrev, onNext }) {
  const canGoNext = Boolean(files.memoire && files.preuve);

  return (
    <div className="rounded-xl bg-white p-6 shadow-[0_4px_20px_rgba(19,36,107,0.08)] md:p-8">
      <div className="space-y-8">
        <FileDropzone
          label="Mémoire complet (PDF)"
          hint="PDF uniquement, 20 Mo maximum"
          maxSizeMo={20}
          file={files.memoire}
          error={errors.memoire}
          onFileSelect={(file, error) => onFileChange("memoire", file, error)}
          onFileRemove={() => onFileChange("memoire", null, null)}
        />
        <FileDropzone
          label="Preuve de soutenance (PDF ou image)"
          hint="PDF ou image (JPG, PNG), 5 Mo maximum"
          maxSizeMo={5}
          typesAcceptes={["application/pdf", "image/jpeg", "image/png"]}
          file={files.preuve}
          error={errors.preuve}
          onFileSelect={(file, error) => onFileChange("preuve", file, error)}
          onFileRemove={() => onFileChange("preuve", null, null)}
        />
      </div>

      <div className="mt-10 flex flex-col gap-4 md:flex-row md:justify-between">
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