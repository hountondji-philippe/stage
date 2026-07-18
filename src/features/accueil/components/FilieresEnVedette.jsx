import { Landmark, Briefcase, Calculator, TrendingUp, Scale, Users, Globe, LayoutGrid } from "lucide-react";
import { FiliereCard } from "./FiliereCard";

export default function FilieresEnVedette() {
  // TODO: remplacer par un fetch backend (GET /filieres?populaires=true ou équivalent)
  const filieres = [
    { id: 1, nom: "Finance & Comptabilité", description: "Analyse financière, audit et gestion budgétaire des organisations.", icon: Landmark, memoires_count: 412 },
    { id: 2, nom: "Management des Projets", description: "Pilotage, planification et conduite de projets complexes.", icon: Briefcase, memoires_count: 356 },
    { id: 3, nom: "Audit et Contrôle de Gestion", description: "Vérification comptable et pilotage de la performance.", icon: Calculator, memoires_count: 298 },
    { id: 4, nom: "Marketing & Commerce", description: "Stratégies commerciales et comportement du consommateur.", icon: TrendingUp, memoires_count: 274 },
    { id: 5, nom: "Droit des Affaires", description: "Cadre juridique et réglementation des entreprises.", icon: Scale, memoires_count: 201 },
    { id: 6, nom: "Gestion des Ressources Humaines", description: "Management du capital humain et des organisations.", icon: Users, memoires_count: 187 },
    { id: 7, nom: "Commerce International", description: "Échanges commerciaux et stratégies à l'export.", icon: Globe, memoires_count: 163 },
    { id: 8, nom: "Toutes les filières", description: "Parcourez l'intégralité des travaux de recherche.", icon: LayoutGrid, memoires_count: null },
  ];

  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center gap-3">
          <h2 className="text-2xl font-extrabold text-[var(--color-primary)] md:text-3xl">
            Filières en vedette
          </h2>
          <span className="hidden h-1 w-16 rounded-full bg-[var(--color-accent)] md:block" />
        </div>
        <p className="mb-10 max-w-2xl text-gray-500 md:mb-14">
          Explorez les travaux de recherche classés par domaine d'étude.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filieres.map((f) => (
            <FiliereCard key={f.id} filiere={f} />
          ))}
        </div>
      </div>
    </section>
  );
}