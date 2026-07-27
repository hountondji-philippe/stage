import { useNavigate } from "react-router-dom";
import { ChevronRight, CheckCircle2, Lock } from "lucide-react";
import EtudiantLayout from "../components/EtudiantLayout";
import AdminLayout from "../../admin/components/AdminLayout";
import Stepper from "../components/depot/Stepper";
import SelectionAuteur from "../components/depot/SelectionAuteur";
import EtapeInformations from "../components/depot/EtapeInformations";
import EtapeDocuments from "../components/depot/EtapeDocuments";
import EtapeRecapitulatif from "../components/depot/EtapeRecapitulatif";
import Button from "../../../components/ui/Button";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import { useDepotForm } from "../hooks/useDepotForm";
import { useFilieres } from "../hooks/useFilieres";
import { usePeriodeDepot } from "../hooks/usePeriodeDepot";
import { useAuth } from "../../auth/hooks/useAuth";
import { ROUTES } from "../../../router/paths";

const LABELS_ETUDIANT = ["Sélection", "Informations", "Documents", "Récapitulatif"];
const LABELS_ADMIN = ["Sélection auteur", "Informations", "Documents", "Récapitulatif"];

export default function DepotMemoirePage({ mode = "etudiant" }) {
  const navigate = useNavigate();
  const isAdmin = mode === "admin";
  const Layout = isAdmin ? AdminLayout : EtudiantLayout;
  const labels = isAdmin ? LABELS_ADMIN : LABELS_ETUDIANT;

  const { user } = useAuth();
  const currentUserMatricule = user?.etudiant_autorise?.matricule;

  const { filieres } = useFilieres();
  // "cycle" ajouté : déduit automatiquement du niveau de l'étudiant
  // connecté (voir usePeriodeDepot.js), utilisé pour verrouiller le
  // champ Cycle dans EtapeInformations côté étudiant.
  const { ouverte: periodeOuverte, cycle: cycleDeduit, loading: loadingPeriode } = usePeriodeDepot();

  const {
    isEditMode,
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
  } = useDepotForm(mode);

  const filiereNom = filieres.find((f) => String(f.id) === String(data.filiere_id))?.nom || "";

  const chargementBloquant = loadingInitial || (!isAdmin && loadingPeriode) || loadingRestriction;

  if (chargementBloquant) {
    return (
      <Layout>
        <div className="relative min-h-[400px]">
          <LoadingScreen fullScreen={false} message="Chargement du dépôt..." />
        </div>
      </Layout>
    );
  }

  if (!isAdmin && !isEditMode && periodeOuverte === false) {
    return (
      <Layout>
        <div className="mx-auto flex max-w-[700px] flex-col items-center justify-center rounded-2xl bg-white px-6 py-20 text-center shadow-[0_4px_20px_rgba(19,36,107,0.08)]">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Lock size={32} className="text-gray-400" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-[var(--color-primary)]">Dépôt actuellement fermé</h2>
          <p className="mb-6 max-w-sm text-sm text-gray-500">
            La période de dépôt des mémoires n'est pas ouverte pour le moment. Consultez les actualités pour
            connaître la prochaine ouverture.
          </p>
          <Button variant="primary" onClick={() => navigate(ROUTES.espaceEtudiant)}>
            Retour à mes dépôts
          </Button>
        </div>
      </Layout>
    );
  }

  if (!isAdmin && !isEditMode && depotExistant) {
    return (
      <Layout>
        <div className="mx-auto flex max-w-[700px] flex-col items-center justify-center rounded-2xl bg-white px-6 py-20 text-center shadow-[0_4px_20px_rgba(19,36,107,0.08)]">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Lock size={32} className="text-gray-400" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-[var(--color-primary)]">
            Vous avez déjà un dépôt pour ce niveau
          </h2>
          <p className="mb-6 max-w-sm text-sm text-gray-500">
            Un seul dépôt est autorisé par niveau académique. En cas de rejet, modifiez votre dépôt existant
            plutôt que d'en créer un nouveau.
          </p>
          <Button variant="primary" onClick={() => navigate(ROUTES.espaceEtudiant)}>
            Retour à mes dépôts
          </Button>
        </div>
      </Layout>
    );
  }

  if (submitted) {
    return (
      <Layout>
        <div className="mx-auto flex max-w-[700px] flex-col items-center justify-center rounded-2xl bg-white px-6 py-20 text-center shadow-[0_4px_20px_rgba(19,36,107,0.08)]">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-[var(--color-primary)]">
            {isAdmin
              ? "Mémoire ajouté avec succès"
              : isEditMode
              ? "Dépôt mis à jour avec succès"
              : "Dépôt envoyé avec succès"}
          </h2>
          <p className="mb-6 max-w-sm text-sm text-gray-500">
            {isAdmin
              ? "Le mémoire a été enregistré pour l'étudiant sélectionné."
              : "Votre mémoire est maintenant en attente de validation par l'administration."}
          </p>

          

          <Button
            variant="primary"
            onClick={() => navigate(isAdmin ? "/admin/tableau-de-bord" : ROUTES.espaceEtudiant)}
          >
            {isAdmin ? "Retour au tableau de bord" : "Retour à mes dépôts"}
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-[700px]">
        <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <button onClick={handleBreadcrumbClick} className="hover:text-[var(--color-primary)]">
            {isAdmin ? "Tableau de bord" : "Mes dépôts"}
          </button>
          <ChevronRight size={14} />
          <span className="font-bold text-[var(--color-primary)]">
            {isAdmin ? "Ajouter un mémoire" : isEditMode ? "Modifier le dépôt" : "Nouveau dépôt"}
          </span>
        </nav>

        <header className="mb-8">
          <h1 className="mb-2 text-2xl font-extrabold text-[var(--color-primary)] sm:text-3xl">
            {isAdmin
              ? "Ajouter un mémoire manuellement"
              : isEditMode
              ? "Modifier votre mémoire"
              : "Déposer un nouveau mémoire"}
          </h1>
          <p className="text-gray-500">
            {isAdmin
              ? "Ce formulaire enregistre un mémoire pour un étudiant tiers (dépôt exceptionnel)."
              : "Remplissez les informations et joignez vos documents pour validation par le jury."}
          </p>
        </header>

        <Stepper currentStep={step} labels={labels} />

        {step === 1 && (
          <SelectionAuteur
            mode={mode}
            modeDepot={modeDepot}
            onModeDepotChange={updateModeDepot}
            auteurId={etudiantAutoriseId}
            onAuteurChange={updateEtudiantAutoriseId}
            matriculeBinome={matriculeBinome}
            onMatriculeBinomeChange={updateMatriculeBinome}
            currentUserMatricule={currentUserMatricule}
            onNext={nextStep}
          />
        )}
        {step === 2 && (
          <EtapeInformations
            data={data}
            onChange={updateData}
            onNext={nextStep}
            onPrev={prevStep}
            cycleImpose={!isAdmin ? cycleDeduit : null}
          />
        )}
        {step === 3 && (
          <EtapeDocuments
            files={files}
            errors={fileErrors}
            onFileChange={handleFileChange}
            onPrev={prevStep}
            onNext={nextStep}
          />
        )}
        {step === 4 && (
          <EtapeRecapitulatif
            data={data}
            files={files}
            filiereNom={filiereNom}
            modeDepot={modeDepot}
            etudiantBinome={etudiantBinome}
            certifie={certifie}
            onCertifieChange={setCertifie}
            onEditStep={goToStep}
            onPrev={prevStep}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitError={submitError}
          />
        )}
      </div>
    </Layout>
  );
}