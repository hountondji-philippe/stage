import { FileText, GraduationCap, Users, Download } from "lucide-react";

export default function StatsSection({ stats }) {
  if (!stats) return null;

  const cards = [
    { label: "Mémoires déposés", value: stats.memoires_deposes, icon: FileText },
    { label: "Filières couvertes", value: stats.filieres_couvertes, icon: GraduationCap },
    { label: "Étudiants inscrits", value: stats.etudiants_inscrits, icon: Users },
    { label: "Téléchargements", value: stats.telechargements, icon: Download },
  ];

  return (
    <section className="bg-[var(--color-primary)] py-16 px-6">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 md:grid-cols-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm border border-white/5 transition-transform hover:scale-105"
          >
            <card.icon size={36} className="mx-auto mb-4 text-[var(--color-accent)]" />
            <div className="mb-2 text-4xl font-black text-white">{card.value}</div>
            <div className="text-sm font-medium text-blue-100 uppercase tracking-wider">{card.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}