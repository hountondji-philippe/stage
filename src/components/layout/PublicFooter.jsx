import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import { ROUTES } from "../../router/paths";

export default function PublicFooter() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="w-full py-16 px-6 md:px-12 bg-[#000e4d] text-white">
      {/* Conteneur principal de la grille */}
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Colonne 1 */}
        <div>
          <div className="font-bold text-2xl mb-6">MÉMOIRES+</div>
          <p className="text-[#b9c3ff] opacity-80 text-sm mb-8">
            Plateforme officielle de l'École Nationale d'Économie Appliquée et de Management pour la préservation et la diffusion des travaux de recherche.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-sm">link</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-sm">groups</span>
            </a>
          </div>
        </div>

        {/* Colonne 2 */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-white mb-2">Liens Rapides</h4>
          <Link to={ROUTES.ACCUEIL} className="text-[#b9c3ff] opacity-80 hover:text-[#fabd0d] transition-colors">Accueil</Link>
          <Link to={ROUTES.RECHERCHE} className="text-[#b9c3ff] opacity-80 hover:text-[#fabd0d] transition-colors">Rechercher un mémoire</Link>
          <Link to={isAuthenticated ? ROUTES.ESPACE_ETUDIANT : ROUTES.LOGIN} className="text-[#b9c3ff] opacity-80 hover:text-[#fabd0d] transition-colors">Espace étudiant</Link>
          <a href="#" className="text-[#b9c3ff] opacity-80 hover:text-[#fabd0d] transition-colors">Mentions légales</a>
        </div>

        {/* Colonne 3 */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-white mb-2">Contact</h4>
          <div className="flex items-start gap-3 text-[#b9c3ff] opacity-80">
            <span className="material-symbols-outlined">location_on</span>
            <span>Campus ENEAM, Cotonou, Bénin</span>
          </div>
          <div className="flex items-center gap-3 text-[#b9c3ff] opacity-80">
            <span className="material-symbols-outlined">mail</span>
            <span>contact@eneam.uac.bj</span>
          </div>
          <div className="flex items-center gap-3 text-[#b9c3ff] opacity-80">
            <span className="material-symbols-outlined">call</span>
            <span>+229 21 30 00 00</span>
          </div>
        </div>
      </div> {/* <--- J'ai ajouté cette fermeture qui manquait ! */}

      {/* Bas de page */}
      <div className="max-w-[1280px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-[#b9c3ff] opacity-60">
        <p>© 2024 ENEAM - Tous droits réservés</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Confidentialité</a>
          <a href="#" className="hover:text-white">Accessibilité</a>
        </div>
      </div>
    </footer>
  );
}