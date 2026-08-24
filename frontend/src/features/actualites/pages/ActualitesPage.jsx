import { Megaphone } from "lucide-react";
import ActualitesHero from "../components/ActualitesHero";
import ActualitesFilterBar from "../components/ActualitesFilterBar";
import { ActualiteCard } from "../components/ActualiteCard";
import ActualitesAcademiques from "../../accueil/components/ActualitesAcademiques";
import { useActualites } from "../hooks/useActualites";

export default function ActualitesPage() {
  const {
    actualites,
    total,
    loading,
    error,
    recherche,
    setRecherche,
    dateDebut,
    setDateDebut,
    dateFin,
    setDateFin,
    tri,
    setTri,
    reinitialiser,
  } = useActualites();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <ActualitesHero />

      <ActualitesAcademiques />

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:px-10">
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">Toutes les actualités</h2>
          <p className="text-sm text-gray-400">
            {total} actualité{total > 1 ? "s" : ""} au total
          </p>
        </div>

        <ActualitesFilterBar
          recherche={recherche}
          onRechercheChange={setRecherche}
          dateDebut={dateDebut}
          onDateDebutChange={setDateDebut}
          dateFin={dateFin}
          onDateFinChange={setDateFin}
          tri={tri}
          onTriChange={setTri}
          onReset={reinitialiser}
        />

        {loading && <div className="py-10 text-center text-gray-400">Chargement...</div>}

        {!loading && error && (
          <div className="rounded-2xl bg-red-50 p-10 text-center text-red-600">{error}</div>
        )}

        {!loading && !error && actualites.length === 0 && (
          <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <Megaphone size={40} className="mb-4 text-gray-300" />
            <p className="text-gray-500">Aucune actualité ne correspond à votre recherche.</p>
          </div>
        )}

        {!loading && !error && actualites.length > 0 && (
          <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {actualites.map((actualite) => (
              <ActualiteCard key={actualite.id} {...actualite} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}