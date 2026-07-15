import { IdCard, Info, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MatriculeStep({ matricule, onChangeMatricule, onVerifier, loading, erreur }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onVerifier();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label htmlFor="matricule" className="block text-sm font-semibold text-[#454651]">
        Matricule
      </label>
      <div className="relative flex items-center">
        <IdCard className="absolute left-3 w-5 h-5 text-[#767682] pointer-events-none" />
        <input
          id="matricule"
          type="text"
          value={matricule}
          onChange={(e) => onChangeMatricule(e.target.value)}
          placeholder="Ex : 2021-00123"
          className="w-full pl-10 pr-32 py-3 bg-[#eff4ff] border border-[#c6c5d2] rounded-lg outline-none transition-all
            focus:ring-2 focus:ring-[#3d56bb] focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading || !matricule.trim()}
          className="absolute right-2 px-4 py-1.5 bg-[#13246b] text-white rounded-lg text-sm font-semibold
            hover:bg-[#000e4d] transition-colors active:scale-95 disabled:opacity-50 flex items-center gap-1"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Vérifier'}
        </button>
      </div>

      {erreur ? (
        <p className="text-xs text-[#ba1a1a] flex items-center gap-1 mt-2">
          <Info className="w-3.5 h-3.5 shrink-0" />
          {erreur.message}
        </p>
      ) : (
        <p className="text-xs text-[#767682] flex items-center gap-1 mt-2">
          <Info className="w-3.5 h-3.5 shrink-0" />
          Le matricule doit correspondre à la liste transmise par la scolarité
        </p>
      )}

      {erreur?.type === 'deja_active' && (
        <p className="text-sm pt-1">
          <Link to="/connexion" className="text-[#3d56bb] font-semibold underline">
            Aller à la connexion
          </Link>
        </p>
      )}
    </form>
  );
}
