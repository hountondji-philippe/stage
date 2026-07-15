import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Clock,
  Users,
  BarChart3,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { logout as logoutRequest } from "../../auth/api/authApi";

const NAV_ITEMS = [
  { to: "/admin/tableau-de-bord", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/admin/depots-en-attente", label: "Dépôts en attente", icon: Clock },
  { to: "/admin/etudiants-autorises", label: "Étudiants autorisés", icon: Users },
  { to: "/admin/statistiques", label: "Statistiques", icon: BarChart3 },
];

function NavItem({ to, label, icon: Icon, onClick, className = "" }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
          isActive
            ? "bg-[var(--color-accent)]/20 text-[var(--color-primary)] font-bold"
            : "text-gray-600 hover:bg-gray-100"
        } ${className}`
      }
    >
      <Icon size={20} />
      <span>{label}</span>
    </NavLink>
  );
}

export default function AdminLayout({ children }) {
  async function handleLogout() {
    try {
      await logoutRequest();
    } finally {
      localStorage.removeItem("mplus_token");
      window.location.href = "/connexion";
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Header */}
      <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-6">
        <h1 className="text-xl font-extrabold tracking-tight text-[var(--color-primary)]">
          MÉMOIRES+
        </h1>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-gray-500 sm:inline">Administration</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
            A
          </div>
        </div>
      </header>

      {/* Sidebar (desktop) */}
      <aside className="fixed left-0 top-16 hidden h-[calc(100vh-64px)] w-64 flex-col border-r border-gray-200 bg-white p-4 md:flex">
        <div className="mb-6 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary)]">
            <GraduationCap size={20} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight text-[var(--color-primary)]">
              Administration
            </p>
            <p className="text-xs text-gray-500">Gestion académique</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />
          Déconnexion
        </button>
      </aside>

      {/* Contenu */}
      <main className="min-h-screen px-4 pb-24 pt-24 md:ml-64 md:px-12 md:pb-12">
        <div className="mx-auto max-w-[1280px]">{children}</div>
      </main>

      {/* Bottom nav (mobile) */}
      <nav className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t border-gray-200 bg-white md:hidden">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.to}
            {...item}
            label={item.label.split(" ")[0]}
            className="flex-col gap-1 px-2 py-2 text-xs"
          />
        ))}
      </nav>
    </div>
  );
}
