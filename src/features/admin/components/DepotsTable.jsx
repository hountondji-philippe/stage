import DepotRow from './DepotRow';

export default function DepotsTable({ memoires }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant card-shadow overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant">
              <th className="px-6 py-4 font-label-md">Titre du mémoire</th>
              <th className="px-6 py-4 font-label-md">Auteur</th>
              <th className="px-6 py-4 font-label-md">Filière</th>
              <th className="px-6 py-4 font-label-md">Date</th>
              <th className="px-6 py-4 font-label-md text-center">Statut</th>
              <th className="px-6 py-4 font-label-md text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {memoires.map(m => <DepotRow key={m.id} m={m} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}