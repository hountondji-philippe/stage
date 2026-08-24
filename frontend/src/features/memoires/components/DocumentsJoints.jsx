import { useState } from "react";
import { FileText, Eye, Download, ImageIcon, Loader2 } from "lucide-react";
import { apiClient } from "../../../lib/apiClient";

async function recupererBlobUrl(route) {
  const { data } = await apiClient.get(route, { responseType: "blob" });
  return URL.createObjectURL(data);
}

function DocumentCard({ label, disponible, icon: Icon = FileText, isImage = false, routeConsulter, routeTelecharger, nomTelecharge }) {
  const [chargement, setChargement] = useState(null); // "voir" | "telecharger" | null

  if (!disponible) return null;

  async function handleVoir() {
    setChargement("voir");
    try {
      const blobUrl = await recupererBlobUrl(routeConsulter);
      window.open(blobUrl, "_blank");
    } catch {
      alert("Impossible d'ouvrir ce document.");
    } finally {
      setChargement(null);
    }
  }

  async function handleTelecharger() {
    setChargement("telecharger");
    try {
      const blobUrl = await recupererBlobUrl(routeTelecharger || routeConsulter);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = nomTelecharge || label;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      alert("Impossible de télécharger ce document.");
    } finally {
      setChargement(null);
    }
  }

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
        <button
          onClick={handleVoir}
          disabled={chargement !== null}
          className="rounded-full p-2 text-[var(--color-primary)] hover:bg-gray-100 disabled:opacity-50"
          aria-label="Consulter"
        >
          {chargement === "voir" ? <Loader2 size={18} className="animate-spin" /> : <Eye size={18} />}
        </button>
        <button
          onClick={handleTelecharger}
          disabled={chargement !== null}
          className="rounded-full p-2 text-[var(--color-primary)] hover:bg-gray-100 disabled:opacity-50"
          aria-label="Télécharger"
        >
          {chargement === "telecharger" ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
        </button>
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
        <DocumentCard
          label="Mémoire complet"
          disponible={Boolean(memoire.fichier_memoire)}
          routeConsulter={`/mes-memoires/${memoire.id}/fichier/memoire`}
          routeTelecharger={`/mes-memoires/${memoire.id}/telecharger/memoire`}
          nomTelecharge="memoire.pdf"
        />
        <DocumentCard
          label="Aperçu"
          disponible={Boolean(memoire.apercu)}
          icon={ImageIcon}
          isImage
          routeConsulter={`/memoires/${memoire.id}/apercu`}
          nomTelecharge="apercu.jpg"
        />
      </div>
    </section>
  );
}