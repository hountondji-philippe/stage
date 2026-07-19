import HeroSection from '../components/HeroSection';
import SearchSection from '../components/SearchSection';
import MemoireGrid from '../components/MemoireGrid';
import ResultHeader from '../components/ResultHeader';
import Pagination from '../components/Pagination';
import LoadingScreen from '../../../components/ui/LoadingScreen';
import { useRecherche } from '../hooks/useRecherche';

export default function SearchPage() {
  const { memoires, filieres, meta, activeFilters, loading, handleSearch, goToPage, changeSort } = useRecherche();

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <HeroSection />
      <SearchSection onSearch={handleSearch} filieres={filieres} />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <ResultHeader
          count={meta?.total ?? memoires.length}
          sort={activeFilters.tri || "recent"}
          onSortChange={changeSort}
        />
        {loading ? (
          <div className="relative min-h-[400px]">
            <LoadingScreen fullScreen={false} message="Recherche en cours..." />
          </div>
        ) : (
          <>
            <MemoireGrid memoires={memoires} />
            <Pagination meta={meta} onPageChange={goToPage} />
          </>
        )}
      </section>
    </main>
  );
}