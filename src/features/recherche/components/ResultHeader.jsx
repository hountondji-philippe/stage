export default function ResultHeader({ count }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-stack-lg gap-stack-md">
      <div className="space-y-1">
        <h2 className="font-headline-md text-headline-md text-primary">
          Résultats de recherche
        </h2>
        <p className="text-outline-variant font-label-md">
          {count > 0 
            ? `${count} ${count > 1 ? "mémoires trouvés" : "mémoire trouvé"}`
            : "Aucun résultat pour votre recherche"
          }
        </p>
      </div>
    </div>
  );
}