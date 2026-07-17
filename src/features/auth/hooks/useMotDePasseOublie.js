import { useState } from "react";
import { demanderReinitialisation } from "../api/authApi";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useMotDePasseOublie() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function updateEmail(value) {
    setEmail(value);
    setError("");
  }

  function validate() {
    if (!email) {
      setError("L'email est requis.");
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError("Entrez une adresse email valide.");
      return false;
    }
    return true;
  }

  async function submit(e) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await demanderReinitialisation(email);
      // Le backend répond toujours 200, que l'email existe ou non (sécurité voulue)
      setSent(true);
    } catch (err) {
      if (err.response?.status === 422) {
        setError(err.response.data?.errors?.email?.[0] || "Entrez une adresse email valide.");
      } else if (!err.response) {
        setServerError(
          "Impossible de contacter le serveur. Vérifiez votre connexion ou réessayez plus tard."
        );
      } else {
        setServerError("Une erreur est survenue. Merci de réessayer.");
      }
    } finally {
      setLoading(false);
    }
  }

  return { email, updateEmail, error, serverError, loading, sent, submit };
}