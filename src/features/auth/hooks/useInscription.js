import { useState, useEffect } from "react";
import { verifierMatricule as verifierMatriculeApi, renvoyerLien as renvoyerLienApi } from "../api/authApi";

const DUREE_ATTENTE = 60; // secondes avant de pouvoir renvoyer le lien

function messageErreurParStatut(status, data) {
  switch (status) {
    case 404:
      return { message: "Vérifiez la saisie ou contactez la scolarité.", dejaActive: false };
    case 409:
      return { message: "Un compte existe déjà pour ce matricule.", dejaActive: true };
    case 403:
      return {
        message: "L'inscription en ligne est réservée aux étudiants de Licence 3, Master 1 et Master 2.",
        dejaActive: false,
      };
    case 422:
      return {
        message: data?.errors ? Object.values(data.errors)[0]?.[0] : data?.message || "Données invalides.",
        dejaActive: false,
      };
    default:
      return { message: "Une erreur est survenue. Réessayez dans quelques instants.", dejaActive: false };
  }
}

export function useInscription() {
  const [matricule, setMatricule] = useState("");
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null); // { message, dejaActive }
  const [emailEnvoye, setEmailEnvoye] = useState(false);

  const [renvoiLoading, setRenvoiLoading] = useState(false);
  const [renvoiMessage, setRenvoiMessage] = useState(null); // { type: 'succes' | 'erreur', texte }
  const [chrono, setChrono] = useState(0);

  // Décompte du chrono de patience avant de pouvoir renvoyer le lien
  useEffect(() => {
    if (chrono <= 0) return;
    const interval = setInterval(() => {
      setChrono((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [chrono]);

  const verifierMatricule = async () => {
    if (!matricule.trim()) return;

    setLoading(true);
    setErreur(null);

    try {
      await verifierMatriculeApi(matricule.trim());
      setEmailEnvoye(true);
      setChrono(DUREE_ATTENTE);
    } catch (err) {
      setErreur(messageErreurParStatut(err.response?.status, err.response?.data));
    } finally {
      setLoading(false);
    }
  };

  const renvoyerLien = async () => {
    if (chrono > 0) return;

    setRenvoiLoading(true);
    setRenvoiMessage(null);

    try {
      const data = await renvoyerLienApi(matricule.trim());
      setRenvoiMessage({ type: "succes", texte: data.message || "Un nouveau lien a été envoyé." });
      setChrono(DUREE_ATTENTE);
    } catch (err) {
      const { message } = messageErreurParStatut(err.response?.status, err.response?.data);
      setRenvoiMessage({ type: "erreur", texte: message });
    } finally {
      setRenvoiLoading(false);
    }
  };

  return {
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
  };
}