import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";
import { ROUTES } from "../../router/paths";

export default function PublicHeader() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // TODO(auth): remplacer par le vrai rôle une fois l'AuthContext branché.
  // role: "invite" | "etudiant" | "admin"
  const role = "invite";

  function handleEspaceEtudiant() {
    if (role === "etudiant") {
      navigate(ROUTES.espaceEtudiant);
    } else if (role === "admin") {
      navigate(ROUTES.espaceAdmin);
    } else {
      navigate(ROUTES.connexionEtudiant);
    }
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-20 bg-white shadow-sm">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-4 md:px-12">
        <Link
          to={ROUTES.accueil}
          className="text-xl font-black text-[var(--color-primary)]"
        >
          MÉMOIRES+
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to={ROUTES.accueil}
            className="border-b-2 border-[var(--color-primary)] pb-1 text-sm font-semibold text-[var(--color-primary)]"
          >
            Accueil
          </Link>
          <Link
            to={ROUTES.recherche}
            className="text-sm font-semibold text-gray-600 transition-colors hover:text-[var(--color-primary-light)]"
          >
            Rechercher un mémoire
          </Link>
          
          <a
            href="#a-propos"
            className="text-sm font-semibold text-gray-600 transition-colors hover:text-[var(--color-primary-light)]"
          >
            À propos
          </a>
        </nav>

        <div className="hidden md:block">
          <Button variant="primary" onClick={handleEspaceEtudiant}>
            Espace étudiant
          </Button>
        </div>

        <button
          className="md:hidden text-[var(--color-primary)]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-4 border-t border-gray-100 bg-white px-6 py-6">
          <Link to={ROUTES.accueil} onClick={() => setMobileOpen(false)}>
            Accueil
          </Link>
          <Link to={ROUTES.recherche} onClick={() => setMobileOpen(false)}>
            Rechercher un mémoire
          </Link>
          <a href="#a-propos" onClick={() => setMobileOpen(false)}>
            À propos
          </a>
          <Button variant="primary" fullWidth onClick={handleEspaceEtudiant}>
            Espace étudiant
          </Button>
        </div>
      )}
    </header>
  );
}