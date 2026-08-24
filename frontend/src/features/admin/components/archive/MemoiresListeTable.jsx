import MemoiresListeRow from "./MemoiresListeRow";
import MemoiresListeCard from "../MemoiresListeCard";

export default function MemoiresListeTable({ memoires, onDeleteClick }) {
  if (memoires.length === 0) {
    return (
      <div className="p-12 text-center text-sm text-gray-500">
        Aucun mémoire ne correspond à ce filtre.
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}
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
              <MemoiresListeRow key={m.id} m={m} onDeleteClick={onDeleteClick} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="space-y-4 p-4 md:hidden">
        {memoires.map((m) => (
          <MemoiresListeCard key={m.id} m={m} onDeleteClick={onDeleteClick} />
        ))}
      </div>
    </>
  );
}
