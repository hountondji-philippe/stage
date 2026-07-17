import { useState, useEffect } from "react";
import { X, Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useSousFilieres } from "../hooks/useSousFilieres";
import { createSousFiliere, updateSousFiliere, deleteSousFiliere } from "../api/filieresApi";

export default function FiliereFormModal({ open, filiere, onClose, onSaved }) {
  const estEdition = Boolean(filiere);

  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [erreurs, setErreurs] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    sousFilieres,
    loading: loadingSousFilieres,
    refetch: refetchSousFilieres,
  } = useSousFilieres(estEdition ? filiere.id : null);

  const [nouvelleSousFiliere, setNouvelleSousFiliere] = useState("");
  const [ajoutLoading, setAjoutLoading] = useState(false);
  const [sousFiliereEnEdition, setSousFiliereEnEdition] = useState(null);
  const [sousFiliereASupprimer, setSousFiliereASupprimer] = useState(null);
  const [sousFiliereErreur, setSousFiliereErreur] = useState("");

  useEffect(() => {
    if (open) {
      setNom(filiere?.nom || "");
      setDescription(filiere?.description || "");
      setErreurs({});
      setServerError("");
      setNouvelleSousFiliere("");
      setSousFiliereEnEdition(null);
      setSousFiliereASupprimer(null);
      setSousFiliereErreur("");
    }
  }, [open, filiere]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setErreurs({});
    setServerError("");

    if (!nom.trim()) {
      setErreurs({ nom: "Le nom est obligatoire." });
      return;
    }

    setLoading(true);
    try {
      await onSaved({ nom: nom.trim(), description: description.trim() || null }, filiere?.id);
      onClose();
    } catch (err) {
      if (err.response?.status === 422) {
        setErreurs(
          Object.fromEntries(Object.entries(err.response.data.errors || {}).map(([k, v]) => [k, v[0]]))
        );
      } else {
        setServerError(err.response?.data?.message || "Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleAjouterSousFiliere() {
    if (!nouvelleSousFiliere.trim()) return;
    setAjoutLoading(true);
    setSousFiliereErreur("");
    try {
      await createSousFiliere({ nom: nouvelleSousFiliere.trim(), filiere_id: filiere.id });
      setNouvelleSousFiliere("");
      await refetchSousFilieres();
    } catch (err) {
      setSousFiliereErreur(err.response?.data?.message || "Impossible d'ajouter cette sous-filière.");
    } finally {
      setAjoutLoading(false);
    }
  }

  async function handleModifierSousFiliere() {
    if (!sousFiliereEnEdition?.nom.trim()) return;
    setAjoutLoading(true);
    setSousFiliereErreur("");
    try {
      await updateSousFiliere(sousFiliereEnEdition.id, {
        nom: sousFiliereEnEdition.nom.trim(),
        filiere_id: filiere.id,
      });
      setSousFiliereEnEdition(null);
      await refetchSousFilieres();
    } catch (err) {
      setSousFiliereErreur(err.response?.data?.message || "Impossible de modifier cette sous-filière.");
    } finally {
      setAjoutLoading(false);
    }
  }

  async function handleSupprimerSousFiliere() {
    setAjoutLoading(true);
    setSousFiliereErreur("");
    try {
      await deleteSousFiliere(sousFiliereASupprimer.id);
      setSousFiliereASupprimer(null);
      await refetchSousFilieres();
    } catch (err) {
      setSousFiliereErreur(err.response?.data?.message || "Impossible de supprimer cette sous-filière.");
    } finally {
      setAjoutLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[var(--color-text)]">
            {estEdition ? "Modifier la filière" : "Ajouter une filière"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {serverError && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label="Nom de la filière"
            name="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Ex : Informatique de Gestion"
            error={erreurs.nom}
            required
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text)]">
              Description (optionnelle)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full resize-none rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
            />
          </div>

          <Button type="submit" variant="primary" fullWidth loading={loading}>
            {estEdition ? "Enregistrer" : "Créer la filière"}
          </Button>
        </form>

        {estEdition && (
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h4 className="mb-3 text-sm font-bold text-[var(--color-text)]">Sous-filières</h4>

            {sousFiliereErreur && <p className="mb-3 text-xs text-red-600">{sousFiliereErreur}</p>}

            {loadingSousFilieres ? (
              <p className="text-sm text-gray-400">Chargement...</p>
            ) : sousFilieres.length === 0 ? (
              <p className="text-sm text-gray-400">Aucune sous-filière pour l'instant.</p>
            ) : (
              <ul className="mb-4 space-y-2">
                {sousFilieres.map((sf) => (
                  <li
                    key={sf.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2"
                  >
                    {sousFiliereEnEdition?.id === sf.id ? (
                      <div className="flex flex-1 items-center gap-2">
                        <input
                          value={sousFiliereEnEdition.nom}
                          onChange={(e) =>
                            setSousFiliereEnEdition({ ...sousFiliereEnEdition, nom: e.target.value })
                          }
                          className="w-full rounded-md border border-gray-200 px-2 py-1 text-sm outline-none focus:border-[var(--color-primary)]"
                          autoFocus
                        />
                        <button
                          onClick={handleModifierSousFiliere}
                          disabled={ajoutLoading}
                          className="text-xs font-semibold text-[var(--color-primary)]"
                        >
                          OK
                        </button>
                        <button
                          onClick={() => setSousFiliereEnEdition(null)}
                          className="text-xs text-gray-400"
                        >
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm text-gray-700">{sf.nom}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSousFiliereEnEdition({ id: sf.id, nom: sf.nom })}
                            className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[var(--color-primary)]"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setSousFiliereASupprimer(sf)}
                            className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center gap-2">
              <input
                value={nouvelleSousFiliere}
                onChange={(e) => setNouvelleSousFiliere(e.target.value)}
                placeholder="Nom de la nouvelle sous-filière"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
              />
              <button
                onClick={handleAjouterSousFiliere}
                disabled={ajoutLoading || !nouvelleSousFiliere.trim()}
                className="flex shrink-0 items-center gap-1 rounded-lg bg-[var(--color-primary)] px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {ajoutLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              </button>
            </div>

            {sousFiliereASupprimer && (
              <div className="mt-4 rounded-lg border border-red-100 bg-red-50 p-3 text-sm">
                <p className="mb-2 text-red-700">
                  Supprimer la sous-filière « {sousFiliereASupprimer.nom} » ?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleSupprimerSousFiliere}
                    disabled={ajoutLoading}
                    className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={() => setSousFiliereASupprimer(null)}
                    className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}