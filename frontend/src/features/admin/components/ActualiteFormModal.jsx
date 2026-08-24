import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { ICONES_ACTUALITES } from "./iconesActualites";

export default function ActualiteFormModal({ open, actualite, onClose, onSaved }) {
  const estEdition = Boolean(actualite);

  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [icone, setIcone] = useState(ICONES_ACTUALITES[0].nom);
  const [datePublication, setDatePublication] = useState("");
  const [erreurs, setErreurs] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setTitre(actualite?.titre || "");
      setContenu(actualite?.contenu || "");
      setIcone(actualite?.icone || ICONES_ACTUALITES[0].nom);
      setDatePublication(actualite?.date_publication?.slice(0, 10) || "");
      setErreurs({});
      setServerError("");
    }
  }, [open, actualite]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setErreurs({});
    setServerError("");

    const nouvellesErreurs = {};
    if (!titre.trim()) nouvellesErreurs.titre = "Le titre est obligatoire.";
    if (!contenu.trim()) nouvellesErreurs.contenu = "Le contenu est obligatoire.";
    if (!datePublication) nouvellesErreurs.date_publication = "La date est obligatoire.";
    if (Object.keys(nouvellesErreurs).length > 0) {
      setErreurs(nouvellesErreurs);
      return;
    }

    setLoading(true);
    try {
      await onSaved(
        { titre: titre.trim(), contenu: contenu.trim(), icone, date_publication: datePublication },
        actualite?.id
      );
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[var(--color-text)]">
            {estEdition ? "Modifier l'actualité" : "Ajouter une actualité"}
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
            label="Titre"
            name="titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Ex : Ouverture de la période de dépôt"
            error={erreurs.titre}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text)]">Contenu</label>
            <textarea
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
            />
            {erreurs.contenu && <p className="text-xs text-red-600">{erreurs.contenu}</p>}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--color-text)]">Icône</label>
              <select
                value={icone}
                onChange={(e) => setIcone(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15"
              >
                {ICONES_ACTUALITES.map(({ nom }) => (
                  <option key={nom} value={nom}>
                    {nom}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Date de publication"
              name="date_publication"
              type="date"
              value={datePublication}
              onChange={(e) => setDatePublication(e.target.value)}
              error={erreurs.date_publication}
              required
            />
          </div>

          <Button type="submit" variant="primary" fullWidth loading={loading}>
            {estEdition ? "Enregistrer" : "Créer l'actualité"}
          </Button>
        </form>
      </div>
    </div>
  );
}