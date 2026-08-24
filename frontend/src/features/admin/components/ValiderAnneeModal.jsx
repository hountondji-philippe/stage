import { useState } from "react";
import { X, Search, CheckCircle2, UserRound } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { getEtudiants, updateEtudiant } from "../api/etudiantsAutorisesApi";

export default function ValiderAnneeModal({ open, onClose, onValide }) {
  const [matricule, setMatricule] = useState("");
  const [etudiantTrouve, setEtudiantTrouve] = useState(null);
  const [recherche, setRecherche] = useState(false);
  const [erreurRecherche, setErreurRecherche] = useState("");
  const [validation, setValidation] = useState(false);
  const [erreurValidation, setErreurValidation] = useState("");
  const [succes, setSucces] = useState(false);

  function handleClose() {
    setMatricule("");
    setEtudiantTrouve(null);
    setErreurRecherche("");
    setErreurValidation("");
    setSucces(false);
    onClose();
  }

  async function handleRechercher(e) {
    e.preventDefault();
    if (!matricule.trim()) return;

    setRecherche(true);
    setErreurRecherche("");
    setEtudiantTrouve(null);

    try {
      const reponse = await getEtudiants({ recherche: matricule.trim() });
      const liste = reponse.data ?? reponse;
      const trouve = liste.find((e) => e.matricule === matricule.trim());

      if (!trouve) {
        setErreurRecherche("Aucun étudiant ne correspond à ce matricule.");
      } else if (trouve.annee_validee) {
        setErreurRecherche("L'année de cet étudiant est déjà validée.");
      } else {
        setEtudiantTrouve(trouve);
      }
    } catch (err) {
      setErreurRecherche("Une erreur est survenue lors de la recherche.");
    } finally {
      setRecherche(false);
    }
  }

  async function handleValider() {
    setValidation(true);
    setErreurValidation("");
    try {
      await updateEtudiant(etudiantTrouve.id, { annee_validee: true });
      setSucces(true);
      onValide?.();
    } catch (err) {
      setErreurValidation(err.response?.data?.message ?? "Impossible de valider l'année.");
    } finally {
      setValidation(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[var(--color-text)]">Valider l'année</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {succes ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-7 w-7 text-emerald-600" />
            </div>
            <p className="mb-6 text-sm text-gray-600">
              L'année de <span className="font-semibold">{etudiantTrouve.prenom} {etudiantTrouve.nom}</span>{" "}
              a été validée avec succès.
            </p>
            <Button variant="primary" fullWidth onClick={handleClose}>
              Fermer
            </Button>
          </div>
        ) : etudiantTrouve ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <UserRound className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {etudiantTrouve.prenom} {etudiantTrouve.nom}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {etudiantTrouve.matricule} • {etudiantTrouve.filiere?.nom}
                </p>
              </div>
            </div>

            {erreurValidation && <p className="text-sm text-red-600">{erreurValidation}</p>}

            <div className="flex gap-3">
              <Button variant="outline" fullWidth onClick={() => setEtudiantTrouve(null)}>
                Annuler
              </Button>
              <Button variant="primary" fullWidth loading={validation} onClick={handleValider}>
                Confirmer
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRechercher} className="space-y-4">
            <Input
              label="Matricule de l'étudiant"
              name="matricule"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              placeholder="Ex : 22045879"
              leftIcon={<Search className="h-4 w-4" />}
              error={erreurRecherche}
              required
            />
            <Button type="submit" variant="primary" fullWidth loading={recherche} disabled={!matricule.trim()}>
              Rechercher
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}