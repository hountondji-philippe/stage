import { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  FolderOpen,
  FilePlus2,
  Globe2,
  UserRound,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  GraduationCap,
  ListChecks,
  LifeBuoy,
} from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { ROUTES } from "../../../router/paths";
import LogoutConfirmModal from "../../../components/ui/LogoutConfirmModal";
import RechercheGlobaleDropdown from "./RechercheGlobaleDropdown";
import { useRechercheGlobale } from "../hooks/useRechercheGlobale";

const NAV_ITEMS = [
  { to: ROUTES.espaceEtudiant, label: "Tableau de bord", icon: FolderOpen },
  { to: ROUTES.mesDepots, label: "Mes dépôts", icon: ListChecks },
  { to: ROUTES.depotEtudiant, label: "Nouveau dépôt", icon: FilePlus2 },
  { to: ROUTES.archive, label: "Mémoires publics", icon: Globe2 },
  { to: ROUTES.profilEtudiant, label: "Mon profil", icon: UserRound },
  { to: ROUTES.mesTickets, label: "Mes tickets", icon: LifeBuoy },
];

function NavItem({ to, label, icon: Icon, onClick, className = "" }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
          isActive
            ? "bg-white/10 text-white font-bold"
            : "text-gray-300 hover:bg-white/5 hover:text-white"
        } ${className}`
      }
    >
      <Icon size={20} />
      <span>{label}</span>
    </NavLink>
  );
}

export default function EtudiantLayout({ children }) {
  const navigate = useNavigate();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { user, logout } = useAuth();

  const { terme, setTerme, resultats, loading, ouvert, setOuvert } = useRechercheGlobale();
  const rechercheRef = useRef(null);

  useEffect(() => {
    if (!ouvert) return;
    function handleClickOutside(e) {
      if (rechercheRef.current && !rechercheRef.current.contains(e.target)) {
        setOuvert(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ouvert, setOuvert]);

  const etudiantAutorise = user?.etudiant_autorise;
  const nomComplet = etudiantAutorise
    ? `${etudiantAutorise.prenom} ${etudiantAutorise.nom}`
    : "Étudiant";
  const filiereNom = etudiantAutorise?.filiere?.nom || "";
  const initiale = etudiantAutorise?.prenom?.charAt(0) || "É";

  const handleLogoutClick = () => {
    setMenuOuvert(false);
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <aside className="fixed left-0 top-0 hidden h-screen w-[280px] flex-col bg-[var(--color-primary)] p-5 md:flex">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
            <GraduationCap size={22} className="text-[var(--color-primary)]" />
          </div>
          <div>
            <p className="text-lg font-extrabold leading-tight text-white">MÉMOIRES+</p>
            <p className="text-xs text-white/60">Portail Étudiant</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        <button
          onClick={handleLogoutClick}
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-300 hover:bg-white/5"
        >
          <LogOut size={20} />
          Se déconnecter
        </button>
      </aside>

      <header className="fixed left-0 right-0 top-0 z-40 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6 md:left-[280px]">
        <div className="relative w-full max-w-sm" ref={rechercheRef}>
          <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={terme}
            onChange={(e) => {
              setTerme(e.target.value);
              setOuvert(true);
            }}
            onFocus={() => setOuvert(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && terme.trim().length >= 2) {
                setOuvert(false);
                navigate(`${ROUTES.archive}?q=${encodeURIComponent(terme)}`);
              }
            }}
            placeholder="Rechercher un mémoire..."
            className="w-full rounded-xl border border-gray-200 bg-[var(--color-bg)] py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]/40"
          />
          {ouvert && (
            <RechercheGlobaleDropdown
              terme={terme}
              resultats={resultats}
              loading={loading}
              onClose={() => setOuvert(false)}
            />
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setMenuOuvert((v) => !v)}
              className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-gray-100"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">
                {initiale}
              </div>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-sm font-semibold text-[var(--color-text)]">
                  {nomComplet}
                </span>
                <span className="block text-xs text-gray-400">{filiereNom}</span>
              </span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {menuOuvert && (
              <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(19,36,107,0.1)]">
                <NavLink
                  to={ROUTES.profilEtudiant}
                  onClick={() => setMenuOuvert(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Mon profil
                </NavLink>
                <button
                  onClick={handleLogoutClick}
                  className="block w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="min-h-screen px-4 pb-24 pt-28 md:ml-[280px] md:px-10 md:pb-10">{children}</main>

      {/* Bottom nav (mobile uniquement) */}
      <nav className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t border-gray-200 bg-white md:hidden">
        {NAV_ITEMS.slice(0, 4).map((item) => (
          <NavItem
            key={item.to}
            {...item}
            label={item.label.split(" ")[0]}
            className="flex-col gap-1 px-2 py-2 text-xs !text-gray-600"
          />
        ))}
      </nav>

      {showLogoutConfirm && (
        <LogoutConfirmModal
          onCancel={() => setShowLogoutConfirm(false)}
          onConfirm={handleConfirmLogout}
          message="Tu devras te reconnecter pour accéder à ton espace étudiant."
        />
      )}
    </div>
  );
}