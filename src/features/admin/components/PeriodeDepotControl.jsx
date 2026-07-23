import { useState } from "react";
import { Calendar, Lock, Unlock } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { usePeriodeDepotAdmin } from "../hooks/usePeriodeDepotAdmin";

export default function PeriodeDepotControl() {
  const { ouverte, periode, loading, actionLoading, actionError, lancer, fermer } = usePeriodeDepotAdmin();
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

 async function handleLancer(e) {
  e.preventDefault();
  if (!dateDebut || !dateFin) return;
  try {
    await lancer({ date_debut: dateDebut, date_fin: dateFin });
    setAfficherFormulaire(false);
    setDateDebut("");
    setDateFin("");
  } catch {
    // L'erreur est déjà affichée via actionError (géré par le hook) — on l'attrape juste ici pour éviter l'exception non gérée dans la console.
  }
}

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-400">Chargement du statut...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              ouverte ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"
            }`}
          >
            {ouverte ? <Unlock size={18} /> : <Lock size={18} />}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Période de dépôt</p>
            <p className="text-xs text-gray-500">
              {ouverte && periode
                ? `Ouverte jusqu'au ${new Date(periode.date_fin).toLocaleDateString("fr-FR")}`
                : "Actuellement fermée"}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            ouverte ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
          }`}
        >
          {ouverte ? "Ouverte" : "Fermée"}
        </span>
      </div>

      {actionError && <p className="mb-3 text-xs text-red-600">{actionError}</p>}

      {ouverte ? (
        <Button variant="danger" fullWidth loading={actionLoading} onClick={fermer}>
          Fermer la période de dépôt
        </Button>
      ) : afficherFormulaire ? (
        <form onSubmit={handleLancer} className="space-y-3">
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
          <div className="flex gap-2">
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
          Lancer une période de dépôt
        </Button>
      )}
    </div>
  );
}