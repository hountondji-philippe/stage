import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import RecentMemoiresSection from "../components/RecentMemoiresSection";
import HowItWorksSection from "../components/HowItWorksSection";
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

      {/* 3. Mémoires Récents */}
      {recentes && recentes.length > 0 && (
        <RecentMemoiresSection memoires={recentes} />
      )}

      {/* 4. Processus */}
      <HowItWorksSection />

      {/* 5. CTA Final */}
      <CtaFinalSection />
    </main>
  );
}