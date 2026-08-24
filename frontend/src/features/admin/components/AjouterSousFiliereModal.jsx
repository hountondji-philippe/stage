import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { createSousFiliere } from "../api/filieresApi";

export default function AjouterSousFiliereModal({ open, filiere, onClose, onAdded }) {
  const [nom, setNom] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setNom("");
      setErreur("");
    }
  }, [open]);

  if (!open || !filiere) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nom.trim()) {
      setErreur("Le nom est obligatoire.");
      return;
    }

    setLoading(true);
    setErreur("");
    try {
      await createSousFiliere({ nom: nom.trim(), filiere_id: filiere.id });
      onAdded();
      onClose();
    } catch (err) {
      setErreur(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[var(--color-text)]">
            Ajouter une sous-filière à « {filiere.nom} »
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label="Nom de la sous-filière"
            name="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Ex : Réseaux et Sécurité"
            error={erreur}
            required
          />
          <Button type="submit" variant="primary" fullWidth loading={loading}>
            Ajouter
          </Button>
        </form>
      </div>
    </div>
  );
}