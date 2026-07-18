import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";
import { ROUTES } from "../../router/paths";
import { useAuth } from "../../features/auth/hooks/useAuth";
import logo from "../../assets/memoire.png";

const NAV_LINKS = [
  { to: ROUTES.accueil, label: "Accueil" },
  { to: ROUTES.archive, label: "Rechercher un mémoire" },
  { to: ROUTES.aPropos, label: "À propos" },
];

function NavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      end
      onClick={onClick}
      className={({ isActive }) =>
        `pb-1 text-sm font-semibold transition-colors ${
          isActive
            ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
            : "text-gray-600 hover:text-[var(--color-primary-light)]"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default function PublicHeader() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const isAuthenticated = Boolean(user);

  function handleEspaceEtudiant() {
    if (!isAuthenticated) {
      navigate(ROUTES.connexionEtudiant);
    } else if (user?.role === "admin") {
      navigate(ROUTES.espaceAdmin);
    } else {
      navigate(ROUTES.espaceEtudiant);
    }
  }

  return (
    <header className="fixed left-0 top-0 z-50 h-20 w-full bg-white shadow-sm">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-4 md:px-12">
        <Link to={ROUTES.accueil} className="flex items-center gap-2">
          <img src={logo} alt="MÉMOIRES+" className="h-16 w-16 object-contain md:h-20 md:w-20" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        <div className="hidden md:block">
          <Button variant="primary" onClick={handleEspaceEtudiant}>
            {isAuthenticated ? "Mon espace" : "Espace étudiant"}
          </Button>
        </div>

        <button
          className="text-[var(--color-primary)] md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-4 border-t border-gray-100 bg-white px-6 py-6 md:hidden">
          {NAV_LINKS.map((item) => (
            <NavItem key={item.to} {...item} onClick={() => setMobileOpen(false)} />
          ))}
          <Button variant="primary" fullWidth onClick={handleEspaceEtudiant}>
            {isAuthenticated ? "Mon espace" : "Espace étudiant"}
          </Button>
        </div>
      )}
    </header>
  );
}