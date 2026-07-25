import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login as loginRequest } from "../api/authApi";
import { useAuth } from "./useAuth";
import { ROUTES } from "../../../router/paths";

export function useLoginEtudiant() {
  const navigate = useNavigate();
  const location = useLocation();
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

      if (data.user?.role !== "etudiant") {
        setServerError(
          "Ce compte n'est pas un compte étudiant. Utilisez l'espace administrateur pour vous connecter."
        );
        setLoading(false);
        return;
      }

      localStorage.setItem("mplus_token", data.token);
      localStorage.removeItem("mplus_lecture_seule");
      await refetchUser();

      const from = location.state?.from;
      const destination = from ? `${from.pathname}${from.search || ""}` : ROUTES.espaceEtudiant;

      navigate(destination, { replace: true });
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