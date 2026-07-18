import { useEffect, useState } from "react";
import { ActualiteCard } from "./ActualiteCard";
import { getActualites } from "../../admin/api/actualitesApi";

export default function ActualitesAcademiques() {
  const [actualites, setActualites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    getActualites()
      .then((data) => {
        if (mounted) setActualites(data);
      })
      .catch(() => {
        if (mounted) setError("Impossible de charger les actualités.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Le défilement en boucle n'a de sens que s'il y a assez d'actualités
  // pour remplir visuellement la bande ; en dessous, on affiche juste la liste statique.
  const bouclageActif = actualites.length >= 3;
  const actusAffichees = bouclageActif ? [...actualites, ...actualites] : actualites;

  return (
    <section className="overflow-hidden bg-[var(--color-bg)] py-20 lg:py-24">
      {bouclageActif && (
        <style>{`
          @keyframes scroll-loop-actualites {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .scroll-loop-actualites {
            animation: scroll-loop-actualites 30s linear infinite;
          }
          .scroll-loop-actualites:hover {
            animation-play-state: paused;
          }
        `}</style>
      )}

      <div className="mx-auto mb-10 max-w-6xl px-6 md:mb-14 md:px-10">
        <div className="mb-4 flex items-center gap-3">
          <h2 className="text-2xl font-extrabold text-[var(--color-primary)] md:text-3xl">
            Actualités académiques
          </h2>
          <span className="hidden h-1 w-16 rounded-full bg-[var(--color-accent)] md:block" />
        </div>
        <p className="max-w-2xl text-gray-500">
          Les dernières nouvelles de la vie académique à l'ENEAM.
        </p>
      </div>

      {loading ? (
        <div className="px-6 py-12 text-center text-sm text-gray-400 md:px-10">
          Chargement des actualités...
        </div>
      ) : error ? (
        <div className="px-6 py-12 text-center text-sm text-red-500 md:px-10">{error}</div>
      ) : actualites.length === 0 ? (
        <div className="px-6 py-12 text-center text-sm text-gray-400 md:px-10">
          Aucune actualité pour le moment.
        </div>
      ) : (
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--color-bg)] to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--color-bg)] to-transparent md:w-24" />

          <div className={`flex w-max gap-6 px-6 md:px-10 ${bouclageActif ? "scroll-loop-actualites" : ""}`}>
            {actusAffichees.map((a, i) => (
              <ActualiteCard key={`${a.id}-${i}`} {...a} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}