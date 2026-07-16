import { Clock, CheckCircle2, XCircle, FileStack, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

// Données statiques en attendant le branchement sur GET /api/admin/stats
const STATS = [
  { label: "En attente", value: 12, icon: Clock, tone: "attente" },
  { label: "Validés", value: 84, icon: CheckCircle2, tone: "valide" },
  { label: "Rejetés", value: 7, icon: XCircle, tone: "rejete" },
  { label: "Total", value: 103, icon: FileStack, tone: "primary" },
];

const TONES = {
  attente: { bg: "bg-orange-50", text: "text-[var(--color-status-attente)]" },
  valide: { bg: "bg-green-50", text: "text-[var(--color-status-valide)]" },
  rejete: { bg: "bg-red-50", text: "text-[var(--color-status-rejete)]" },
  primary: { bg: "bg-[var(--color-primary)]/10", text: "text-[var(--color-primary)]" },
};

const REPARTITION_FILIERES = [
  { filiere: "Informatique de Gestion", count: 34 },
  { filiere: "Finance-Comptabilité", count: 27 },
  { filiere: "Marketing", count: 19 },
  { filiere: "Logistique et Transport", count: 14 },
  { filiere: "Autres filières", count: 9 },
];
const MAX_REPARTITION = Math.max(...REPARTITION_FILIERES.map((f) => f.count));

const DEPOTS_RECENTS = [
  { id: 1, titre: "L'impact du digital sur les PME béninoises", auteur: "A. KOUDJO", filiere: "Marketing", date: "14 juil. 2026" },
  { id: 2, titre: "Analyse des risques bancaires en zone UEMOA", auteur: "S. AGBODJAN", filiere: "Finance-Comptabilité", date: "13 juil. 2026" },
  { id: 3, titre: "Optimisation logistique des ports d'Afrique de l'Ouest", auteur: "R. HOUNSA", filiere: "Logistique et Transport", date: "12 juil. 2026" },
  { id: 4, titre: "Systèmes d'information et gouvernance publique", auteur: "M. ALLADATIN", filiere: "Informatique de Gestion", date: "11 juil. 2026" },
  { id: 5, titre: "Comportement du consommateur en e-commerce", auteur: "F. DOSSOU", filiere: "Marketing", date: "10 juil. 2026" },
];

export default function DashboardAdminPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--color-primary)] md:text-3xl">
            Tableau de bord
          </h2>
          <p className="text-gray-500">Vue d'ensemble des dépôts de mémoires.</p>
        </div>

        {/* Cartes stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map(({ label, value, icon: Icon, tone }) => (
            <div key={label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${TONES[tone].bg}`}>
                <Icon className={`h-5 w-5 ${TONES[tone].text}`} />
              </div>
              <p className="text-2xl font-extrabold text-[var(--color-text)]">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Répartition par filière */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:col-span-2">
            <h3 className="mb-4 font-bold text-[var(--color-text)]">Répartition par filière</h3>
            <div className="space-y-4">
              {REPARTITION_FILIERES.map(({ filiere, count }) => (
                <div key={filiere}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-gray-600">{filiere}</span>
                    <span className="font-semibold text-[var(--color-text)]">{count}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[var(--color-primary-light)]"
                      style={{ width: `${(count / MAX_REPARTITION) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dépôts en attente récents */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-[var(--color-text)]">Dépôts en attente récents</h3>
              <Link to="/admin/depots-en-attente" className="flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] hover:underline">
                Voir tout
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {DEPOTS_RECENTS.map((depot) => (
                <div key={depot.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--color-text)]">{depot.titre}</p>
                    <p className="text-xs text-gray-500">{depot.auteur} · {depot.filiere}</p>
                  </div>
                  <span className="shrink-0 text-xs text-gray-400">{depot.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}