import { useNavigate } from "react-router-dom";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import EtudiantLayout from "../components/EtudiantLayout";
import Stepper from "../components/depot/Stepper";
import EtapeInformations from "../components/depot/EtapeInformations";
import EtapeDocuments from "../components/depot/EtapeDocuments";
import EtapeRecapitulatif from "../components/depot/EtapeRecapitulatif";
import Button from "../../../components/ui/Button";
import { useDepotForm } from "../hooks/useDepotForm";
import { useFilieres } from "../hooks/useFilieres";
import { ROUTES } from "../../../router/paths";

export default function DepotMemoirePage() {
  const navigate = useNavigate();
  const { filieres } = useFilieres();
  const {
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
  } = useDepotForm();

  const filiereNom = filieres.find((f) => String(f.id) === String(data.filiere_id))?.nom || "";

  if (submitted) {
    return (
      <EtudiantLayout>
        <div className="mx-auto flex max-w-[700px] flex-col items-center justify-center rounded-2xl bg-white px-6 py-20 text-center shadow-[0_4px_20px_rgba(19,36,107,0.08)]">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-[var(--color-primary)]">
            {isEditMode ? "Dépôt mis à jour avec succès" : "Dépôt envoyé avec succès"}
          </h2>
          <p className="mb-6 max-w-sm text-sm text-gray-500">
            Votre mémoire est maintenant en attente de validation par l'administration.
          </p>
          <Button variant="primary" onClick={() => navigate(ROUTES.espaceEtudiant)}>
            Retour à mes dépôts
          </Button>
        </div>
      </EtudiantLayout>
    );
  }

  if (loadingInitial) {
    return (
      <EtudiantLayout>
        <div className="rounded-2xl bg-white p-10 text-center text-gray-400 shadow-[0_4px_20px_rgba(19,36,107,0.06)]">
          Chargement du dépôt...
        </div>
      </EtudiantLayout>
    );
  }

  return (
    <EtudiantLayout>
      <div className="mx-auto max-w-[700px]">
        <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <button onClick={handleBreadcrumbClick} className="hover:text-[var(--color-primary)]">
            Mes dépôts
          </button>
          <ChevronRight size={14} />
          <span className="font-bold text-[var(--color-primary)]">
            {isEditMode ? "Modifier le dépôt" : "Nouveau dépôt"}
          </span>
        </nav>

        <header className="mb-8">
          <h1 className="mb-2 text-2xl font-extrabold text-[var(--color-primary)] sm:text-3xl">
            {isEditMode ? "Modifier votre mémoire" : "Déposer un nouveau mémoire"}
          </h1>
          <p className="text-gray-500">
            Remplissez les informations et joignez vos documents pour validation par le jury.
          </p>
        </header>

        <Stepper currentStep={step} />

        {step === 1 && <EtapeInformations data={data} onChange={updateData} onNext={nextStep} />}

        {step === 2 && (
          <EtapeDocuments
            files={files}
            errors={fileErrors}
            onFileChange={handleFileChange}
            onPrev={prevStep}
            onNext={nextStep}
          />
        )}

        {step === 3 && (
          <EtapeRecapitulatif
            data={data}
            files={files}
            filiereNom={filiereNom}
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
    </EtudiantLayout>
  );
}