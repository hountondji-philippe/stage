import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { creerMemoire, modifierMemoire, getMemoireById, creerMemoireAdmin, getMesMemoires } from "../api/memoiresApi";
import { useAuth } from "../../auth/hooks/useAuth";
import { ROUTES } from "../../../router/paths";
const ANNEE_COURANTE = new Date().getFullYear().toString();

const INITIAL_DATA = {
  titre: "",
  resume: "",
  filiere_id: "",
  annee: ANNEE_COURANTE,
  encadrant: "",
};

export function useDepotForm(mode = "etudiant") {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = mode === "admin";
  const isEditMode = !isAdmin && Boolean(id);
  const totalSteps = 4;

  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL_DATA);
  const [etudiantAutoriseId, setEtudiantAutoriseId] = useState("");
  const [modeDepot, setModeDepot] = useState("seul");
  const [matriculeBinome, setMatriculeBinome] = useState("");
  const [etudiantBinome, setEtudiantBinome] = useState(null);
  const [files, setFiles] = useState({ memoire: null, preuve: null });
  const [fileErrors, setFileErrors] = useState({ memoire: null, preuve: null });
  const [certifie, setCertifie] = useState(false);

  const [loadingInitial, setLoadingInitial] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [createdMemoireId, setCreatedMemoireId] = useState(null);
  const [dirty, setDirty] = useState(false);

  const [loadingRestriction, setLoadingRestriction] = useState(!isAdmin && !isEditMode);
  const [depotExistant, setDepotExistant] = useState(false);

  useEffect(() => {
    if (isAdmin || isEditMode) {
      setLoadingRestriction(false);
      return;
    }

    let mounted = true;
    const niveauActuel = user?.etudiant_autorise?.niveau;

    getMesMemoires()
      .then((mesMemoires) => {
        if (!mounted) return;
        const existe = niveauActuel
          ? mesMemoires.some((m) => m.niveau === niveauActuel)
          : false;
        setDepotExistant(existe);
      })
      .catch(() => {})
      .finally(() => mounted && setLoadingRestriction(false));

    return () => {
      mounted = false;
    };
  }, [isAdmin, isEditMode, user]);

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
          cycle: memoire.cycle || "",
          sous_filiere_id: memoire.sous_filiere_id || "",
        });
        setFiles({
          memoire: memoire.fichier_memoire
            ? { name: memoire.fichier_memoire.split("/").pop(), existing: true }
            : null,
          preuve: memoire.fichier_preuve
            ? { name: memoire.fichier_preuve.split("/").pop(), existing: true }
            : null,
        });
        setModeDepot(memoire.mode_depot === "binome" ? "binome" : "seul");
        setMatriculeBinome(memoire.matricule_binome || "");
        if (memoire.nom_binome || memoire.prenom_binome) {
          setEtudiantBinome({ nom: memoire.nom_binome, prenom: memoire.prenom_binome, matricule: memoire.matricule_binome });
        }
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
    setDirty(true);
  }

  function updateModeDepot(value) {
    setModeDepot(value);
    setDirty(true);
  }

  function updateMatriculeBinome(matricule, etudiant) {
    setMatriculeBinome(matricule);
    setEtudiantBinome(etudiant || null);
    setDirty(true);
  }

  function handleFileChange(key, file, error) {
    setFiles((f) => ({ ...f, [key]: file }));
    setFileErrors((e) => ({ ...e, [key]: error }));
    setDirty(true);
  }

  const goToStep = useCallback((target) => setStep(target), []);
  const nextStep = useCallback(() => setStep((s) => Math.min(s + 1, totalSteps)), [totalSteps]);
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
      formData.append("annee", data.annee);
      formData.append("encadrant", data.encadrant);
      formData.append("cycle", data.cycle);
      if (data.sous_filiere_id) {
        formData.append("sous_filiere_id", data.sous_filiere_id);
      }

      formData.append("mode_depot", modeDepot === "seul" ? "unique" : "binome");
      if (modeDepot === "binome") {
        formData.append("matricule_binome", matriculeBinome);
      }

      if (isAdmin) {
        formData.append("etudiant_autorise_id", etudiantAutoriseId);
      }

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
        setCreatedMemoireId(id);
      } else {
        const result = await creerMemoire(formData);
        setCreatedMemoireId(result?.memoire?.id ?? result?.id ?? null);
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
    totalSteps,
    step,
    data,
    updateData,
    etudiantAutoriseId,
    updateEtudiantAutoriseId,
    modeDepot,
    updateModeDepot,
    matriculeBinome,
    etudiantBinome,
    updateMatriculeBinome,
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
    loadingRestriction,
    depotExistant,
    submitting,
    submitError,
    submitted,
    createdMemoireId,
  };
}