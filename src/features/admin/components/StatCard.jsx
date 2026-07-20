export default function StatCard({ label, value, icon: Icon, accentColor = "#ffffff", onClick }) {
  const clickable = typeof onClick === "function";

  return (
    <div
      onClick={clickable ? onClick : undefined}
      style={{ borderTopColor: accentColor }}
      className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border-t-[3px] bg-[var(--color-primary)] px-4 py-5 transition-transform ${
        clickable ? "cursor-pointer hover:-translate-y-1" : ""
      }`}
    >
      <Icon size={32} strokeWidth={1.75} style={{ color: accentColor }} />
      <h3 className="text-xl font-extrabold text-white">{value}</h3>
      <p className="text-[10px] font-medium uppercase tracking-wide text-white/60">{label}</p>
    </div>
  );
}