import { GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../router/paths";

/**
 * Panneau visuel de la connexion étudiant.
 * - Desktop (md+) : panneau fixe à gauche (~45%), logo en haut, grand texte stylé en bas.
 * - Mobile (< md) : sert UNIQUEMENT de fond plein écran (image + overlay) — pas de logo ni de
 *   texte dedans. Le logo est affiché au-dessus du formulaire à la place (voir ConnexionEtudiantPage.jsx).
 *
 * L'image de fond doit être placée par Samson à : src/assets/auth-etudiant-bg.jpg
 */
import bgImage from "../../../assets/auth-etudiant-bg.jpg";

export default function EtudiantAuthVisual() {
  return (
    <div className="absolute inset-0 md:relative md:w-[45%] md:shrink-0 overflow-hidden">
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(19,36,107,0.92) 0%, rgba(0,14,77,0.88) 100%)",
        }}
      />

      {/* Contenu (logo + texte) — desktop uniquement */}
      <div className="relative z-10 hidden h-full flex-col p-12 text-white md:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lg">
            <GraduationCap className="h-6 w-6 text-[var(--color-primary)]" />
          </div>
          <span className="text-2xl font-extrabold uppercase tracking-tight">MÉMOIRES+</span>
        </div>

        <div className="flex-grow" />

        <div className="mt-auto max-w-sm">
          <span className="mb-3 inline-block h-1 w-10 rounded-full bg-[var(--color-accent)]" />
          <h2 className="text-3xl font-bold leading-tight">
            L'excellence académique à portée de clic.
          </h2>
          <p className="mt-4 text-base text-white/80">
            Retrouvez vos dépôts et suivez leur validation en toute simplicité.
          </p>

          <div className="mt-6 border-t border-white/10 pt-6">
            <Link
              to={ROUTES.inscription}
              className="inline-flex items-center gap-2 font-semibold text-[var(--color-accent)] group"
            >
              <span className="border-b-2 border-[var(--color-accent)] pb-0.5 transition-all group-hover:pb-1">
                Inscrivez-vous avec votre matricule
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-3 flex gap-3 text-xs text-white/40">
              <span>ENEAM Cotonou</span>
              <span>•</span>
              <span>Portail Académique v2.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}