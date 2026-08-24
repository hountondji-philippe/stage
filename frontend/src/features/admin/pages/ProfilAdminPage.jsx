import { useState } from "react";
import { Mail, KeyRound, ShieldCheck } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import Button from "../../../components/ui/Button";
import { useAuth } from "../../auth/hooks/useAuth";
import { changerMotDePasse, modifierEmail } from "../../auth/api/authApi";

export default function ProfilAdminPage() {
  const { user, refetchUser } = useAuth();

  // --- Formulaire email ---
  const [email, setEmail] = useState(user?.email || "");
  const [emailErrors, setEmailErrors] = useState({});
  const [emailSuccess, setEmailSuccess] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setEmailErrors({});
    setEmailSuccess("");
    setEmailLoading(true);
    try {
      const data = await modifierEmail(email);
      setEmailSuccess(data.message || "Email mis à jour avec succès.");
      await refetchUser?.();
    } catch (err) {
      setEmailErrors(err.response?.data?.errors || {});
      if (!err.response?.data?.errors) {
        setEmailErrors({ general: "Une erreur est survenue. Réessayez." });
      }
    } finally {
      setEmailLoading(false);
    }
  }

  // --- Formulaire mot de passe (identique à celui de l'étudiant) ---
  const [pwdForm, setPwdForm] = useState({
    mot_de_passe_actuel: "",
    mot_de_passe: "",
    mot_de_passe_confirmation: "",
  });
  const [pwdErrors, setPwdErrors] = useState({});
  const [pwdSuccess, setPwdSuccess] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);

  function handlePwdChange(e) {
    setPwdForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handlePwdSubmit(e) {
    e.preventDefault();
    setPwdErrors({});
    setPwdSuccess("");
    setPwdLoading(true);
    try {
      const data = await changerMotDePasse(pwdForm);
      setPwdSuccess(data.message || "Mot de passe mis à jour avec succès.");
      setPwdForm({ mot_de_passe_actuel: "", mot_de_passe: "", mot_de_passe_confirmation: "" });
    } catch (err) {
      setPwdErrors(err.response?.data?.errors || {});
      if (!err.response?.data?.errors) {
        setPwdErrors({ general: "Une erreur est survenue. Réessayez." });
      }
    } finally {
      setPwdLoading(false);
    }
  }

  return (
    <AdminLayout>
      <h1 className="mb-8 text-2xl font-extrabold text-[var(--color-primary)] sm:text-3xl">
        Mon profil
      </h1>

      {/* En-tête */}
      <div className="mb-6 flex items-center gap-5 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-primary)] text-2xl font-bold text-white">
          A
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">Administrateur</p>
          <p className="flex items-center gap-1.5 text-sm text-gray-500">
            <ShieldCheck size={14} />
            Compte administration
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Modifier l'email */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
            <Mail size={20} className="text-[var(--color-primary)]" />
            Adresse email
          </h2>

          {emailSuccess && (
            <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
              {emailSuccess}
            </p>
          )}
          {emailErrors.general && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {emailErrors.general}
            </p>
          )}

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />
              {emailErrors.email && (
                <p className="mt-1 text-xs text-red-600">{emailErrors.email[0]}</p>
              )}
            </div>

            <Button type="submit" variant="primary" fullWidth loading={emailLoading} disabled={emailLoading}>
              {emailLoading ? "Mise à jour..." : "Mettre à jour l'email"}
            </Button>
          </form>
        </div>

        {/* Changer le mot de passe */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
            <KeyRound size={20} className="text-[var(--color-primary)]" />
            Changer le mot de passe
          </h2>

          {pwdSuccess && (
            <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
              {pwdSuccess}
            </p>
          )}
          {pwdErrors.general && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {pwdErrors.general}
            </p>
          )}

          <form onSubmit={handlePwdSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Mot de passe actuel
              </label>
              <input
                type="password"
                name="mot_de_passe_actuel"
                value={pwdForm.mot_de_passe_actuel}
                onChange={handlePwdChange}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />
              {pwdErrors.mot_de_passe_actuel && (
                <p className="mt-1 text-xs text-red-600">{pwdErrors.mot_de_passe_actuel[0]}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                name="mot_de_passe"
                value={pwdForm.mot_de_passe}
                onChange={handlePwdChange}
                required
                minLength={8}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />
              {pwdErrors.mot_de_passe && (
                <p className="mt-1 text-xs text-red-600">{pwdErrors.mot_de_passe[0]}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                name="mot_de_passe_confirmation"
                value={pwdForm.mot_de_passe_confirmation}
                onChange={handlePwdChange}
                required
                minLength={8}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />
            </div>

            <Button type="submit" variant="primary" fullWidth loading={pwdLoading} disabled={pwdLoading}>
              {pwdLoading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
