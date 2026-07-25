import { useState, useEffect } from "react";
import {
  verifierMatricule as verifierMatriculeApi,
  verifierCodeL2 as verifierCodeL2Api,
  renvoyerLien as renvoyerLienApi,
} from "../api/authApi";

const DUREE_ATTENTE = 60; // secondes avant de pouvoir renvoyer le lien/code

function messageErreurParStatut(status, data) {
  switch (status) {
    case 404:
      return { message: data?.message || "Vérifiez la saisie ou contactez la scolarité.", dejaActive: false };
    case 409:
      return { message: data?.message || "Un compte existe déjà pour ce matricule.", dejaActive: true };
    case 403:
      return { message: data?.message || "L'accès n'est pas autorisé pour ce niveau.", dejaActive: false };
    case 422:
      return {
        message: data?.errors ? Object.values(data.errors)[0]?.[0] : data?.message || "Données invalides.",
        dejaActive: false,
      };
    default:
      return { message: "Une erreur est survenue. Réessayez dans quelques instants.", dejaActive: false };
  }
}

function messageErreurCodeL2(status, data) {
  switch (status) {
    case 410:
      return "Ce code a expiré. Demandez-en un nouveau.";
    case 422:
      return data?.message || "Code incorrect.";
    case 404:
      return data?.message || "Aucune demande en attente pour ce matricule.";
    default:
      return "Une erreur est survenue. Réessayez.";
  }
}

export function useInscription() {
  const [matricule, setMatricule] = useState("");
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null); // { message, dejaActive }

  // "saisie" | "lien_envoye" | "code_l2"
  const [etape, setEtape] = useState("saisie");

  const [renvoiLoading, setRenvoiLoading] = useState(false);
  const [renvoiMessage, setRenvoiMessage] = useState(null); // { type: 'succes' | 'erreur', texte }
  const [chrono, setChrono] = useState(0);

  // Étape code L2
  const [codeL2, setCodeL2] = useState("");
  const [codeL2Loading, setCodeL2Loading] = useState(false);
  const [codeL2Erreur, setCodeL2Erreur] = useState(null);

  // Décompte du chrono de patience avant de pouvoir renvoyer le lien/code
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
      const data = await verifierMatriculeApi(matricule.trim());
      if (data.type === "code_l2") {
        setEtape("code_l2");
      } else {
        setEtape("lien_envoye");
      }
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

  // Pour l'étape L2 : redemander un code (relance verifierMatricule, qui
  // regénère et renvoie un nouveau code par email côté backend)
  const renvoyerCodeL2 = async () => {
    if (chrono > 0) return;

    setRenvoiLoading(true);
    setRenvoiMessage(null);

    try {
      await verifierMatriculeApi(matricule.trim());
      setRenvoiMessage({ type: "succes", texte: "Un nouveau code a été envoyé." });
      setChrono(DUREE_ATTENTE);
    } catch (err) {
      const { message } = messageErreurParStatut(err.response?.status, err.response?.data);
      setRenvoiMessage({ type: "erreur", texte: message });
    } finally {
      setRenvoiLoading(false);
    }
  };

  /**
   * Vérifie le code L2 saisi. Retourne true en cas de succès (le token est
   * déjà stocké) — l'appelant (page) doit alors naviguer vers l'accueil.
   * Retourne false en cas d'échec (l'erreur est déjà dans codeL2Erreur).
   */
  const verifierCode = async () => {
    if (codeL2.trim().length !== 6) return false;

    setCodeL2Loading(true);
    setCodeL2Erreur(null);

    try {
      const data = await verifierCodeL2Api({ matricule: matricule.trim(), code: codeL2.trim() });
      // Session lecture-seule 24h — clé partagée avec apiClient, +
      // flag dédié pour que le reste du front sache que ce n'est PAS
      // un compte réel (ne pas appeler /auth/me avec ce token).
      localStorage.setItem("mplus_token", data.token);
      localStorage.setItem("mplus_lecture_seule", "true");
      return true;
    } catch (err) {
      setCodeL2Erreur(messageErreurCodeL2(err.response?.status, err.response?.data));
      return false;
    } finally {
      setCodeL2Loading(false);
    }
  };

  return {
    matricule,
    setMatricule,
    loading,
    erreur,
    etape,
    verifierMatricule,
    renvoiLoading,
    renvoiMessage,
    chrono,
    renvoyerLien,
    renvoyerCodeL2,
    codeL2,
    setCodeL2,
    codeL2Loading,
    codeL2Erreur,
    verifierCode,
  };
}