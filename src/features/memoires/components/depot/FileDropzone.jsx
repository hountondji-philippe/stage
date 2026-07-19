import { useRef, useState } from "react";
import { UploadCloud, FileText, Image as ImageIcon, X } from "lucide-react";

function formatSize(bytes) {
  if (!bytes) return "";
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

/**
 * Zone drag & drop réutilisable pour un fichier unique.
 * `file` peut être un objet File natif, ou { name, existing: true }
 * pour représenter un fichier déjà déposé (mode modification).
 *
 * @param {string[]} typesAcceptes - MIME types acceptés (défaut : PDF uniquement)
 */
export default function FileDropzone({
  label,
  hint,
  file,
  maxSizeMo,
  error,
  onFileSelect,
  onFileRemove,
  typesAcceptes = ["application/pdf"],
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const estImage = typeof file?.type === "string" && file.type.startsWith("image/");

  function handleFiles(fileList) {
    const selected = fileList?.[0];
    if (!selected) return;

    if (!typesAcceptes.includes(selected.type)) {
      const libelles = typesAcceptes.includes("application/pdf") && typesAcceptes.length > 1
        ? "Seuls les fichiers PDF ou image (JPG, PNG) sont acceptés."
        : "Seuls les fichiers PDF sont acceptés.";
      onFileSelect(null, libelles);
      return;
    }
    if (maxSizeMo && selected.size > maxSizeMo * 1024 * 1024) {
      onFileSelect(null, `Le fichier dépasse la taille maximale de ${maxSizeMo} Mo.`);
      return;
    }
    onFileSelect(selected, null);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[var(--color-text)]">{label}</label>

      {!file && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
            dragOver
              ? "border-[var(--color-primary-light)] bg-[var(--color-primary)]/5"
              : "border-gray-300 bg-[var(--color-bg)] hover:bg-gray-100"
          }`}
        >
          <UploadCloud size={36} className="mb-2 text-gray-400" />
          <p className="text-sm font-medium text-[var(--color-text)]">
            Cliquez pour téléverser ou glissez-déposez
          </p>
          <p className="mt-1 text-xs text-gray-400">{hint}</p>
          <input
            ref={inputRef}
            type="file"
            accept={typesAcceptes.join(",")}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}

      {file && (
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded ${
                estImage ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"
              }`}
            >
              {estImage ? <ImageIcon size={20} /> : <FileText size={20} />}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[var(--color-text)]">{file.name}</p>
              <p className="text-xs text-gray-400">
                {file.existing ? "Fichier déjà déposé" : formatSize(file.size)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onFileRemove}
            className="shrink-0 text-gray-400 hover:text-red-600"
            aria-label="Retirer le fichier"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}