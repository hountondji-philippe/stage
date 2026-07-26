import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import EtudiantsToolbar from "../components/EtudiantsToolbar";
import StatutTabsEtudiants from "../components/StatutTabsEtudiants";
import BulkActionsBar from "../components/BulkActionsBar";
import EtudiantsListe from "../components/EtudiantsListe";
import ValiderAnneeModal from "../components/ValiderAnneeModal";
import ImportModal from "../components/ImportModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import { useEtudiantsAutorises } from "../hooks/useEtudiantsAutorises";

export default function EtudiantsAutorisesPage() {
  const {
    etudiants,
    loading,
    error,
    search,
    setSearch,
    filiere,
    setFiliere,
    statutFiltre,
    setStatutFiltre,
    selectedIds,
    allSelected,
    toggleSelected,
    toggleSelectAll,
    clearSelection,
    removeOne,
    removeSelected,
    refetch,
  } = useEtudiantsAutorises();

  const [validerAnneeModalOpen, setValiderAnneeModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  function openDeleteModal(target) {
    setDeleteError("");
    setDeleteTarget(target);
  }

  function closeDeleteModal() {
    setDeleteTarget(null);
    setDeleteError("");
  }

  async function handleConfirmDelete() {
    setDeleteLoading(true);
    setDeleteError("");
    try {
      if (deleteTarget === "bulk") {
        const { failed } = await removeSelected();
        if (failed.length > 0) {
          setDeleteError(
            `${failed.length} étudiant(s) n'ont pas pu être supprimés (compte déjà actif). Les autres ont bien été retirés.`
          );
          return;
        }
        closeDeleteModal();
      } else if (deleteTarget) {
        await removeOne(deleteTarget.id);
        closeDeleteModal();
      }
    } catch (err) {
      setDeleteError(
        err.response?.data?.message ?? "Une erreur est survenue. Merci de réessayer."
      );
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--color-primary)] md:text-3xl">
            Étudiants autorisés
          </h2>
          <p className="text-gray-500">
            Gérez la liste des étudiants habilités à déposer un mémoire.
          </p>
        </div>

        <EtudiantsToolbar
          search={search}
          onSearchChange={setSearch}
          filiere={filiere}
          onFiliereChange={setFiliere}
          onImportClick={() => setImportModalOpen(true)}
          onAddClick={() => setValiderAnneeModalOpen(true)}
        />

        <StatutTabsEtudiants statut={statutFiltre} onStatutChange={setStatutFiltre} />

        <BulkActionsBar
          count={selectedIds.length}
          onDeleteClick={() => openDeleteModal("bulk")}
        />

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>
        )}

        {loading ? (
          <div className="relative min-h-[320px] rounded-2xl border border-gray-200 bg-white shadow-sm">
            <LoadingScreen fullScreen={false} message="Chargement..." />
          </div>
        ) : (
          <EtudiantsListe
            etudiants={etudiants}
            selectedIds={selectedIds}
            allSelected={allSelected}
            onToggleSelected={toggleSelected}
            onToggleSelectAll={toggleSelectAll}
            onEdit={() => {}}
            onDeleteOne={openDeleteModal}
          />
        )}
      </div>

      <ValiderAnneeModal
        open={validerAnneeModalOpen}
        onClose={() => setValiderAnneeModalOpen(false)}
        onValide={() => {
          clearSelection();
          refetch();
        }}
      />

      <ImportModal
        open={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onImported={refetch}
      />

      <DeleteConfirmModal
        open={Boolean(deleteTarget)}
        target={deleteTarget === "bulk" ? null : deleteTarget}
        count={deleteTarget === "bulk" ? selectedIds.length : 0}
        loading={deleteLoading}
        error={deleteError}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
}