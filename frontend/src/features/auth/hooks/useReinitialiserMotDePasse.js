import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { reinitialiserMotDePasse } from "../api/authApi";
import { ROUTES } from "../../../router/paths";

export function useReinitialiserMotDePasse() {
  const navigate = useNavigate();
  const { token: tokenParam } = useParams();
  const [searchParams] = useSearchParams();
  const token = tokenParam || "";
  const email = searchParams.get("email") || "";

  const [form, setForm] = useState({ motDePasse: "", motDePasseConfirmation: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tokenInvalide, setTokenInvalide] = useState(false);

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

  useEffect(() => {
    if (!success) return;
    const timeout = setTimeout(() => navigate(ROUTES.connexionEtudiant), 3000);
    return () => clearTimeout(timeout);
  }, [success, navigate]);

  async function submit(e) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await reinitialiserMotDePasse({
        token,
        email,
        password: form.motDePasse,
        password_confirmation: form.motDePasseConfirmation,
      });
      setSuccess(true);
    } catch (err) {
      const status = err.response?.status;
      if (status === 404 || status === 410) {
        setTokenInvalide(true);
      } else if (status === 422) {
        const data = err.response.data;
        const champErreurs = {};
        if (data?.errors?.password) champErreurs.motDePasse = data.errors.password[0];
        if (data?.errors?.password_confirmation) {
          champErreurs.motDePasseConfirmation = data.errors.password_confirmation[0];
        }
        if (Object.keys(champErreurs).length > 0) setErrors(champErreurs);
        else setServerError(data?.message || "Données invalides.");
      } else {
        setServerError("Une erreur est survenue. Merci de réessayer.");
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    email,
    tokenPresent: Boolean(token) && Boolean(email) && !tokenInvalide,
    form,
    updateField,
    errors,
    serverError,
    loading,
    success,
    submit,
  };
}