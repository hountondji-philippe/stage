import { BookOpen, Target, Users, Award, Landmark, ShieldCheck } from "lucide-react";
import { AvantageCard } from "../components/AvantageCard";

const VALEURS = [
  { icon: BookOpen, titre: "Excellence académique", texte: "Nous valorisons la qualité et la rigueur scientifique de chaque travail de recherche déposé." },
  { icon: ShieldCheck, titre: "Intégrité", texte: "Chaque mémoire est vérifié et validé pour garantir l'authenticité des contenus partagés." },
  { icon: Users, titre: "Accessibilité", texte: "Le savoir académique de l'ENEAM doit être facilement accessible à toute la communauté." },
  { icon: Target, titre: "Innovation", texte: "Nous modernisons continuellement la gestion des travaux de fin d'études." },
];

const ETAPES = [
  { annee: "2018", titre: "Naissance du projet", texte: "L'ENEAM identifie le besoin d'une plateforme centralisée pour la gestion des mémoires de fin d'études." },
  { annee: "2020", titre: "Premiers tests internes", texte: "Une première version est testée auprès de quelques filières pilotes de l'établissement." },
  { annee: "2023", titre: "Déploiement officiel", texte: "MÉMOIRES+ devient la plateforme officielle de dépôt et de consultation pour tous les étudiants." },
  { annee: "2026", titre: "Aujourd'hui", texte: "Des milliers de mémoires archivés et une communauté académique active au quotidien." },
];

export default function AProposPage() {
  return (
    <main >
      {/* Hero */}
      <section className="bg-[var(--color-primary)] px-6 py-20 text-center text-white md:px-10 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/80">
            <Landmark size={16} />
            École Nationale d'Économie Appliquée et de Management
          </span>
          <h1 className="mb-6 text-3xl font-extrabold leading-tight md:text-5xl">
            À propos de MÉMOIRES+
          </h1>
          <p className="text-lg leading-relaxed text-white/80">
            La plateforme officielle de l'ENEAM pour la centralisation, la préservation et la
            diffusion des travaux de recherche académiques à Cotonou, Bénin.
          </p>
        </div>
      </section>

      {/* Notre mission */}
      <section className="bg-white px-6 py-20 md:px-10 lg:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-[var(--color-primary)] md:text-3xl">
                Notre mission
              </h2>
              <span className="hidden h-1 w-16 rounded-full bg-[var(--color-accent)] md:block" />
            </div>
            <p className="mb-4 leading-relaxed text-gray-500">
              MÉMOIRES+ a été conçue pour simplifier le dépôt, la validation et la consultation
              des mémoires de fin d'études au sein de l'ENEAM. Notre objectif est de préserver le
              savoir académique produit par les étudiants et de le rendre accessible à la
              communauté universitaire et professionnelle.
            </p>
            <p className="leading-relaxed text-gray-500">
              En digitalisant ce processus, nous réduisons les délais administratifs, garantissons
              la traçabilité des validations, et offrons une vitrine durable aux travaux de
              recherche des étudiants.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-100 bg-[var(--color-bg)] p-6 text-center shadow-sm">
              <div className="text-3xl font-black text-[var(--color-primary)]">2,500+</div>
              <p className="mt-1 text-sm text-gray-500">Mémoires déposés</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-[var(--color-bg)] p-6 text-center shadow-sm">
              <div className="text-3xl font-black text-[var(--color-primary)]">12</div>
              <p className="mt-1 text-sm text-gray-500">Filières couvertes</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-[var(--color-bg)] p-6 text-center shadow-sm">
              <div className="text-3xl font-black text-[var(--color-primary)]">5,000+</div>
              <p className="mt-1 text-sm text-gray-500">Étudiants inscrits</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-[var(--color-bg)] p-6 text-center shadow-sm">
              <div className="text-3xl font-black text-[var(--color-primary)]">2026</div>
              <p className="mt-1 text-sm text-gray-500">Depuis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="bg-[var(--color-bg)] px-6 py-20 md:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center gap-3">
            <h2 className="text-2xl font-extrabold text-[var(--color-primary)] md:text-3xl">
              Nos valeurs
            </h2>
            <span className="hidden h-1 w-16 rounded-full bg-[var(--color-accent)] md:block" />
          </div>
          <p className="mb-10 max-w-2xl text-gray-500 md:mb-14">
            Les principes qui guident le développement et la gestion de la plateforme.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALEURS.map((v) => (
              <AvantageCard key={v.titre} icon={v.icon} titre={v.titre} texte={v.texte} />
            ))}
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="bg-white px-6 py-20 md:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex items-center gap-3">
            <h2 className="text-2xl font-extrabold text-[var(--color-primary)] md:text-3xl">
              Notre histoire
            </h2>
            <span className="hidden h-1 w-16 rounded-full bg-[var(--color-accent)] md:block" />
          </div>
          <p className="mb-12 max-w-2xl text-gray-500">
            Le parcours de MÉMOIRES+, de sa conception à aujourd'hui.
          </p>

          <div className="relative space-y-10 border-l-2 border-gray-100 pl-8">
            {ETAPES.map((e) => (
              <div key={e.annee} className="relative">
                <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-[var(--color-primary)]" />
                <span className="mb-1 block text-sm font-bold text-[var(--color-accent)]">{e.annee}</span>
                <h4 className="mb-1 text-lg font-bold text-gray-900">{e.titre}</h4>
                <p className="leading-relaxed text-gray-500">{e.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[var(--color-bg)] px-6 py-20 md:px-10 lg:py-24">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[32px] bg-[var(--color-primary)] p-10 text-center text-white md:p-14">
          <Award size={40} className="mx-auto mb-6 text-[var(--color-accent)]" />
          <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">
            Rejoignez la communauté académique de l'ENEAM
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-white/80">
            Déposez votre mémoire, consultez les travaux de vos pairs et contribuez au rayonnement
            du savoir.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            
            <a   href="/archive"
              className="rounded-xl bg-[var(--color-accent)] px-8 py-3 font-bold text-[var(--color-primary)] transition-transform hover:scale-105"
            >
              Explorer les mémoires
            </a>
            
             <a  href="/connexion-etudiant"
              className="rounded-xl border-2 border-white px-8 py-3 font-bold text-white transition-all hover:bg-white/10"
            >
              Espace étudiant
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}