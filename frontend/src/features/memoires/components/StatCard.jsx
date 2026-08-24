const ACCENT = {
  attente: "var(--color-status-attente)",
  valide: "var(--color-status-valide)",
  rejete: "var(--color-status-rejete)",
};

export default function StatCard({ icon: Icon, count, label, scheme, active = false, onClick }) {
  const accent = ACCENT[scheme] || "#ffffff";

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        borderTopColor: accent,
        boxShadow: active ? `0 0 0 2px ${accent}` : undefined,
      }}
      className="flex flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl border-t-[3px] bg-[var(--color-primary)] px-4 py-5 text-center transition-transform hover:-translate-y-1"
    >
      <Icon size={32} strokeWidth={1.75} style={{ color: accent }} />
      <p className="text-xl font-extrabold text-white">{count}</p>
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#B9C3FF]">{label}</p>
    </button>
  );
}