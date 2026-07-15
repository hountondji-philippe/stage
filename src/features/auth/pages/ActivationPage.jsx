import { GraduationCap } from 'lucide-react';
import { useActivation, ETATS } from '../hooks/useActivation';
import LoadingState from '../components/activation/LoadingState';
import SuccessState from '../components/activation/SuccessState';
import ErrorState from '../components/activation/ErrorState';

export default function ActivationPage() {
  const {
    etat,
    messageErreur,
    emailRenvoi,
    setEmailRenvoi,
    envoiEnCours,
    messageRenvoi,
    renvoyerLien,
  } = useActivation();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA]">
      <header className="flex justify-center items-center w-full py-10">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-[#000e4d]" />
          <h1 className="text-2xl font-bold text-[#000e4d]">MÉMOIRES+</h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-start px-4">
        <div
          className="w-full max-w-[480px] bg-white rounded-2xl p-8 md:p-10"
          style={{ boxShadow: '0px 4px 20px rgba(19, 36, 107, 0.05)' }}
        >
          {etat === ETATS.CHARGEMENT && <LoadingState />}
          {etat === ETATS.SUCCES && <SuccessState />}
          {etat === ETATS.ERREUR && (
            <ErrorState
              messageErreur={messageErreur}
              email={emailRenvoi}
              onChangeEmail={setEmailRenvoi}
              onRenvoyer={renvoyerLien}
              envoiEnCours={envoiEnCours}
              message={messageRenvoi}
            />
          )}
        </div>
      </main>

      <footer className="flex flex-col items-center gap-1 py-6 text-xs text-[#454651]">
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#000e4d] underline">Assistance</a>
          <a href="#" className="hover:text-[#000e4d] underline">Confidentialité</a>
          <a href="#" className="hover:text-[#000e4d] underline">Conditions</a>
        </div>
        <p>© 2026 MÉMOIRES+. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
