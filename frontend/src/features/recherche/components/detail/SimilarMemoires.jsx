import { MemoireCard } from "../../../../components/ui/MemoireCard";

export default function SimilarMemoires({ memoires, filiereNom }) {
  if (!memoires || memoires.length === 0) return null;

  return (
    <section className="mt-16 sm:mt-20">
      <div className="mb-8 flex flex-col items-start sm:mb-10">
        <h2 className="relative pb-2 text-2xl font-bold text-[var(--color-primary)] sm:text-3xl">
          Mémoires similaires
          <span className="absolute bottom-0 left-0 h-1.5 w-24 rounded-full bg-[var(--color-accent)]" />
        </h2>
        <p className="mt-2 text-gray-500">
          Découvrez d'autres travaux de recherche dans le domaine {filiereNom}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {memoires.map((memoire) => (
          <MemoireCard key={memoire.id} memoire={memoire} />
        ))}
      </div>
    </section>
  );
}