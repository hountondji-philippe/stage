export default function DepotRow({ m }) {
  return (
    <tr className="hover:bg-surface-variant/20 transition-colors group">
      <td className="px-6 py-5">
        <span className="font-body-md text-body-md text-on-surface font-semibold">{m.titre}</span>
      </td>
      <td className="px-6 py-5 text-on-surface-variant">{m.user?.nom}</td>
      <td className="px-6 py-5 text-on-surface-variant">{m.filiere?.nom}</td>
      <td className="px-6 py-5 text-on-surface-variant">{m.date}</td>
      <td className="px-6 py-5 text-center">
        <span className="px-3 py-1.5 rounded-full bg-orange-100 text-orange-800 text-label-sm font-label-sm">En attente</span>
      </td>
      <td className="px-6 py-5 text-right">
        <a href={`/admin/memoires/${m.id}`} className="bg-primary-container text-on-primary-container hover:bg-primary hover:text-white px-5 py-2 rounded-lg font-label-md transition-all">Examiner</a>
      </td>
    </tr>
  );
}