import { Download, Maximize2, Minimize2 } from "lucide-react";
import { usePdfViewer } from "../hooks/usePdfViewer";

export default function DepotDetailPdfViewer({ memoireId, isFullscreen, onToggleFullscreen }) {
  const { blobUrl, loading, error, downloadCurrent } = usePdfViewer(memoireId);

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${
        isFullscreen ? "h-[calc(100vh-112px)]" : "h-[520px]"
      }`}
    >
      {/* Barre d'actions */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3 md:px-6 md:py-4">
        <span className="text-sm font-semibold text-gray-700">Mémoire (PDF)</span>

        <div className="flex items-center gap-1">
          <button
            onClick={downloadCurrent}
            disabled={!blobUrl}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/10 disabled:opacity-40 md:px-3"
          >
            <Download size={18} />
            <span className="hidden md:inline">Télécharger</span>
          </button>

          <button
            onClick={onToggleFullscreen}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-200"
            aria-label={isFullscreen ? "Réduire la visionneuse" : "Agrandir la visionneuse"}
            title={isFullscreen ? "Réduire" : "Agrandir"}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex-1 bg-gray-100">
        {loading && (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Chargement du document...
          </div>
        )}
        {error && (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-red-600">
            {error}
          </div>
        )}
        {!loading && !error && blobUrl && (
          <iframe title="Document PDF" src={blobUrl} className="h-full w-full" />
        )}
      </div>
    </div>
  );
}