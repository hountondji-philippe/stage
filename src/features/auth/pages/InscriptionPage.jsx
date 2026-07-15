import { GraduationCap, MailCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandPanel from '../components/BrandPanel';
import MatriculeStep from '../components/MatriculeStep';
import CompteStep from "../components/CompteStep";
import { useInscription } from '../hooks/useInscription';

export default function InscriptionPage() {
  const {
    step,
    matricule,
    setMatricule,
    nom,
    emailSuggere,
    loadingMatricule,
    erreurMatricule,
    loadingCompte,
    erreurCompte,
    emailEnvoye,
    verifierMatricule,
    creerCompte,
  } = useInscription();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <BrandPanel
        title="Rejoignez la communauté des auteurs de mémoires de l'ENEAM"
        linkText="Déjà inscrit ? Connectez-vous"
        linkTo="/connexion"
      />

      <div className="md:w-[55%] bg-white flex flex-col justify-center items-center p-6 md:p-24">
        <div className="w-full max-w-md space-y-8">
          <div className="md:hidden flex items-center gap-2 mb-4">
            <GraduationCap className="w-7 h-7 text-[#000e4d]" />
            <span className="font-bold text-[#000e4d]">MÉMOIRES+</span>
          </div>

          {emailEnvoye ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center">
                <MailCheck className="w-8 h-8 text-[#059669]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#121c2a]">Vérifiez votre boîte mail</h3>
              <p className="text-[#454651]">
                Un email d'activation vient de vous être envoyé. Cliquez sur le lien qu'il contient
                pour activer votre compte.
              </p>
              <Link to="/connexion" className="inline-block text-[#000e4d] font-semibold underline">
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <>
              <div>
                <h3 className="text-2xl font-semibold text-[#121c2a] mb-2">Créer mon compte étudiant</h3>
                <p className="text-[#454651]">
                  {step === 1
                    ? "Vérifiez d'abord votre matricule pour continuer"
                    : 'Complétez vos informations de connexion'}
                </p>
              </div>

              <div className="hidden md:flex items-center gap-4">
                <StepBadge active={step === 1} label="Matricule" index={1} />
                <div className="flex-grow h-px bg-[#c6c5d2]" />
                <StepBadge active={step === 2} label="Compte" index={2} />
              </div>

              {step === 1 ? (
  <MatriculeStep
    matricule={matricule}
    onChangeMatricule={setMatricule}
    onVerifier={verifierMatricule}
    loading={loadingMatricule}
    erreur={erreurMatricule}
  />
) : (
  <CompteStep
    nom={nom}
    emailSuggere={emailSuggere}
    onCreerCompte={creerCompte}
    loading={loadingCompte}
    erreur={erreurCompte}
  />
)}
            </>
          )}

          <p className="text-center text-xs text-[#767682] pt-4">
            Besoin d'aide ?{' '}
            <a href="#" className="text-[#3d56bb] font-bold hover:underline">
              Contactez le Help Desk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function StepBadge({ active, label, index }) {
  return (
    <div className={`flex items-center gap-2 text-sm font-semibold ${active ? 'text-[#000e4d]' : 'text-[#767682]'}`}>
      <span
        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
          active ? 'bg-[#000e4d] text-white' : 'border border-[#767682]'
        }`}
      >
        {index}
      </span>
      <span>{label}</span>
    </div>
  );
}
