import { useState } from 'react';
import { authApi } from '../api/authApi';

/**
 * Écran 4 — Inscription par matricule (2 étapes) :
 * 1. Matricule -> POST verifier-matricule
 * 2. Email + mot de passe + conditions -> POST creer-compte (envoie l'email d'activation)
 */
export function useInscription() {
  const [step, setStep] = useState(1);
  const [matricule, setMatricule] = useState('');
  const [nom, setNom] = useState('');
  const [emailSuggere, setEmailSuggere] = useState('');

  const [loadingMatricule, setLoadingMatricule] = useState(false);
  const [erreurMatricule, setErreurMatricule] = useState(null); // { alreadyActivated, message }

  const [loadingCompte, setLoadingCompte] = useState(false);
  const [erreurCompte, setErreurCompte] = useState(null);
  const [emailEnvoye, setEmailEnvoye] = useState(false);

  const verifierMatricule = async () => {
    if (!matricule.trim()) return;

    setLoadingMatricule(true);
    setErreurMatricule(null);

    try {
      const data = await authApi.verifierMatricule(matricule.trim());

      if (!data.status) {
        setErreurMatricule({
          alreadyActivated: !!data.alreadyActivated,
          message: data.alreadyActivated
            ? 'Votre compte est déjà activé.'
            : data.message || 'Matricule introuvable.',
        });
        return;
      }

      setNom(data.nom || '');
      setEmailSuggere(data.email || '');
      setStep(2);
    } catch (err) {
      setErreurMatricule({ alreadyActivated: false, message: err.message });
    } finally {
      setLoadingMatricule(false);
    }
  };

  const creerCompte = async ({ email, password, passwordConfirmation, accepteConditions }) => {
    if (!accepteConditions) return;

    setLoadingCompte(true);
    setErreurCompte(null);

    try {
      await authApi.creerCompte({ matricule, email, password, passwordConfirmation });
      setEmailEnvoye(true);
    } catch (err) {
      setErreurCompte(err);
    } finally {
      setLoadingCompte(false);
    }
  };

  return {
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
  };
}
