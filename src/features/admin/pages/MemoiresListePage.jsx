import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import PageHeader from "../components/PageHeader";
import StatutFilterBar from "../components/StatutFilterBar";
import MemoiresListeTable from "../components/MemoiresListeTable";
import Pagination from "../components/Pagination";
import SupprimerMemoireModal from "../components/SupprimerMemoireModal";
import { useMemoiresListe } from "../hooks/useMemoiresListe";

export default function MemoiresListePage() {
  const { memoires, meta, statut, updateStatut, page, setPage, loading, error, removeMemoire } =
    useMemoiresListe();

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  function openDeleteModal(memoire) {
    setDeleteError("");
    setDeleteTarget(memoire);
  }

  function closeDeleteModal() {
    setDeleteTarget(null);
    setDeleteError("");
  }

  async function handleConfirmDelete() {
    setDeleteLoading(true);
    setDeleteError("");
    try {
      await removeMemoire(deleteTarget.id);
      closeDeleteModal();
    } catch (err) {
      setDeleteError(err.response?.data?.message ?? "Une erreur est survenue lors de la suppression.");
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <AdminLayout>
      <PageHeader
        title="Liste des mémoires"
        subtitle="Tous les mémoires de la plateforme, quel que soit leur statut."
      />

      <StatutFilterBar statut={statut} onStatutChange={updateStatut} total={meta.total} />

      {error && <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      {loading ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500 shadow-sm">
          Chargement...
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <MemoiresListeTable memoires={memoires} onDeleteClick={openDeleteModal} />
          <Pagination
            currentPage={meta.current_page}
            totalPages={meta.last_page}
            totalItems={meta.total}
            pageSize={meta.per_page}
            onPageChange={setPage}
          />
        </div>
      )}

      <SupprimerMemoireModal
        open={Boolean(deleteTarget)}
        memoire={deleteTarget}
        loading={deleteLoading}
        error={deleteError}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
}
