const COLORS = [
  "bg-[var(--color-primary)]",
  "bg-[var(--color-accent)]",
  "bg-blue-400",
  "bg-purple-400",
  "bg-teal-400",
  "bg-pink-400",
];

export default function FiliereChart({ parFiliere }) {
  if (!parFiliere || parFiliere.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-500">
        Pas encore de données par filière.
      </div>
    );
  }

  const max = Math.max(...parFiliere.map((f) => f.total));

  return (
    <div className="flex h-full flex-col justify-center gap-4">
      {parFiliere.map((f, i) => (
        <div key={f.nom} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className={`h-3 w-3 rounded-full ${COLORS[i % COLORS.length]}`} />
              <span className="font-medium text-gray-700">{f.nom}</span>
            </div>
            <span className="font-bold text-gray-900">{f.total}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full ${COLORS[i % COLORS.length]}`}
              style={{ width: `${(f.total / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
