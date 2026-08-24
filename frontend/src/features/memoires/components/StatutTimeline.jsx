import { Check, Hourglass } from "lucide-react";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function StatutTimeline({ statut, createdAt, valideLe }) {
  const steps = [
    { key: "envoye", label: "Dépôt envoyé", done: true, date: formatDate(createdAt) },
    { key: "validation", label: "En cours de validation", active: statut === "en_attente" },
    {
      key: "decision",
      label: statut === "rejete" ? "Dépôt rejeté" : "Décision finale",
      done: statut === "valide" || statut === "rejete",
      isRejet: statut === "rejete",
      date: statut === "valide" ? formatDate(valideLe) : null,
    },
  ];

  return (
    <div className="relative space-y-12">
      <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-200" />
      {steps.map((step) => (
        <div key={step.key} className="relative flex items-start gap-6">
          <div
            className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white ${
              step.isRejet
                ? "bg-red-500 text-white"
                : step.done
                ? "bg-green-500 text-white"
                : step.active
                ? "border-2 border-[#FFE58F] bg-[#FFF7E6] text-[#D48806]"
                : "bg-gray-100 text-gray-300"
            }`}
          >
            {step.done ? (
              <Check size={16} />
            ) : step.active ? (
              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#D48806]" />
            ) : (
              <Hourglass size={16} />
            )}
          </div>
          <div>
            <h4
              className={`text-sm font-medium ${
                step.isRejet
                  ? "font-bold text-red-600"
                  : step.active
                  ? "font-bold text-[#D48806]"
                  : step.done
                  ? "text-[var(--color-text)]"
                  : "text-gray-400"
              }`}
            >
              {step.label}
            </h4>
            {step.date && <p className="text-xs text-gray-400">{step.date}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}