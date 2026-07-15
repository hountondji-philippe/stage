import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { creerMemoire, modifierMemoire, getMemoireById } from "../api/memoiresApi";
import { ROUTES } from "../../../router/paths";

const INITIAL_DATA = {
  titre: "",
  resume: "",
  filiere_id: "",
  annee: "2025-2026",
  encadrant: "",
};

export function useDepotForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL_DATA);
  const [files, setFiles] = useState({ memoire: null, preuve: null });
  const [fileErrors, setFileErrors] = useState({ memoire: null, preuve: null });
  const [certifie, setCertifie] = useState(false);

  const [loadingInitial, setLoadingInitial] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [dirty, setDirty] = useState(false);

  // Mode modification : précharge les données existantes
  useEffect(() => {
    if (!isEditMode) return;
    let mounted = true;

    getMemoireById(id)
      .then((memoire) => {
        if (!mounted) return;
        setData({
          titre: memoire.titre || "",
          resume: memoire.resume || "",
          filiere_id: memoire.filiere_id || "",
          annee: memoire.annee || INITIAL_DATA.annee,
          encadrant: memoire.encadrant || "",
        });
        setFiles({
          memoire: memoire.fichier_memoire
            ? { name: memoire.fichier_memoire.split("/").pop(), existing: true }
            : null,
          preuve: memoire.fichier_preuve
            ? { name: memoire.fichier_preuve.split("/").pop(), existing: true }
            : null,
        });
      })
      .catch(() => mounted && setSubmitError("Impossible de charger ce dépôt."))
      .finally(() => mounted && setLoadingInitial(false));

    return () => {
      mounted = false;
    };
  }, [id, isEditMode]);

  function updateData(newData) {
    setData(newData);
    setDirty(true);
  }

  function handleFileChange(key, file, error) {
    setFiles((f) => ({ ...f, [key]: file }));
    setFileErrors((e) => ({ ...e, [key]: error }));
    setDirty(true);
  }

  const goToStep = useCallback((target) => setStep(target), []);
  const nextStep = useCallback(() => setStep((s) => Math.min(s + 1, 3)), []);
  const prevStep = useCallback(() => setStep((s) => Math.max(s - 1, 1)), []);

  function handleBreadcrumbClick() {
    if (dirty && !submitted) {
      const confirmLeave = confirm("Des modifications non enregistrées seront perdues. Continuer ?");
      if (!confirmLeave) return;
    }
    navigate(ROUTES.espaceEtudiant);
  }

  async function handleSubmit() {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("titre", data.titre);
      formData.append("resume", data.resume);
      formData.append("filiere_id", data.filiere_id);
      formData.append("annee", data.annee);
      formData.append("encadrant", data.encadrant);

      // On n'envoie le fichier que s'il a été (re)sélectionné —
      // en mode modification, un fichier "existing" reste tel quel côté serveur.
      if (files.memoire && !files.memoire.existing) {
        formData.append("fichier_memoire", files.memoire);
      }
      if (files.preuve && !files.preuve.existing) {
        formData.append("fichier_preuve", files.preuve);
      }

      if (isEditMode) {
        await modifierMemoire(id, formData);
      } else {
        await creerMemoire(formData);
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Une erreur est survenue lors de l'envoi. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  }

  return {
    isEditMode,
    step,
    data,
    updateData,
    files,
    fileErrors,
    handleFileChange,
    certifie,
    setCertifie,
    goToStep,
    nextStep,
    prevStep,
    handleBreadcrumbClick,
    handleSubmit,
    loadingInitial,
    submitting,
    submitError,
    submitted,
  };
}