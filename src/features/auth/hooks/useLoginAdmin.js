import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../api/authApi";
import { useAuth } from "./useAuth";
import { ROUTES } from "../../../router/paths";

export function useLoginAdmin() {
  const navigate = useNavigate();
  const { refetchUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.email) nextErrors.email = "L'email est requis.";
    if (!form.password) nextErrors.password = "Le mot de passe est requis.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function submit(e) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const data = await loginRequest({ email: form.email, password: form.password });

      // Sécurité : cette page est réservée à l'administration. Un compte
      // étudiant qui se connecte ici est refusé — il doit passer par /connexion-etudiant.
      // Contrôle fait AVANT de stocker le token, pour ne jamais persister
      // une session invalide pour cette page.
      if (data.user?.role !== "admin") {
        setServerError("Accès refusé. Cet espace est réservé à l'administration.");
        setLoading(false);
        return;
      }

      localStorage.setItem("mplus_token", data.token);
      await refetchUser(); // resynchronise le contexte d'auth global
      navigate(ROUTES.espaceAdmin);
    } catch (err) {
      if (err.response?.status === 422 || err.response?.status === 401) {
        setServerError("Email ou mot de passe incorrect.");
      } else {
        setServerError("Une erreur est survenue. Merci de réessayer.");
      }
    } finally {
      setLoading(false);
    }
  }

  return { form, updateField, errors, serverError, loading, submit };
}