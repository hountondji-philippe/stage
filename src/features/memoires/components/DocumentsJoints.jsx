import { FileText, Eye, Download, ImageIcon } from "lucide-react";

const STORAGE_URL =
  (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "") + "/storage/";

const buildUrl = (path) => (path ? `${STORAGE_URL}${path}` : null);

function DocumentCard({ label, path, icon: Icon = FileText, isImage = false }) {
  if (!path) return null;
  const url = buildUrl(path);

  return (
    <div className="group flex items-center justify-between rounded-xl border border-gray-200 p-4 transition-colors hover:border-[var(--color-primary-light)]">
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded ${
            isImage ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"
          }`}
        >
          <Icon size={24} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-800">{label}</p>
          <p className="text-xs text-gray-400">{isImage ? "Image" : "PDF"}</p>
        </div>
      </div>
      <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <a href={url} target="_blank" rel="noreferrer" className="rounded-full p-2 text-[var(--color-primary)] hover:bg-gray-100">
          <Eye size={18} />
        </a>
        <a href={url} download className="rounded-full p-2 text-[var(--color-primary)] hover:bg-gray-100">
          <Download size={18} />
        </a>
      </div>
    </div>
  );
}

export default function DocumentsJoints({ memoire }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-[var(--color-primary)]">
        <FileText size={20} />
        Documents joints
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DocumentCard label="Mémoire complet" path={memoire.fichier_memoire} />
        <DocumentCard label="Preuve de dépôt" path={memoire.fichier_preuve} />
        {memoire.apercu && <DocumentCard label="Aperçu" path={memoire.apercu} icon={ImageIcon} isImage />}
      </div>
    </section>
  );
}