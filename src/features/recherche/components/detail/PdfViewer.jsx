import { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FileText, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ fichierUrl, nomFichier }) {
  const [numPages, setNumPages] = useState(null);
  const [echelle, setEchelle] = useState(1.1);
  const [pleinEcran, setPleinEcran] = useState(false);
  const conteneurRef = useRef(null);

  const basculerPleinEcran = async () => {
    if (!document.fullscreenElement) {
      await conteneurRef.current?.requestFullscreen?.();
      setPleinEcran(true);
    } else {
      await document.exitFullscreen?.();
      setPleinEcran(false);
    }
  };

  return (
    <div
      ref={conteneurRef}
      className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-[0_8px_30px_rgba(19,36,107,0.08)]"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-gradient-to-r from-[var(--color-bg)] to-white px-4 py-3.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
            <FileText size={18} className="text-[var(--color-primary)]" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-700">{nomFichier}</p>
            {numPages && (
              <p className="text-xs text-gray-400">{numPages} page{numPages > 1 ? "s" : ""}</p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 rounded-full border border-gray-100 bg-gray-50/80 p-1">
          <button
            onClick={() => setEchelle((e) => Math.max(0.6, e - 0.15))}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-white hover:text-[var(--color-primary)] hover:shadow-sm"
            aria-label="Zoom arrière"
          >
            <ZoomOut size={17} />
          </button>
          <span className="w-10 select-none text-center text-xs font-medium tabular-nums text-gray-400">
            {Math.round(echelle * 100)}%
          </span>
          <button
            onClick={() => setEchelle((e) => Math.min(2.2, e + 0.15))}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-white hover:text-[var(--color-primary)] hover:shadow-sm"
            aria-label="Zoom avant"
          >
            <ZoomIn size={17} />
          </button>
          <div className="mx-1 h-5 w-px bg-gray-200" />
          <button
            onClick={basculerPleinEcran}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-white hover:text-[var(--color-primary)] hover:shadow-sm"
            aria-label={pleinEcran ? "Quitter le plein écran" : "Plein écran"}
          >
            {pleinEcran ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>
        </div>
      </div>

      <div
        className={`flex w-full flex-col items-center gap-4 overflow-auto bg-[repeating-linear-gradient(135deg,#eef0f6_0px,#eef0f6_1px,#f4f5f9_1px,#f4f5f9_14px)] px-3 py-6 sm:px-6 ${pleinEcran ? "h-[calc(100vh-72px)]" : "h-[500px] sm:h-[700px] md:h-[800px]"}`}
      >
        <Document
          file={fichierUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={
            <div className="flex flex-col items-center gap-3 py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)]/20 border-t-[var(--color-primary)]" />
              <p className="text-sm text-gray-400">Chargement du document...</p>
            </div>
          }
          error={<p className="py-16 text-sm text-red-500">Impossible de charger le document.</p>}
        >
          {numPages &&
            Array.from({ length: numPages }, (_, index) => (
              <Page
                key={index + 1}
                pageNumber={index + 1}
                scale={echelle}
                devicePixelRatio={Math.max(window.devicePixelRatio || 1, 2)}
                renderAnnotationLayer={false}
                className="overflow-hidden rounded-sm shadow-[0_2px_12px_rgba(19,36,107,0.12)] ring-1 ring-black/5"
              />
            ))}
        </Document>
      </div>
    </div>
  );
}