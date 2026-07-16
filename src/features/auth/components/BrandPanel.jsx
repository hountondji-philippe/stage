import { GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Colonne de marque réutilisée sur les écrans d'authentification (connexion, inscription...).
 * - Desktop (md+) : panneau fixe à gauche (~45% de largeur), logo en haut, grand texte stylé en bas.
 * - Mobile (< md) : sert UNIQUEMENT de fond plein écran (position absolute) — pas de logo ni de
 *   texte dedans. Le logo est affiché au-dessus du formulaire à la place (voir la page qui l'utilise).
 *
 * TODO : remplacer l'icône GraduationCap par le vrai logo de la plateforme dès qu'il est fourni.
 */
export default function BrandPanel({ title, linkText, linkTo = "/connexion", badgeText }) {
  return (
    <div
      className="absolute inset-0 md:relative md:w-[45%] md:shrink-0 overflow-hidden flex flex-col md:p-12 text-white"
      style={{ background: "linear-gradient(135deg, #000e4d 0%, #1e3aa0 100%)" }}
    >
      {/* Décorations */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-5%] left-[-5%] w-96 h-96 bg-[#fabd0d]/10 rounded-full blur-3xl" />

      <div className="relative z-10 hidden h-full flex-col md:flex">
        {/* Logo — toujours épinglé en haut, desktop et mobile */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 md:w-9 md:h-9 text-[#fabd0d]" strokeWidth={1.5} />
            <h1 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight">
              MÉMOIRES+
            </h1>
          </div>
          {badgeText && (
            <span className="hidden sm:inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
              {badgeText}
            </span>
          )}
        </div>

        <div className="flex-grow" />

        {/* Texte — toujours épinglé en bas, taille réduite sur mobile */}
        <div className="mt-auto max-w-md">
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold leading-tight mb-4 md:mb-6">
            {title}
          </h2>
          <Link
            to={linkTo}
            className="inline-flex items-center gap-2 text-[#fabd0d] font-semibold group"
          >
            <span className="border-b-2 border-[#fabd0d] pb-0.5 transition-all group-hover:pb-1">
              {linkText}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}