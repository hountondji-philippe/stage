import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { authApi } from '../api/authApi';

export const ETATS = {
  CHARGEMENT: 'chargement',
  SUCCES: 'succes',
  ERREUR: 'erreur',
};

/**
 * Écran 5 — Activation de compte.
 * Aucune action de l'utilisateur : l'ouverture du lien (?token=...) déclenche
 * immédiatement POST /auth/activer-compte au montage du composant.
 */
export function useActivation() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [etat, setEtat] = useState(ETATS.CHARGEMENT);
  const [messageErreur, setMessageErreur] = useState('');

  const [emailRenvoi, setEmailRenvoi] = useState('');
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [messageRenvoi, setMessageRenvoi] = useState(null);

  useEffect(() => {
    if (!token) {
      setEtat(ETATS.ERREUR);
      setMessageErreur('Lien invalide.');
      return;
    }

    let annule = false;

    authApi
      .activerCompte(token)
      .then((data) => {
        if (annule) return;
        if (data.success) {
          setEtat(ETATS.SUCCES);
        } else {
          setEtat(ETATS.ERREUR);
          setMessageErreur(data.message || 'Lien expiré.');
        }
      })
      .catch((err) => {
        if (annule) return;
        setEtat(ETATS.ERREUR);
        setMessageErreur(err.message);
      });

    return () => {
      annule = true;
    };
  }, [token]);

  const renvoyerLien = async () => {
    if (!emailRenvoi.trim()) return;

    setEnvoiEnCours(true);
    setMessageRenvoi(null);

    try {
      const data = await authApi.renvoyerLien(emailRenvoi.trim());
      setMessageRenvoi({ type: 'succes', texte: data.message || 'Lien renvoyé, vérifiez votre boîte mail.' });
    } catch (err) {
      setMessageRenvoi({ type: 'erreur', texte: err.message });
    } finally {
      setEnvoiEnCours(false);
    }
  };

  return {
    etat,
    messageErreur,
    emailRenvoi,
    setEmailRenvoi,
    envoiEnCours,
    messageRenvoi,
    renvoyerLien,
  };
}
