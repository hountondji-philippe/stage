export default function SearchBar({ onSearch, onSubmit }) {
  return (
    <div className="flex flex-col md:flex-row gap-stack-md mb-stack-lg">
      <div className="relative flex-grow">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-outline-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all font-body-md"
          placeholder="Rechercher par thème, mots-clés, auteur..."
        />
      </div>
      <button
        type="button"
        onClick={onSubmit}
        className="bg-primary text-white px-stack-lg py-4 rounded-xl font-bold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
      >
        Rechercher
      </button>
    </div>
  );
}