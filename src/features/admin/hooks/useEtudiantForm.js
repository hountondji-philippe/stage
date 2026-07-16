import { useEffect, useState } from "react";
import { createEtudiant, updateEtudiant } from "../api/etudiantsAutorisesApi";

const EMPTY_FORM = {
  matricule: "",
  annee_scolaire: "",
  niveau: "",
  nom: "",
  prenom: "",
  email: "",
  filiere_id: "",
};

/**
 * Gère le formulaire de la modale "Ajouter / Modifier un étudiant".
 * Passer `etudiant` (objet existant) pour basculer en mode édition.
 */
export function useEtudiantForm({ etudiant, onSuccess }) {
  const isEditing = Boolean(etudiant?.id);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(
      etudiant
        ? {
            matricule: etudiant.matricule ?? "",
            annee_scolaire: etudiant.annee_scolaire ?? "",
            niveau: etudiant.niveau ?? "",
            nom: etudiant.nom ?? "",
            prenom: etudiant.prenom ?? "",
            email: etudiant.email ?? "",
            // etudiant.filiere est un objet imbriqué (Laravel : with('filiere'))
            filiere_id: etudiant.filiere_id ?? etudiant.filiere?.id ?? "",
          }
        : EMPTY_FORM
    );

    setErrors({});
    setServerError("");
  }, [etudiant]);

  function updateField(name, value) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.matricule)
      nextErrors.matricule = "Le matricule est requis.";

    if (!form.annee_scolaire)
      nextErrors.annee_scolaire = "L'année scolaire est requise.";

    if (!form.niveau)
      nextErrors.niveau = "Le niveau est requis.";

    if (!form.nom)
      nextErrors.nom = "Le nom est requis.";

    if (!form.prenom)
      nextErrors.prenom = "Le prénom est requis.";

    if (!form.email)
      nextErrors.email = "L'email est requis.";

    if (!form.filiere_id)
      nextErrors.filiere_id = "La filière est requise.";

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function submit(e) {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setLoading(true);

    try {
      if (isEditing) {
        await updateEtudiant(etudiant.id, form);
      } else {
        await createEtudiant(form);
      }

      onSuccess?.();
    } catch (err) {
      if (err.response?.status === 422) {
        const backendErrors = err.response.data.errors ?? {};

        const flatErrors = Object.fromEntries(
          Object.entries(backendErrors).map(([field, messages]) => [
            field,
            Array.isArray(messages) ? messages[0] : messages,
          ])
        );

        setErrors(flatErrors);
      } else if (err.response?.data?.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError("Une erreur est survenue. Merci de réessayer.");
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    updateField,
    errors,
    serverError,
    loading,
    isEditing,
    submit,
  };
}