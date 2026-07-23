import { useEffect, useRef, useState } from "react";
import { Megaphone } from "lucide-react";
import { ActualiteCard } from "./ActualiteCard";
import { getActualites } from "../../admin/api/actualitesApi";

// Réglages de l'effet "carte centrale agrandie"
const SCALE_MAX = 1.35;      // taille de la carte au centre — plus grand = plus spectaculaire
const SCALE_MIN = 0.78;      // taille des cartes les plus éloignées
const OPACITY_MIN = 0.35;    // opacité des cartes les plus éloignées
const LIFT_MAX = 28;         // soulèvement (px) de la carte centrale
const BLUR_MAX = 2.5;        // flou (px) des cartes les plus éloignées
const ZONE_RATIO = 3.2;      // + petit = zone d'agrandissement plus étroite

export default function ActualitesAcademiques() {
  const [actualites, setActualites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const rafRef = useRef(null);

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

  const bouclageActif = actualites.length >= 3;
  const actusAffichees = bouclageActif ? [...actualites, ...actualites] : actualites;

  useEffect(() => {
    if (actusAffichees.length === 0) return;

    function tick() {
      const container = containerRef.current;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        const maxDistance = containerRect.width / ZONE_RATIO;

        cardRefs.current.forEach((el) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const distance = Math.abs(cardCenterX - centerX);
          const proximite = Math.max(0, 1 - distance / maxDistance);
          const eased = proximite * proximite; // accentue le contraste centre/bord

          const scale = SCALE_MIN + eased * (SCALE_MAX - SCALE_MIN);
          const opacity = OPACITY_MIN + eased * (1 - OPACITY_MIN);
          const lift = eased * LIFT_MAX;
          const blur = (1 - eased) * BLUR_MAX;

          el.style.transform = `translateY(${-lift}px) scale(${scale})`;
          el.style.opacity = opacity;
          el.style.filter = `blur(${blur}px)`;
          el.style.zIndex = Math.round(eased * 20);
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [actusAffichees.length]);

  return (
    <section className="overflow-hidden bg-[var(--color-bg)] py-24 lg:py-32">
      {bouclageActif && (
        <style>{`
          @keyframes scroll-loop-actualites {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .scroll-loop-actualites {
            animation: scroll-loop-actualites 34s linear infinite;
          }
          .scroll-loop-actualites:hover {
            animation-play-state: paused;
          }
        `}</style>
      )}

      <div className="mx-auto mb-10 max-w-6xl px-6 md:mb-16 md:px-10">
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
        <div className="mx-auto flex max-w-6xl gap-6 overflow-hidden px-6 md:px-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[340px] w-[320px] shrink-0 animate-pulse rounded-2xl bg-white shadow-sm sm:w-[380px]"
            />
          ))}
        </div>
      ) : error ? (
        <div className="mx-auto max-w-md px-6 py-12 text-center text-sm text-red-500 md:px-10">{error}</div>
      ) : actualites.length === 0 ? (
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-6 py-12 text-center md:px-10">
          <Megaphone size={32} className="text-gray-300" />
          <p className="text-sm text-gray-400">Aucune actualité pour le moment.</p>
        </div>
      ) : (
        <div ref={containerRef} className="relative py-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-16 bg-gradient-to-r from-[var(--color-bg)] to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-16 bg-gradient-to-l from-[var(--color-bg)] to-transparent md:w-32" />

          <div
            className={`flex w-max items-center gap-10 px-10 md:px-16 ${
              bouclageActif ? "scroll-loop-actualites" : ""
            }`}
          >
            {actusAffichees.map((a, i) => (
              <div
                key={`${a.id}-${i}`}
                ref={(el) => (cardRefs.current[i] = el)}
                className="transition-[transform,opacity,filter,box-shadow] duration-150 ease-out"
                style={{
                  willChange: "transform, opacity, filter",
                  filter: "drop-shadow(0 4px 6px rgba(19,36,107,0.08))",
                }}
              >
                <ActualiteCard {...a} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}