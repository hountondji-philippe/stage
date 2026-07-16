export default function DepotToolbar() {
  return (
    <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant card-shadow mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative w-full md:w-96 group">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary">search</span>
        <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-outline-variant focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-body-md" placeholder="Rechercher par titre ou auteur..." />
      </div>
      <div className="flex gap-3 w-full md:w-auto">
        <select className="flex-1 md:flex-none px-4 py-2.5 bg-surface-container-low rounded-lg border border-outline-variant font-label-md text-label-md text-on-surface outline-none cursor-pointer">
          <option>Filière: Toutes</option>
        </select>
        <select className="flex-1 md:flex-none px-4 py-2.5 bg-surface-container-low rounded-lg border border-outline-variant font-label-md text-label-md text-on-surface outline-none cursor-pointer">
          <option>Plus récent</option>
        </select>
      </div>
    </div>
  );
}