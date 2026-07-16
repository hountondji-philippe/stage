import { GraduationCap } from "lucide-react";
import { useInscription } from "../hooks/useInscription";
import MatriculeStep from "../components/MatriculeStep";
import BrandPanel from "../components/BrandPanel";

export default function InscriptionPage() {
  const {
    matricule,
    setMatricule,
    loading,
    erreur,
    emailEnvoye,
    verifierMatricule,
    renvoiLoading,
    renvoiMessage,
    chrono,
    renvoyerLien,
  } = useInscription();

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-0 md:items-stretch">
      <BrandPanel
        title="Rejoignez la communauté des auteurs de mémoires de l'ENEAM"
        linkText="Déjà inscrit ? Connectez-vous"
        linkTo="/connexion-etudiant"
        badgeText="Espace étudiant"
      />

      <div
        className="relative z-10 w-full max-w-md md:max-w-none md:w-[55%] md:ml-auto
          bg-white rounded-2xl md:rounded-none shadow-xl md:shadow-none
          flex flex-col justify-center items-center p-6 md:p-24"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="md:hidden flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="w-7 h-7 text-[var(--color-primary)]" />
            <span className="font-bold text-[var(--color-primary)]">MÉMOIRES+</span>
          </div>

          {!emailEnvoye && (
            <div>
              <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-2">
                Créer mon compte étudiant
              </h3>
              <p className="text-gray-600">
                Saisissez votre matricule pour commencer votre inscription.
              </p>
            </div>
          )}

          <MatriculeStep
            matricule={matricule}
            onChangeMatricule={setMatricule}
            onVerifier={verifierMatricule}
            loading={loading}
            erreur={erreur}
            emailEnvoye={emailEnvoye}
            chrono={chrono}
            renvoiLoading={renvoiLoading}
            renvoiMessage={renvoiMessage}
            onRenvoyer={renvoyerLien}
          />
        </div>
      </div>
    </div>
  );
}