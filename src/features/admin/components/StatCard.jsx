export default function StatCard({ label, value, icon: Icon, colorClass, iconBgClass }) {
  return (
    <div
      className={`flex items-center justify-between rounded-2xl border-l-4 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 ${colorClass}`}
    >
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
        <h3 className="text-3xl font-extrabold text-gray-900">{value}</h3>
      </div>
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBgClass}`}>
        <Icon size={22} />
      </div>
    </div>
  );
}
