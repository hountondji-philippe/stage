import HeroSection from '../components/HeroSection';
import SearchSection from '../components/SearchSection';
import MemoireGrid from '../components/MemoireGrid';
import ResultHeader from '../components/ResultHeader';
import { useRecherche } from '../hooks/useRecherche';

export default function SearchPage() {
  const { memoires, filieres, loading, handleSearch } = useRecherche();

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-20">
      <HeroSection />
      <SearchSection onSearch={handleSearch} filieres={filieres} />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <ResultHeader count={memoires.length} />
        {loading ? (
          <div className="text-center py-10">Chargement...</div>
        ) : (
          <MemoireGrid memoires={memoires} />
        )}
      </section>
    </main>
  );
}