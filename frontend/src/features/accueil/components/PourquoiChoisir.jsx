import { ShieldCheck, Zap, ClipboardCheck, Smartphone } from "lucide-react";
import { AvantageCard } from "./AvantageCard";

export default function PourquoiChoisir() {
  const avantages = [
    { icon: ShieldCheck, titre: "Sécurisé", texte: "Vos données et vos travaux sont protégés par une authentification renforcée." },
    { icon: Zap, titre: "Rapide", texte: "Déposez et retrouvez un mémoire en quelques clics, sans démarche administrative." },
    { icon: ClipboardCheck, titre: "Validé par les enseignants", texte: "Chaque mémoire publié est vérifié et approuvé par le corps encadrant." },
    { icon: Smartphone, titre: "Accessible partout", texte: "Consultez la plateforme depuis votre ordinateur, tablette ou téléphone." },
  ];

  return (
    <section className="bg-[var(--color-bg)] px-6 py-20 md:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center gap-3">
          <h2 className="text-2xl font-extrabold text-[var(--color-primary)] md:text-3xl">
            Pourquoi choisir MÉMOIRES+
          </h2>
          <span className="hidden h-1 w-16 rounded-full bg-[var(--color-accent)] md:block" />
        </div>
        <p className="mb-10 max-w-2xl text-gray-500 md:mb-14">
          Une plateforme pensée pour la rigueur académique et la simplicité d'usage.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {avantages.map((a) => (
            <AvantageCard key={a.titre} icon={a.icon} titre={a.titre} texte={a.texte} />
          ))}
        </div>
      </div>
    </section>
  );
}