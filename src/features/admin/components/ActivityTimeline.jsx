import { Check, X, FileText } from "lucide-react";

const STYLES = {
  valide: { bg: "bg-green-600", Icon: Check },
  rejete: { bg: "bg-red-600", Icon: X },
  depot: { bg: "bg-[var(--color-accent)]", Icon: FileText },
};

function formatRelatif(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  const heures = Math.floor(minutes / 60);
  if (heures < 24) return `Il y a ${heures} heure${heures > 1 ? "s" : ""}`;
  const jours = Math.floor(heures / 24);
  if (jours === 1) return "Hier";
  return `Il y a ${jours} jours`;
}

const LABELS = {
  valide: (titre) => (
    <>
      Mémoire validé : <span className="font-bold">{titre}</span>
    </>
  ),
  rejete: (titre) => (
    <>
      Mémoire rejeté : <span className="font-bold">{titre}</span>
    </>
  ),
  depot: (titre) => (
    <>
      Nouveau dépôt : <span className="font-bold">{titre}</span>
    </>
  ),
};

export default function ActivityTimeline({ activites }) {
  if (activites.length === 0) {
    return <p className="p-4 text-center text-sm text-gray-500">Aucune activité récente.</p>;
  }

  return (
    <div className="relative space-y-6 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-[2px] before:bg-gray-200">
      {activites.map((a) => {
        const { bg, Icon } = STYLES[a.type];
        return (
          <div key={a.id} className="relative pl-10">
            <div className={`absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white ${bg}`}>
              <Icon size={12} className="text-white" strokeWidth={3} />
            </div>
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">{LABELS[a.type](a.titre)}</p>
                <p className="text-sm text-gray-500">{a.detail}</p>
              </div>
              <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500">
                {formatRelatif(a.date)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
