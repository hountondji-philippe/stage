import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import FilieresToolbar from "../components/FilieresToolbar";
import FilieresTable from "../components/FilieresTable";
import FiliereFormModal from "../components/FiliereFormModal";
import AjouterSousFiliereModal from "../components/AjouterSousFiliereModal";
import ConfirmSuppressionModal from "../components/ConfirmSuppressionModal";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import { useFilieresAdmin } from "../hooks/useFilieresAdmin";

export default function ListeFilierePage() {
  const location = useLocation();
  const { filieres, loading, error, refetch, addFiliere, editFiliere, removeFiliere } =
    useFilieresAdmin();

  const [formModal, setFormModal] = useState({ open: false, filiere: null });
  const [sousFiliereModal, setSousFiliereModal] = useState({ open: false, filiere: null });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // --- AJOUT : ouvre automatiquement la modale d'édition si on arrive
  // depuis la recherche globale, via navigate("/admin/filieres", { state: { filiereIdAOuvrir } })
  useEffect(() => {
    const idCible = location.state?.filiereIdAOuvrir;
    if (!idCible || loading || filieres.length === 0) return;

    const filiere = filieres.find((f) => String(f.id) === String(idCible));
    if (filiere) {
      setFormModal({ open: true, filiere });
    }
  }, [location.state, loading, filieres]);
  // --- FIN AJOUT ---

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
          <div className="relative min-h-[320px] rounded-xl border border-gray-200 bg-white shadow-sm">
            <LoadingScreen fullScreen={false} message="Chargement..." />
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