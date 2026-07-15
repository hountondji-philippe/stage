import { useRef } from "react";
import { UploadCloud, Download } from "lucide-react";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import { useImportEtudiants } from "../hooks/useImportEtudiants";

export default function ImportModal({ open, onClose, onImported }) {
  const inputRef = useRef(null);
  const { file, selectFile, reset, submit, error, loading } = useImportEtudiants({
    onSuccess: () => {
      onImported?.();
      onClose();
    },
  });

  function handleClose() {
    reset();
    onClose();
  }

  function handleDrop(e) {
    e.preventDefault();
    selectFile(e.dataTransfer.files?.[0]);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Importer une liste"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" disabled={!file} loading={loading} onClick={submit}>
            Confirmer l'import
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-transform group-hover:scale-110">
            <UploadCloud size={32} />
          </div>
          <div className="text-center">
            <p className="text-base font-bold text-gray-900">
              {file ? file.name : "Cliquez ou glissez votre fichier ici"}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Formats acceptés : .xlsx, .csv (Max. 5 Mo)
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.csv"
            className="hidden"
            onChange={(e) => selectFile(e.target.files?.[0])}
          />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <Download size={20} className="text-[var(--color-primary)]" />
            <span className="text-sm font-medium text-gray-900">Besoin d'aide ?</span>
          </div>
          <a
            href="/modeles/modele-etudiants-autorises.xlsx"
            className="text-sm font-bold text-[var(--color-primary)] hover:underline"
          >
            Télécharger le modèle Excel
          </a>
        </div>

        <div className="space-y-2">
          <p className="px-1 text-sm font-bold text-gray-600">
            {file ? "Fichier prêt à être importé" : "Aperçu (0 ligne détectée)"}
          </p>
          <div className="flex h-24 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-sm italic text-gray-500">
            {file ? file.name : "Sélectionnez un fichier pour voir l'aperçu"}
          </div>
        </div>
      </div>
    </Modal>
  );
}
