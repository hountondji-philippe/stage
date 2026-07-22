import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical, Pencil, Trash2, FolderPlus, FileText } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import StatusBadge from "../../../components/ui/StatusBadge";
import FiliereFormModal from "../components/FiliereFormModal";
import AjouterSousFiliereModal from "../components/AjouterSousFiliereModal";
import ConfirmSuppressionModal from "../components/ConfirmSuppressionModal";
import { ROUTES } from "../../../router/paths";
import { useFiliereDetailAdmin } from "../hooks/useFiliereDetailAdmin";
import { updateFiliere, deleteFiliere } from "../api/filieresApi";
import Pagination from "../components/Pagination";
const ONGLETS = [
  { key: "tous", label: "Tous" },
  { key: "en_attente", label: "En attente" },
  { key: "valide", label: "Validé" },
  { key: "rejete", label: "Rejeté" },
];

export default function FiliereDetailAdminPage() {
  const { id } = useParams();
  const navigate = useNavigate();
 const {
  filiere,
  sousFilieres,
  sousFiliereActive,
  setSousFiliereActive,
  onglet,
  setOnglet,
  memoires,
  page,
  setPage,
  totalPages,
  totalItems,
  pageSize,
  loading,
  loadingMemoires,
  error,
  refetchInfos,
  refetchMemoires,
} = useFiliereDetailAdmin(id);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [ajoutSousFiliereModal, setAjoutSousFiliereModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  async function handleSaveFiliere(payload) {
  await updateFiliere(id, payload);
  refetchInfos();
}

async function handleConfirmDelete() {
  setDeleteLoading(true);
  setDeleteError("");
  try {
    await deleteFiliere(id);
    navigate("/admin/filieres");
  } catch (err) {
    setDeleteError(
      err.response?.data?.message ??
        "Impossible de supprimer cette filière (probablement utilisée par des étudiants ou des mémoires)."
    );
    setDeleteLoading(false);
  }
}

  if (loading) {
    return (
      <AdminLayout>
        <div className="relative min-h-[320px] rounded-xl border border-gray-200 bg-white shadow-sm">
          <LoadingScreen fullScreen={false} message="Chargement..." />
        </div>
      </AdminLayout>
    );
  }

  if (error || !filiere) {
    return (
      <AdminLayout>
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <button
          onClick={() => navigate("/admin/filieres")}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[var(--color-primary)]"
        >
          <ArrowLeft size={16} />
          Retour à la liste des filières
        </button>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
          {/* --- Carte filière --- */}
          <div className="h-fit rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <h1 className="text-lg font-bold text-[var(--color-text)]">{filiere.nom}</h1>

              <div className="relative">
                <button
                  onClick={() => setMenuOuvert((v) => !v)}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  aria-label="Actions"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>

                {menuOuvert && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setMenuOuvert(false)} />
                    <div className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">
                      <button
                        onClick={() => {
                          setMenuOuvert(false);
                          setEditModal(true);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Modifier
                      </button>
                      <button
                        onClick={() => {
                          setMenuOuvert(false);
                          setDeleteError("");
                          setDeleteTarget(filiere);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Supprimer
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {filiere.description && (
              <p className="mb-4 text-sm text-gray-500">{filiere.description}</p>
            )}

            <div className="mb-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">
                Sous-filières
              </p>

              {sousFilieres.length === 0 ? (
                <p className="text-sm text-gray-400">Aucune sous-filière.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSousFiliereActive(null)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                      !sousFiliereActive
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Toutes
                  </button>
                  {sousFilieres.map((sf) => (
                    <button
                      key={sf.id}
                      onClick={() => setSousFiliereActive(sf.id)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                        String(sousFiliereActive) === String(sf.id)
                          ? "bg-[var(--color-primary)] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {sf.nom}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setAjoutSousFiliereModal(true)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
            >
              <FolderPlus className="h-4 w-4" />
              Ajouter une sous-filière
            </button>
          </div>

          {/* --- Liste mémoires --- */}
          <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 p-4">
              {ONGLETS.map((o) => (
                <button
                  key={o.key}
                  onClick={() => setOnglet(o.key)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                    onglet === o.key
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>

           {loadingMemoires ? (
              <div className="p-8 text-center text-sm text-gray-400">Chargement...</div>
            ) : memoires.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">
                Aucun mémoire pour ce filtre.
              </div>
            ) : (
              <>
                <div className="divide-y divide-gray-100">
                  {memoires.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => navigate(ROUTES.memoireDetailAdmin(m.id))}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50"
                    >
                      <FileText size={16} className="shrink-0 text-[var(--color-primary)]" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">{m.titre}</p>
                        <p className="truncate text-xs text-gray-400">{m.auteur}</p>
                      </div>
                      <StatusBadge status={m.statut} />
                    </button>
                  ))}
                </div>

                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  pageSize={pageSize}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <FiliereFormModal
        open={editModal}
        filiere={filiere}
        onClose={() => setEditModal(false)}
        onSaved={handleSaveFiliere}
      />

      <AjouterSousFiliereModal
        open={ajoutSousFiliereModal}
        filiere={filiere}
        onClose={() => setAjoutSousFiliereModal(false)}
        onAdded={refetchInfos}
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