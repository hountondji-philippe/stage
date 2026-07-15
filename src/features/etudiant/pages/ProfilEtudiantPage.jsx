import { useState } from "react";
import { User, Mail, GraduationCap, Hash, Calendar, KeyRound } from "lucide-react";
import EtudiantLayout from "../../memoires/components/EtudiantLayout";
import Button from "../../../components/ui/Button";
import { useAuth } from "../../auth/hooks/useAuth";
import { changerMotDePasse } from "../../auth/api/authApi";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 border-b border-gray-100 py-4 last:border-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg)]">
        <Icon size={18} className="text-[var(--color-primary)]" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
        <p className="text-sm font-medium text-[var(--color-text)]">{value || "—"}</p>
      </div>
    </div>
  );
}

export default function ProfilEtudiantPage() {
  const { user } = useAuth();
  const etudiantAutorise = user?.etudiant_autorise;

  const [form, setForm] = useState({
    mot_de_passe_actuel: "",
    mot_de_passe: "",
    mot_de_passe_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    setLoading(true);

    try {
      const data = await changerMotDePasse(form);
      setSuccessMessage(data.message || "Mot de passe mis à jour avec succès.");
      setForm({ mot_de_passe_actuel: "", mot_de_passe: "", mot_de_passe_confirmation: "" });
    } catch (err) {
      setErrors(err.response?.data?.errors || {});
      if (!err.response?.data?.errors) {
        setErrors({ general: "Une erreur est survenue. Réessayez." });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <EtudiantLayout>
      <h1 className="mb-8 text-2xl font-extrabold text-[var(--color-primary)] sm:text-3xl">
        Mon profil
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(19,36,107,0.06)]">
          <h2 className="mb-4 text-lg font-bold text-[var(--color-text)]">
            Informations académiques
          </h2>
          <InfoRow
            icon={User}
            label="Nom complet"
            value={etudiantAutorise ? `${etudiantAutorise.prenom} ${etudiantAutorise.nom}` : null}
          />
          <InfoRow icon={Mail} label="Email" value={user?.email} />
          <InfoRow icon={Hash} label="Matricule" value={etudiantAutorise?.matricule} />
          <InfoRow icon={GraduationCap} label="Filière" value={etudiantAutorise?.filiere?.nom} />
          <InfoRow
            icon={Calendar}
            label="Niveau / Promotion"
            value={etudiantAutorise ? `${etudiantAutorise.niveau} — ${etudiantAutorise.promo}` : null}
          />
          <p className="mt-4 text-xs text-gray-400">
            Ces informations sont gérées par l'administration. Contactez le service scolarité pour toute correction.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(19,36,107,0.06)]">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[var(--color-text)]">
            <KeyRound size={20} className="text-[var(--color-primary)]" />
            Changer le mot de passe
          </h2>

          {successMessage && (
            <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
              {successMessage}
            </p>
          )}
          {errors.general && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {errors.general}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Mot de passe actuel
              </label>
              <input
                type="password"
                name="mot_de_passe_actuel"
                value={form.mot_de_passe_actuel}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]/40"
              />
              {errors.mot_de_passe_actuel && (
                <p className="mt-1 text-xs text-red-600">{errors.mot_de_passe_actuel[0]}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                name="mot_de_passe"
                value={form.mot_de_passe}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]/40"
              />
              {errors.mot_de_passe && (
                <p className="mt-1 text-xs text-red-600">{errors.mot_de_passe[0]}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                name="mot_de_passe_confirmation"
                value={form.mot_de_passe_confirmation}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]/40"
              />
            </div>

            <Button type="submit" variant="primary" fullWidth loading={loading} disabled={loading}>
              {loading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
            </Button>
          </form>
        </div>
      </div>
    </EtudiantLayout>
  );
}