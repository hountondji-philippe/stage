import { useState } from 'react';
import { Search } from 'lucide-react';
import AdvancedFilters from './AdvancedFilters';

export default function SearchSection({ onSearch, filieres }) {
  const [terme, setTerme] = useState('');
  const [filters, setFilters] = useState({ recherche: '', filiere_id: '', annee: '' });

  // Recherche déclenchée uniquement au clic ou à l'appui sur Entrée
  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = { ...filters, recherche: terme };
    setFilters(updated);
    onSearch(updated);
  };

  // Les filtres avancés déclenchent la recherche immédiatement au clic sur "Appliquer"
  const updateFilters = (newFilters) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onSearch(updated);
  };

  return (
    <section className="max-w-4xl mx-auto relative px-4 md:px-0 -mt-16">
      <div className="bg-white rounded-2xl shadow-[0px_4px_20px_rgba(19,36,107,0.08)] p-8 border border-gray-100">

        {/* Recherche par texte */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={terme}
              onChange={(e) => setTerme(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition-all text-base"
              placeholder="Rechercher par thème, mots-clés, auteur..."
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
          >
            Rechercher
          </button>
        </form>

        {/* Filtres Avancés */}
        <div className="border-t border-gray-100 pt-8">
          <AdvancedFilters filieres={filieres} onFilter={updateFilters} />
        </div>
      </div>
    </section>
  );
}