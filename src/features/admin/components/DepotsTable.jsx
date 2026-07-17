import DepotRow from "./DepotRow";
import DepotCard from "./DepotCard";

export default function DepotsTable({ memoires }) {
  if (memoires.length === 0) {
    return (
      <div className="p-12 text-center text-sm text-gray-500">
        Aucun dépôt en attente ne correspond à votre recherche.
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="p-4 text-sm font-bold text-gray-900">Titre du mémoire</th>
              <th className="p-4 text-sm font-bold text-gray-900">Auteur</th>
              <th className="p-4 text-sm font-bold text-gray-900">Filière</th>
              <th className="p-4 text-sm font-bold text-gray-900">Date</th>
              <th className="p-4 text-center text-sm font-bold text-gray-900">Statut</th>
              <th className="p-4 text-right text-sm font-bold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {memoires.map((m) => (
              <DepotRow key={m.id} m={m} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 p-4 md:hidden">
        {memoires.map((m) => (
          <DepotCard key={m.id} m={m} />
        ))}
      </div>
    </>
  );
}
