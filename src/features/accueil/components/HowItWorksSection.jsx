import { Search, Eye, Download } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    { icon: Search, title: "Rechercher", desc: "Utilisez nos filtres pour trouver le mémoire idéal." },
    { icon: Eye, title: "Consulter", desc: "Accédez au résumé et aux informations clés en ligne." },
    { icon: Download, title: "Télécharger", desc: "Identifiez-vous pour obtenir le document complet." },
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 text-center">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="mb-16 text-3xl font-bold text-[var(--color-primary)]">Comment ça marche ?</h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm text-[var(--color-primary)]">
                <step.icon size={40} />
              </div>
              <h4 className="mb-2 text-xl font-bold text-[var(--color-primary)]">{step.title}</h4>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}