import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Link as LinkIcon, Users } from "lucide-react";
import { ROUTES } from "../../router/paths";
import { useAuth } from "../../features/auth/context/AuthContext";

export default function PublicFooter() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="w-full bg-[var(--color-primary)] px-6 py-16 text-white md:px-12">
      {/* ... (début du code identique) */}
        <div className="flex flex-col gap-3">
          <h4 className="mb-2 font-bold">Liens Rapides</h4>
          <Link to={ROUTES.accueil} className="text-white/70 hover:text-[var(--color-accent)]">
            Accueil
          </Link>
          <Link to={ROUTES.recherche} className="text-white/70 hover:text-[var(--color-accent)]">
            Rechercher un mémoire
          </Link>
          <Link 
            to={isAuthenticated ? ROUTES.espaceEtudiant : ROUTES.connexionEtudiant} 
            className="text-white/70 hover:text-[var(--color-accent)]"
          >
            Espace étudiant
          </Link>
          <a href="/mentions-legales" className="text-white/70 hover:text-[var(--color-accent)]">
            Mentions légales
          </a>
        </div>
      {/* ... (le reste du code est parfait) */}
    </footer>
  );
}