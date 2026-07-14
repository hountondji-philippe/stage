import { GraduationCap } from "lucide-react";

/**
 * Panneau visuel de la connexion étudiant.
 * - Desktop (md+) : panneau fixe à gauche (~45%), image + overlay dégradé navy, logo, accroche, footer.
 * - Mobile (< md) : la même image sert de fond plein écran DERRIÈRE la carte du formulaire
 *   (voir ConnexionEtudiantPage.jsx qui positionne ce composant en absolute sur mobile).
 *
 * L'image doit être placée par Samson à : src/assets/auth-etudiant-bg.jpg
 */
import bgImage from "../../../assets/auth-etudiant-bg.jpg";

export default function EtudiantAuthVisual() {
  return (
    <div className="absolute inset-0 md:relative md:w-[45%] md:shrink-0">
      {/* Image de fond */}
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay dégradé navy — plus opaque sur mobile pour garder le formulaire lisible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(19,36,107,0.92) 0%, rgba(0,14,77,0.88) 100%)",
        }}
      />
      <div
        className="absolute inset-0 md:hidden"
        style={{ background: "rgba(0,14,77,0.35)" }}
      />

      {/* Contenu texte — masqué sur mobile (juste le fond de l'image y sert) */}
      <div className="relative z-10 hidden h-full flex-col justify-between p-10 text-white md:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-lg">
            <GraduationCap className="h-6 w-6 text-[var(--color-primary)]" />
          </div>
          <span className="text-xl font-bold tracking-tight">MÉMOIRES+</span>
        </div>

        <div className="max-w-sm">
          <h1 className="text-3xl font-bold leading-tight">
            L'excellence académique à portée de clic.
          </h1>
          <p className="mt-4 max-w-sm text-white/80">
            Retrouvez vos dépôts et suivez leur validation en toute simplicité.
          </p>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-sm text-white/70">
            Pas encore de compte ?{" "}
            
            <a  href="/inscription"
              className="font-bold text-[var(--color-accent)] underline hover:text-[var(--color-accent)]/80"
            >
              Inscrivez-vous avec votre matricule
            </a>
          </p>
          <div className="mt-3 flex gap-3 text-xs text-white/40">
            <span>ENEAM Cotonou</span>
            <span>•</span>
            <span>Portail Académique v2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}