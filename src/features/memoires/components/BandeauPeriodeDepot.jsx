import { CheckCircle2, XCircle } from "lucide-react";
import { usePeriodeDepot } from "../hooks/usePeriodeDepot";

export default function BandeauPeriodeDepot() {
  const { ouverte, periode, loading } = usePeriodeDepot();

  if (loading || ouverte === null) return null;

  if (ouverte) {
    return (
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
        <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
        <p className="text-sm text-emerald-800">
          Le dépôt des mémoires est ouvert
          {periode?.date_fin && (
            <>
              {" "}
              jusqu'au <span className="font-semibold">{new Date(periode.date_fin).toLocaleDateString("fr-FR")}</span>
            </>
          )}
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
      <XCircle size={18} className="shrink-0 text-gray-400" />
      <p className="text-sm text-gray-600">
        Le dépôt des mémoires est actuellement fermé. Consultez les actualités pour connaître la prochaine ouverture.
      </p>
    </div>
  );
}