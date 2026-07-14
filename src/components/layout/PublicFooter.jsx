import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Link as LinkIcon, Users } from "lucide-react";
import { ROUTES } from "../../router/paths";

export default function PublicFooter() {
  return (
    <footer className="w-full bg-[var(--color-primary)] px-6 py-16 text-white md:px-12">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <div className="mb-6 text-xl font-bold">MÉMOIRES+</div>
          <p className="mb-8 text-sm text-white/70">
            Plateforme officielle de l'École Nationale d'Économie Appliquée et
            de Management pour la préservation et la diffusion des travaux de
            recherche.
          </p>
          <div className="flex gap-4">
            {/* TODO: remplacer par les vrais liens réseaux sociaux */}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
              aria-label="Réseau social"
            >
              <LinkIcon size={18} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
              aria-label="Communauté"
            >
              <Users size={18} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="mb-2 font-bold">Liens Rapides</h4>
          <Link to={ROUTES.accueil} className="text-white/70 hover:text-[var(--color-accent)]">
            Accueil
          </Link>
          <Link to={ROUTES.recherche} className="text-white/70 hover:text-[var(--color-accent)]">
            Rechercher un mémoire
          </Link>
          <Link to={ROUTES.connexionEtudiant} className="text-white/70 hover:text-[var(--color-accent)]">
            Espace étudiant
          </Link>
          {/* TODO: brancher sur une vraie page/modale de mentions légales */}
          <a href="#" className="text-white/70 hover:text-[var(--color-accent)]">
            Mentions légales
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="mb-2 font-bold">Contact</h4>
          <div className="flex items-start gap-3 text-white/70">
            <MapPin size={20} />
            <span>Campus ENEAM, Cotonou, Bénin</span>
          </div>
          <div className="flex items-center gap-3 text-white/70">
            <Mail size={20} />
            <span>contact@eneam.uac.bj</span>
          </div>
          <div className="flex items-center gap-3 text-white/70">
            <Phone size={20} />
            <span>+229 21 30 00 00</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1280px] flex-col items-center justify-between border-t border-white/10 pt-8 text-sm text-white/60 md:flex-row">
        <p>© {new Date().getFullYear()} ENEAM - Tous droits réservés</p>
        <div className="mt-4 flex gap-6 md:mt-0">
          <a href="#" className="hover:text-white">Confidentialité</a>
          <a href="#" className="hover:text-white">Accessibilité</a>
        </div>
      </div>
    </footer>
  );
}