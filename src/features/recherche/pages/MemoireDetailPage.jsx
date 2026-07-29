import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import PdfViewer from "../components/detail/PdfViewer";
import InfoCard from "../components/detail/InfoCard";
import SimilarMemoires from "../components/detail/SimilarMemoires";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import { useMemoireDetail } from "../hooks/useMemoireDetail";
import { getFichierUrlSigne, getTelechargerUrl } from "../api/rechercheApi";
import { ROUTES } from "../../../router/paths";

export default function MemoireDetailPage() {
  const { id } = useParams();
  const { memoire, similaires, loading, error } = useMemoireDetail(id);
  const [fichierUrlSigne, setFichierUrlSigne] = useState(null);
  const [chargementFichier, setChargementFichier] = useState(true);

  useEffect(() => {
    if (!memoire) return;

    let annule = false;
    setChargementFichier(true);

    getFichierUrlSigne(id)
      .then((url) => {
        if (!annule) setFichierUrlSigne(url);
      })
      .catch(() => {
        if (!annule) setFichierUrlSigne(null);
      })
      .finally(() => {
        if (!annule) setChargementFichier(false);
      });

    return () => {
      annule = true;
    };
  }, [id, memoire]);

  if (loading) {
    return <LoadingScreen message="Chargement du mémoire..." />;
  }

  if (error || !memoire) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 pt-20 text-center">
        <p className="text-red-600">{error || "Ce mémoire est introuvable."}</p>
        <Link to={ROUTES.archive} className="text-[var(--color-primary)] hover:underline">
          Retour à l'archive
        </Link>
      </main>
    );
  }

  const nomFichier = memoire.fichier_memoire?.split("/").pop() || "memoire.pdf";

  return (
    <main className="mx-auto w-full max-w-[1280px] flex-grow px-4 py-8 md:px-10">
      <nav className="mb-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-2 text-sm text-gray-400">
        <Link to={ROUTES.accueil} className="transition-colors hover:text-[var(--color-primary)]">
          Accueil
        </Link>
        <ChevronRight size={14} />
        <Link to={ROUTES.archive} className="transition-colors hover:text-[var(--color-primary)]">
          Archive de mémoires
        </Link>
        <ChevronRight size={14} />
        <span className="max-w-[200px] truncate text-gray-600 md:max-w-none">{memoire.titre}</span>
      </nav>

      <div className="flex flex-col-reverse gap-6 md:flex-row">
        <div className="flex w-full flex-col gap-6 md:w-[65%]">
          {chargementFichier ? (
            <div className="flex h-[500px] w-full items-center justify-center rounded-xl border border-gray-100 bg-white sm:h-[700px] md:h-[800px]">
              <p className="text-sm text-gray-400">Chargement du document...</p>
            </div>
          ) : fichierUrlSigne ? (
            <PdfViewer
              fichierUrl={fichierUrlSigne}
              telechargerUrl={getTelechargerUrl(id)}
              nomFichier={nomFichier}
            />
          ) : (
            <div className="flex h-[500px] w-full items-center justify-center rounded-xl border border-gray-100 bg-white sm:h-[700px] md:h-[800px]">
              <p className="text-sm text-red-500">Impossible de charger le document.</p>
            </div>
          )}
        </div>
        <InfoCard memoire={memoire} telechargerUrl={getTelechargerUrl(id)} />
      </div>

      <SimilarMemoires memoires={similaires} filiereNom={memoire.filiere?.nom} />
    </main>
  );
}