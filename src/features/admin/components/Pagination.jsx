export default function Pagination() {
  return (
    <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
      <span className="text-label-sm text-on-surface-variant">Affichage des résultats</span>
      <div className="flex gap-2">
        <button className="p-2 rounded-lg border border-outline-variant"><span className="material-symbols-outlined">chevron_left</span></button>
        <button className="w-10 h-10 rounded-lg bg-primary text-white font-label-md">1</button>
        <button className="p-2 rounded-lg border border-outline-variant"><span className="material-symbols-outlined">chevron_right</span></button>
      </div>
    </div>
  );
}