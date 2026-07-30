import { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FileText, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ fichierUrl, nomFichier }) {
  const [numPages, setNumPages] = useState(null);
  const [pageActuelle, setPageActuelle] = useState(1);
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
      className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0px_4px_20px_rgba(19,36,107,0.05)]"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between border-b border-gray-100 bg-[var(--color-bg)] px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <FileText size={20} className="shrink-0 text-[var(--color-primary)]" />
          <span className="truncate text-sm font-medium text-gray-600">{nomFichier}</span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => setEchelle((e) => Math.max(0.6, e - 0.15))}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Zoom arrière"
          >
            <ZoomOut size={18} />
          </button>
          <button
            onClick={() => setEchelle((e) => Math.min(2.2, e + 0.15))}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Zoom avant"
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={basculerPleinEcran}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            aria-label={pleinEcran ? "Quitter le plein écran" : "Plein écran"}
          >
            {pleinEcran ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      <div className={`flex w-full items-center justify-center overflow-auto bg-gray-100 ${pleinEcran ? "h-[calc(100vh-64px)]" : "h-[500px] sm:h-[700px] md:h-[800px]"}`}>
        <Document
          file={fichierUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<p className="text-sm text-gray-400">Chargement du document...</p>}
          error={<p className="text-sm text-red-500">Impossible de charger le document.</p>}
        >
          <Page pageNumber={pageActuelle} scale={echelle} renderAnnotationLayer={false} />
        </Document>
      </div>

      {numPages && (
        <div className="flex items-center justify-center gap-4 border-t border-gray-100 py-3">
          <button
            disabled={pageActuelle <= 1}
            onClick={() => setPageActuelle((p) => p - 1)}
            className="disabled:opacity-30"
            aria-label="Page précédente"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm text-gray-500">
            Page {pageActuelle} / {numPages}
          </span>
          <button
            disabled={pageActuelle >= numPages}
            onClick={() => setPageActuelle((p) => p + 1)}
            className="disabled:opacity-30"
            aria-label="Page suivante"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}