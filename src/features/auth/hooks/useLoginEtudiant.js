import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../api/authApi";

export function useLoginEtudiant() {
  const navigate = useNavigate();
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

      // Sécurité : cette page est réservée aux étudiants. Un compte admin
      // qui se connecte ici est refusé — il doit passer par /connexion-admin.
      if (data.user?.role !== "etudiant") {
        setServerError(
          "Ce compte n'est pas un compte étudiant. Utilisez l'espace administrateur pour vous connecter."
        );
        setLoading(false);
        return;
      }

      localStorage.setItem("mplus_token", data.token);
      navigate("/etudiant/tableau-de-bord");
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