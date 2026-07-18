import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import FilieresEnVedette from "../components/FilieresEnVedette";
import RecentMemoiresSection from "../components/RecentMemoiresSection";
import TopMemoiresConsultes from "../components/TopMemoiresConsultes";
import PourquoiChoisir from "../components/PourquoiChoisir";
import HowItWorksSection from "../components/HowItWorksSection";
import ActualitesAcademiques from "../components/ActualitesAcademiques";
import CtaFinalSection from "../components/CtaFinalSection";
import { useAccueilData } from "../hooks/useAccueilData";
import { LoadingSpinner } from "../../../components/ui/LoadingSpinner"; // Supposé existant

export default function AccueilPage() {
  const { stats, recentes, loading, error } = useAccueilData();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Une erreur est survenue lors du chargement des données.
      </div>
    );
  }

  return (
    <main className="flex flex-col">
      {/* 1. Hero : Barre de recherche & Image fond */}
      <HeroSection />

      {/* 2. Stats : Connecté au backend via stats() */}
      <StatsSection stats={stats} />

      {/* 3. Filières en vedette (contenu statique, frontend uniquement) */}
      <FilieresEnVedette />

      {/* 4. Mémoires Récents */}
      {recentes && recentes.length > 0 && (
        <RecentMemoiresSection memoires={recentes} />
      )}

      {/* 5. Top mémoires consultés (contenu statique, frontend uniquement) */}
      <TopMemoiresConsultes />

      {/* 6. Pourquoi choisir MÉMOIRES+ (contenu statique, frontend uniquement) */}
      <PourquoiChoisir />

      {/* 7. Processus */}
      <HowItWorksSection />

      {/* 8. Actualités académiques (contenu statique, frontend uniquement) */}
      <ActualitesAcademiques />

      {/* 9. CTA Final */}
      <CtaFinalSection />
    </main>
  );
}