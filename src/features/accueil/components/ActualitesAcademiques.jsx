import { Megaphone, Trophy, GraduationCap } from "lucide-react";
import { ActualiteCard } from "./ActualiteCard";

export default function ActualitesAcademiques() {
  const actus = [
    { icon: Megaphone, date: "12 mars 2026", titre: "Ouverture de la période de dépôt pour la session 2026", texte: "Les étudiants finissants peuvent désormais soumettre leur mémoire pour validation avant la date limite du 30 juin." },
    { icon: Trophy, date: "28 février 2026", titre: "Cérémonie de remise des prix du meilleur mémoire 2025", texte: "Retour sur la cérémonie annuelle récompensant les travaux de recherche les plus remarqués de l'année écoulée." },
    { icon: GraduationCap, date: "15 février 2026", titre: "Nouveau partenariat avec les bibliothèques numériques régionales", texte: "L'ENEAM élargit l'accès à ses ressources académiques grâce à un accord avec le réseau documentaire de l'UEMOA." },
  ];

  const actusEnBoucle = [...actus, ...actus];

  return (
    <section className="overflow-hidden bg-[var(--color-bg)] py-20 lg:py-24">
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

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--color-bg)] to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--color-bg)] to-transparent md:w-24" />

        <div className="scroll-loop-actualites flex w-max gap-6 px-6 md:px-10">
          {actusEnBoucle.map((a, i) => (
            <ActualiteCard key={i} {...a} />
          ))}
        </div>
      </div>
    </section>
  );
}