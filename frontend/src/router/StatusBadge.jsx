const STATUTS = {
  valide: {
    label: "Validé",
    className: "bg-[var(--color-status-valide)]/10 text-[var(--color-status-valide)]",
  },
  en_attente: {
    label: "En attente",
    className: "bg-[var(--color-status-attente)]/10 text-[var(--color-status-attente)]",
  },
  rejete: {
    label: "Rejeté",
    className: "bg-[var(--color-status-rejete)]/10 text-[var(--color-status-rejete)]",
  },
};

export default function StatusBadge({ statut }) {
  const config = STATUTS[statut] ?? STATUTS.valide;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${config.className}`}
    >
      {config.label}
    </span>
  );
}