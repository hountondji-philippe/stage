import { MemoireCard } from "../../../components/ui/MemoireCard";

export default function MemoireGrid({ memoires }) {
  if (!Array.isArray(memoires) || memoires.length === 0) {
    return (
      <div className="py-10 text-center font-medium text-gray-400">
        Aucun mémoire trouvé.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {memoires.map((memoire) => (
        <MemoireCard key={memoire.id} memoire={memoire} />
      ))}
    </div>
  );
}