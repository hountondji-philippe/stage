import { useState } from "react";
import { Plus } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import EtudiantsToolbar from "../components/EtudiantsToolbar";
import BulkActionsBar from "../components/BulkActionsBar";
import EtudiantsTable from "../components/EtudiantsTable";
import EtudiantsCardList from "../components/EtudiantsCardList";
import EtudiantFormModal from "../components/EtudiantFormModal";
import ImportModal from "../components/ImportModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
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
    selectedIds,
    allSelected,
    toggleSelected,
    toggleSelectAll,
    clearSelection,
    removeOne,
    removeSelected,
    refetch,
  } = useEtudiantsAutorises();

  const [formModal, setFormModal] = useState({ open: false, etudiant: null });
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // étudiant | "bulk" | null
  const [deleteLoading, setDeleteLoading] = useState(false);

  function openAddModal() {
    setFormModal({ open: true, etudiant: null });
  }

  function openEditModal(etudiant) {
    setFormModal({ open: true, etudiant });
  }

  async function handleConfirmDelete() {
    setDeleteLoading(true);
    try {
      if (deleteTarget === "bulk") {
        await removeSelected();
      } else if (deleteTarget) {
        await removeOne(deleteTarget.id);
      }
      setDeleteTarget(null);
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
          onAddClick={openAddModal}
        />

        <BulkActionsBar
          count={selectedIds.length}
          onDeleteClick={() => setDeleteTarget("bulk")}
        />

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>
        )}

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500 shadow-sm">
            Chargement...
          </div>
        ) : (
          <>
            <EtudiantsTable
              etudiants={etudiants}
              selectedIds={selectedIds}
              allSelected={allSelected}
              onToggleSelected={toggleSelected}
              onToggleSelectAll={toggleSelectAll}
              onEdit={openEditModal}
              onDeleteOne={(etudiant) => setDeleteTarget(etudiant)}
            />
            <EtudiantsCardList
              etudiants={etudiants}
              onEdit={openEditModal}
              onDeleteOne={(etudiant) => setDeleteTarget(etudiant)}
            />
          </>
        )}
      </div>

      {/* FAB mobile */}
      <button
        onClick={openAddModal}
        className="fixed bottom-20 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-[var(--color-text)] shadow-xl transition-transform active:scale-90 md:hidden"
        aria-label="Ajouter un étudiant"
      >
        <Plus size={28} />
      </button>

      <EtudiantFormModal
        open={formModal.open}
        etudiant={formModal.etudiant}
        onClose={() => setFormModal({ open: false, etudiant: null })}
        onSaved={() => {
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
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
}
