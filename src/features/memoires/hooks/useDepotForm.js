import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { creerMemoire, modifierMemoire, getMemoireById, creerMemoireAdmin } from "../api/memoiresApi";
import { ROUTES } from "../../../router/paths";
const ANNEE_COURANTE = new Date().getFullYear().toString();

const INITIAL_DATA = {
  titre: "",
  resume: "",
  filiere_id: "",
  cycle: "",
  annee: ANNEE_COURANTE,
  encadrant: "",
};

/**
 * @param {"etudiant"|"admin"} mode - "etudiant" : dépôt par soi-même (peut
 * éditer un dépôt existant). "admin" : ajout manuel pour un étudiant tiers
 * (création uniquement, pas d'édition, champ auteur obligatoire).
 */
export function useDepotForm(mode = "etudiant") {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAdmin = mode === "admin";
  const isEditMode = !isAdmin && Boolean(id);

  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL_DATA);
  const [etudiantAutoriseId, setEtudiantAutoriseId] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [files, setFiles] = useState({ memoire: null, preuve: null });
  const [fileErrors, setFileErrors] = useState({ memoire: null, preuve: null });
  const [certifie, setCertifie] = useState(false);

  const [loadingInitial, setLoadingInitial] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [dirty, setDirty] = useState(false);

  // Mode modification (étudiant uniquement) : précharge les données existantes
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
          cycle: memoire.cycle || "",
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

  function updateEtudiantAutoriseId(value) {
    setEtudiantAutoriseId(value);
    setAuthorError("");
    setDirty(true);
  }

  function handleFileChange(key, file, error) {
    setFiles((f) => ({ ...f, [key]: file }));
    setFileErrors((e) => ({ ...e, [key]: error }));
    setDirty(true);
  }

  const goToStep = useCallback((target) => setStep(target), []);

  function nextStep() {
    // En mode admin, on bloque le passage à l'étape suivante tant que
    // l'auteur n'est pas sélectionné (dès l'étape 1 "Informations").
    if (isAdmin && step === 1 && !etudiantAutoriseId) {
      setAuthorError("Sélectionnez l'étudiant auteur avant de continuer.");
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  }
  const prevStep = useCallback(() => setStep((s) => Math.max(s - 1, 1)), []);

  function handleBreadcrumbClick() {
    if (dirty && !submitted) {
      const confirmLeave = confirm("Des modifications non enregistrées seront perdues. Continuer ?");
      if (!confirmLeave) return;
    }
    navigate(isAdmin ? "/admin/tableau-de-bord" : ROUTES.espaceEtudiant);
  }

  async function handleSubmit() {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("titre", data.titre);
      formData.append("resume", data.resume);
      formData.append("filiere_id", data.filiere_id);
      formData.append("cycle", data.cycle);
      formData.append("annee", data.annee);
      formData.append("encadrant", data.encadrant);

      if (isAdmin) {
        formData.append("etudiant_autorise_id", etudiantAutoriseId);
      }

      // On n'envoie le fichier que s'il a été (re)sélectionné —
      // en mode modification, un fichier "existing" reste tel quel côté serveur.
      if (files.memoire && !files.memoire.existing) {
        formData.append("fichier_memoire", files.memoire);
      }
      if (files.preuve && !files.preuve.existing) {
        formData.append("fichier_preuve", files.preuve);
      }

      if (isAdmin) {
        await creerMemoireAdmin(formData);
      } else if (isEditMode) {
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
    isAdmin,
    step,
    data,
    updateData,
    etudiantAutoriseId,
    updateEtudiantAutoriseId,
    authorError,
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