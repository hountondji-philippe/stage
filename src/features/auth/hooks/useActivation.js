import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { activerCompte as activerCompteApi, renvoyerLien as renvoyerLienApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../../../router/paths";

export const ETATS = {
  FORMULAIRE: "formulaire",
  INVALIDE: "invalide",
  DEJA_ACTIVE: "deja_active",
  NIVEAU_NON_AUTORISE: "niveau_non_autorise",
  EXPIRE: "expire",
};

export function useActivation() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { refetchUser } = useAuth();

  const [etat, setEtat] = useState(token ? ETATS.FORMULAIRE : ETATS.INVALIDE);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);

  const [matriculeRenvoi, setMatriculeRenvoi] = useState("");
  const [renvoiLoading, setRenvoiLoading] = useState(false);
  const [renvoiMessage, setRenvoiMessage] = useState(null);

  const activerCompte = async (e) => {
    e.preventDefault();
    setErreur(null);

    if (password.length < 8) {
      setErreur("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (password !== passwordConfirmation) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      const data = await activerCompteApi({ token, password, password_confirmation: passwordConfirmation });
      localStorage.setItem("mplus_token", data.token);
      await refetchUser();
      navigate(ROUTES.espaceEtudiant, { replace: true });
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data;

      if (status === 404) setEtat(ETATS.INVALIDE);
      else if (status === 409) setEtat(ETATS.DEJA_ACTIVE);
      else if (status === 403) setEtat(ETATS.NIVEAU_NON_AUTORISE);
      else if (status === 410) setEtat(ETATS.EXPIRE);
      else if (status === 422) setErreur(data?.errors ? Object.values(data.errors)[0]?.[0] : data?.message);
      else setErreur("Une erreur est survenue. Réessayez dans quelques instants.");
    } finally {
      setLoading(false);
    }
  };

  const renvoyerLien = async () => {
    if (!matriculeRenvoi.trim()) return;

    setRenvoiLoading(true);
    setRenvoiMessage(null);

    try {
      const data = await renvoyerLienApi(matriculeRenvoi.trim());
      setRenvoiMessage({ type: "succes", texte: data.message || "Un nouveau lien a été envoyé." });
    } catch (err) {
      setRenvoiMessage({ type: "erreur", texte: err.response?.data?.message || "Une erreur est survenue." });
    } finally {
      setRenvoiLoading(false);
    }
  };

  return {
    etat,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    loading,
    erreur,
    activerCompte,
    matriculeRenvoi,
    setMatriculeRenvoi,
    renvoiLoading,
    renvoiMessage,
    renvoyerLien,
  };
}