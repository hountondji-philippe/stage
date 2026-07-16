// Utilise les accolades {} car tu as exporté une fonction nommée
import { MemoireCard } from '../../../components/ui/MemoireCard';

export default function MemoireGrid({ memoires }) {
  if (!Array.isArray(memoires) || memoires.length === 0) {
    return (
      <div className="text-center py-10 text-outline-variant font-medium">
        Aucun mémoire trouvé.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
      {memoires.map((memoire) => (
        <MemoireCard 
          key={memoire.id} 
          memoire={memoire} 
        />
      ))}
    </div>
  );
}