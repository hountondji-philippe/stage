import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SuccessState() {
  return (
    <section className="flex flex-col items-center text-center">
      <div className="mb-6 w-20 h-20 bg-[#ECFDF5] rounded-full flex items-center justify-center">
        <CheckCircle2 className="w-10 h-10 text-[#059669]" />
      </div>
      <h2 className="text-2xl font-semibold text-[#000e4d] mb-2">Compte activé</h2>
      <p className="text-[#454651] mb-6">
        Votre compte étudiant est maintenant actif. Vous pouvez vous connecter et déposer votre mémoire.
      </p>
      <Link
        to="/connexion"
        className="w-full bg-[#000e4d] text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90
          transition-all active:scale-[0.98] text-center"
      >
        Se connecter
      </Link>
    </section>
  );
}
