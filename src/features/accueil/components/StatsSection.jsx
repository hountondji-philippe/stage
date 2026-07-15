export default function StatsSection({ stats }) {
  if (!stats) return null;

  const cards = [
    { label: "Mémoires déposés", value: stats.total },
    { label: "Validés", value: stats.valide },
    { label: "En attente", value: stats.en_attente },
    { label: "Rejetés", value: stats.rejete },
  ];

  return (
    <section className="bg-[var(--color-primary)] py-16 px-6">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 md:grid-cols-4">
        {cards.map((card, i) => (
          <div 
            key={i} 
            className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm border border-white/5 transition-transform hover:scale-105"
          >
            <div className="mb-2 text-4xl font-black text-white">{card.value}</div>
            <div className="text-sm font-medium text-blue-100 uppercase tracking-wider">{card.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}