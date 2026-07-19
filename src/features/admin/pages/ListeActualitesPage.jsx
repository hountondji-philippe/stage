import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import ActualitesToolbar from "../components/ActualitesToolbar";
import ActualitesTable from "../components/ActualitesTable";
import ActualiteFormModal from "../components/ActualiteFormModal";
import ConfirmSuppressionActualiteModal from "../components/ConfirmSuppressionActualiteModal";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import { useActualitesAdmin } from "../hooks/useActualitesAdmin";

export default function ListeActualitesPage() {
  const { actualites, loading, error, addActualite, editActualite, removeActualite } = useActualitesAdmin();

  const [formModal, setFormModal] = useState({ open: false, actualite: null });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  function openAddModal() {
    setFormModal({ open: true, actualite: null });
  }

  function openEditModal(actualite) {
    setFormModal({ open: true, actualite });
  }

  async function handleSaveActualite(payload, id) {
    if (id) {
      await editActualite(id, payload);
    } else {
      await addActualite(payload);
    }
  }

  async function handleConfirmDelete() {
    setDeleteLoading(true);
    setDeleteError("");
    try {
      await removeActualite(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      setDeleteError(err.response?.data?.message ?? "Impossible de supprimer cette actualité.");
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <ActualitesToolbar onAddClick={openAddModal} />

        {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        {loading ? (
          <div className="relative min-h-[320px] rounded-xl border border-gray-200 bg-white shadow-sm">
            <LoadingScreen fullScreen={false} message="Chargement..." />
          </div>
        ) : (
          <ActualitesTable
            actualites={actualites}
            onEdit={openEditModal}
            onDelete={(actualite) => {
              setDeleteError("");
              setDeleteTarget(actualite);
            }}
          />
        )}
      </div>

      <ActualiteFormModal
        open={formModal.open}
        actualite={formModal.actualite}
        onClose={() => setFormModal({ open: false, actualite: null })}
        onSaved={handleSaveActualite}
      />

      <ConfirmSuppressionActualiteModal
        open={Boolean(deleteTarget)}
        actualite={deleteTarget}
        loading={deleteLoading}
        error={deleteError}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
}