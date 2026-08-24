import { useState } from "react";
import { Calendar, Lock, Unlock, GraduationCap, Layers, XCircle } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { usePeriodeDepotAdmin } from "../hooks/usePeriodeDepotAdmin";

const LABELS_CYCLE = {
  licence: "Licence",
  master: "Master",
  tous: "Tous cycles",
};

function StatutPill({ label, ouverte }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-4 py-3 ${
        ouverte ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-gray-50"
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          ouverte ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-500"
        }`}
      >
        {ouverte ? <Unlock size={15} /> : <Lock size={15} />}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{label}</p>
        <p className={`text-sm font-bold ${ouverte ? "text-emerald-700" : "text-gray-500"}`}>
          {ouverte ? "Ouverte" : "Fermée"}
        </p>
      </div>
    </div>
  );
}

export default function PeriodeDepotControl() {
  const { statut, periodes, loading, actionLoading, actionError, lancer, fermer } = usePeriodeDepotAdmin();
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [cycle, setCycle] = useState("tous");
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

  async function handleLancer(e) {
    e.preventDefault();
    if (!dateDebut || !dateFin) return;
    try {
      await lancer({ date_debut: dateDebut, date_fin: dateFin, cycle });
      setAfficherFormulaire(false);
      setDateDebut("");
      setDateFin("");
      setCycle("tous");
    } catch {
      // Erreur déjà affichée via actionError
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-400">Chargement du statut...</p>
      </div>
    );
  }

  const periodesActives = periodes.filter((p) => p.est_ouverte);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
          <Calendar size={18} />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">Périodes de dépôt</p>
          <p className="text-xs text-gray-500">Gère les fenêtres de dépôt par cycle académique.</p>
        </div>
      </div>

      {/* Statut par cycle */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        <StatutPill label="Licence" ouverte={statut.licence_ouverte} />
        <StatutPill label="Master" ouverte={statut.master_ouverte} />
      </div>

      {actionError && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">{actionError}</p>
      )}

      {/* Périodes actuellement ouvertes, fermables individuellement */}
      {periodesActives.length > 0 && (
        <div className="mb-5 space-y-2">
          {periodesActives.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Layers size={16} className="text-emerald-600" />
                <div>
                  <p className="text-sm font-bold text-gray-900">{LABELS_CYCLE[p.cycle] || p.cycle}</p>
                  <p className="text-xs text-gray-500">
                    Jusqu'au {new Date(p.date_fin).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => fermer(p.id)}
                disabled={actionLoading}
                className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-40"
              >
                <XCircle size={14} />
                Fermer
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Formulaire d'ouverture d'une nouvelle période */}
      {afficherFormulaire ? (
        <form onSubmit={handleLancer} className="space-y-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date de début"
              type="date"
              name="date_debut"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              required
            />
            <Input
              label="Date de fin"
              type="date"
              name="date_fin"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Cycle concerné</label>
            <div className="relative">
              <GraduationCap size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={cycle}
                onChange={(e) => setCycle(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none transition-colors focus:border-[var(--color-primary)]"
              >
                <option value="tous">Tous les cycles (Licence + Master)</option>
                <option value="licence">Licence uniquement</option>
                <option value="master">Master uniquement</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <Button variant="outline" type="button" onClick={() => setAfficherFormulaire(false)}>
              Annuler
            </Button>
            <Button variant="primary" type="submit" fullWidth loading={actionLoading}>
              Confirmer l'ouverture
            </Button>
          </div>
        </form>
      ) : (
        <Button variant="primary" fullWidth onClick={() => setAfficherFormulaire(true)}>
          <Calendar size={16} />
          Lancer une nouvelle période
        </Button>
      )}
    </div>
  );
}