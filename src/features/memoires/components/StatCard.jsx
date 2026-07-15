const COLOR_SCHEMES = {
  attente: {
    iconBg: "bg-orange-100",
    iconColor: "text-[var(--color-status-attente)]",
    countColor: "text-[var(--color-status-attente)]",
    ring: "ring-[var(--color-status-attente)]",
  },
  valide: {
    iconBg: "bg-green-100",
    iconColor: "text-[var(--color-status-valide)]",
    countColor: "text-[var(--color-status-valide)]",
    ring: "ring-[var(--color-status-valide)]",
  },
  rejete: {
    iconBg: "bg-red-100",
    iconColor: "text-[var(--color-status-rejete)]",
    countColor: "text-[var(--color-status-rejete)]",
    ring: "ring-[var(--color-status-rejete)]",
  },
};

export default function StatCard({ icon: Icon, count, label, scheme, active = false, onClick }) {
  const colors = COLOR_SCHEMES[scheme];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center gap-4 rounded-2xl bg-white p-6 text-left shadow-[0_4px_20px_rgba(19,36,107,0.06)] transition-all hover:-translate-y-0.5 ${
        active ? `ring-2 ${colors.ring}` : ""
      }`}
    >
      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${colors.iconBg}`}>
        <Icon size={26} className={colors.iconColor} strokeWidth={2.2} />
      </div>
      <div>
        <p className={`text-3xl font-bold leading-none ${colors.countColor}`}>{count}</p>
        <p className="mt-1.5 text-xs font-bold uppercase tracking-wide text-gray-500">{label}</p>
      </div>
    </button>
  );
}