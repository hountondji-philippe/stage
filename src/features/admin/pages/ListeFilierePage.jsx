import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import FilieresToolbar from "../components/FilieresToolbar";
import FilieresTable from "../components/FilieresTable";
import FiliereFormModal from "../components/FiliereFormModal";
import AjouterSousFiliereModal from "../components/AjouterSousFiliereModal";
import ConfirmSuppressionModal from "../components/ConfirmSuppressionModal";
import { useFilieresAdmin } from "../hooks/useFilieresAdmin";

export default function ListeFilierePage() {
  const { filieres, loading, error, refetch, addFiliere, editFiliere, removeFiliere } =
    useFilieresAdmin();

  const [formModal, setFormModal] = useState({ open: false, filiere: null });
  const [sousFiliereModal, setSousFiliereModal] = useState({ open: false, filiere: null });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  function openAddModal() {
    setFormModal({ open: true, filiere: null });
  }

  function openEditModal(filiere) {
    setFormModal({ open: true, filiere });
  }

  async function handleSaveFiliere(payload, id) {
    if (id) {
      await editFiliere(id, payload);
    } else {
      await addFiliere(payload);
    }
  }

  async function handleConfirmDelete() {
    setDeleteLoading(true);
    setDeleteError("");
    try {
      await removeFiliere(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      setDeleteError(
        err.response?.data?.message ??
          "Impossible de supprimer cette filière (probablement utilisée par des étudiants ou des mémoires)."
      );
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <FilieresToolbar onAddClick={openAddModal} />

        {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500 shadow-sm">
            Chargement...
          </div>
        ) : (
          <FilieresTable
            filieres={filieres}
            onAjouterSousFiliere={(filiere) => setSousFiliereModal({ open: true, filiere })}
            onEdit={openEditModal}
            onDelete={(filiere) => {
              setDeleteError("");
              setDeleteTarget(filiere);
            }}
          />
        )}
      </div>

      <FiliereFormModal
        open={formModal.open}
        filiere={formModal.filiere}
        onClose={() => setFormModal({ open: false, filiere: null })}
        onSaved={handleSaveFiliere}
      />

      <AjouterSousFiliereModal
        open={sousFiliereModal.open}
        filiere={sousFiliereModal.filiere}
        onClose={() => setSousFiliereModal({ open: false, filiere: null })}
        onAdded={refetch}
      />

      <ConfirmSuppressionModal
        open={Boolean(deleteTarget)}
        filiere={deleteTarget}
        loading={deleteLoading}
        error={deleteError}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
}