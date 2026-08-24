export function AvantageCard({ icon: Icon, titre, texte }) {
  return (
    <div className="flex h-full flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
        <Icon size={28} strokeWidth={1.75} />
      </div>
      <h4 className="mb-2 text-lg font-bold text-[var(--color-primary)]">{titre}</h4>
      <p className="text-sm leading-relaxed text-gray-500">{texte}</p>
    </div>
  );
}