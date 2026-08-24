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
      className="overflow-hidden rounded-2xl border border-gray-800/40 bg-slate-900 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-3.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <FileText size={18} className="text-white/80" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white/90">{nomFichier}</p>
            {numPages && (
              <p className="text-xs text-white/40">{numPages} page{numPages > 1 ? "s" : ""}</p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => setEchelle((e) => Math.max(0.6, e - 0.15))}
            className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Zoom arrière"
          >
            <ZoomOut size={17} />
          </button>
          <span className="w-10 select-none text-center text-xs font-medium tabular-nums text-white/50">
            {Math.round(echelle * 100)}%
          </span>
          <button
            onClick={() => setEchelle((e) => Math.min(2.2, e + 0.15))}
            className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Zoom avant"
          >
            <ZoomIn size={17} />
          </button>
          <div className="mx-1 h-5 w-px bg-white/10" />
          <button
            onClick={basculerPleinEcran}
            className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={pleinEcran ? "Quitter le plein écran" : "Plein écran"}
          >
            {pleinEcran ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>
        </div>
      </div>

      <div
        className={`w-full overflow-auto bg-slate-800 px-3 py-6 sm:px-6 ${pleinEcran ? "h-[calc(100vh-72px)]" : "h-[500px] sm:h-[700px] md:h-[800px]"}`}
      >
        <Document
          file={fichierUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          className="flex w-full flex-col items-center gap-4"
          loading={
            <div className="flex flex-col items-center gap-3 py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
              <p className="text-sm text-white/40">Chargement du document...</p>
            </div>
          }
          error={<p className="py-16 text-sm text-red-400">Impossible de charger le document.</p>}
        >
          {numPages &&
            Array.from({ length: numPages }, (_, index) => (
              <Page
                key={index + 1}
                pageNumber={index + 1}
                scale={echelle}
                devicePixelRatio={Math.max(window.devicePixelRatio || 1, 2)}
                renderAnnotationLayer={false}
                className="overflow-hidden rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              />
            ))}
        </Document>
      </div>
    </div>
  );
}