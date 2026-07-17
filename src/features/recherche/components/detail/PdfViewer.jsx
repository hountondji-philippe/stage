import { FileText, Download, Maximize2 } from "lucide-react";

export default function PdfViewer({ fichierUrl, telechargerUrl, nomFichier }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0px_4px_20px_rgba(19,36,107,0.05)]">
      <div className="flex items-center justify-between border-b border-gray-100 bg-[var(--color-bg)] px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <FileText size={20} className="shrink-0 text-[var(--color-primary)]" />
          <span className="truncate text-sm font-medium text-gray-600">{nomFichier}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          
           <a  href={telechargerUrl}
            className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 sm:px-4 sm:text-sm"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Télécharger</span>
          </a>
          
           <a  href={fichierUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Ouvrir en plein écran"
          >
            <Maximize2 size={18} />
          </a>
        </div>
      </div>

      <iframe
        src={fichierUrl}
        title={nomFichier}
        className="h-[500px] w-full sm:h-[700px] md:h-[800px]"
      />
    </div>
  );
}