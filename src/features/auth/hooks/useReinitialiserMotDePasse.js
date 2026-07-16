import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { reinitialiserMotDePasse } from "../api/authApi";
import { ROUTES } from "../../../router/paths";

export function useReinitialiserMotDePasse() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [form, setForm] = useState({ motDePasse: "", motDePasseConfirmation: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.motDePasse) {
      nextErrors.motDePasse = "Le mot de passe est requis.";
    } else if (form.motDePasse.length < 8) {
      nextErrors.motDePasse = "8 caractères minimum.";
    }
    if (form.motDePasseConfirmation !== form.motDePasse) {
      nextErrors.motDePasseConfirmation = "Les mots de passe ne correspondent pas.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function submit(e) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await reinitialiserMotDePasse({
        token,
        email,
        mot_de_passe: form.motDePasse,
        mot_de_passe_confirmation: form.motDePasseConfirmation,
      });
      setSuccess(true);
      setTimeout(() => navigate(ROUTES.connexionEtudiant), 3000);
    } catch (err) {
      if (err.response?.status === 422) {
        setServerError(
          "Ce lien n'est plus valide ou a expiré. Demandez un nouveau lien de réinitialisation."
        );
      } else {
        setServerError("Une erreur est survenue. Merci de réessayer.");
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    email,
    tokenPresent: Boolean(token) && Boolean(email),
    form,
    updateField,
    errors,
    serverError,
    loading,
    success,
    submit,
  };
}