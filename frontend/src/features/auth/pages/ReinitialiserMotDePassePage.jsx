import { useState } from "react";
import { GraduationCap, Lock, Eye, EyeOff, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useReinitialiserMotDePasse } from "../hooks/useReinitialiserMotDePasse";
import { ROUTES } from "../../../router/paths";

// Même image que la page "Mot de passe oublié", pour la continuité visuelle du parcours.
import bgImage from "../../../assets/forget.png";

export default function ReinitialiserMotDePassePage() {
  const {
    email,
    tokenPresent,
    form,
    updateField,
    errors,
    serverError,
    loading,
    success,
    submit,
  } = useReinitialiserMotDePasse();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      {/* Fond : même traitement que MotDePasseOubliePage.jsx */}
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-105 object-cover blur-[2px]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(19,36,107,0.85) 0%, rgba(0,14,77,0.80) 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[440px]">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg">
            <GraduationCap className="h-6 w-6 text-[var(--color-primary)]" />
          </div>
          <span className="text-lg font-extrabold uppercase tracking-tight text-white">
            MÉMOIRES+
          </span>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
          {!tokenPresent ? (
            // Lien copié-collé cassé, ou accès direct sans token/email dans l'URL
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                <XCircle className="h-7 w-7 text-[var(--color-status-rejete)]" />
              </div>
              <h1 className="text-xl font-bold text-[var(--color-text)]">Lien invalide</h1>
              <p className="mt-2 text-sm text-gray-500">
                Ce lien de réinitialisation est incomplet ou incorrect. Demandez-en un nouveau.
              </p>
              <Link
                to={ROUTES.motDePasseOublie}
                className="mt-6 inline-block text-sm font-semibold text-[var(--color-primary)] hover:underline"
              >
                Demander un nouveau lien
              </Link>
            </div>
          ) : success ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2 className="h-7 w-7 text-[var(--color-status-valide)]" />
              </div>
              <h1 className="text-xl font-bold text-[var(--color-text)]">
                Mot de passe réinitialisé
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Votre mot de passe a bien été mis à jour. Vous allez être redirigé vers la
                connexion...
              </p>
              <Link
                to={ROUTES.connexionEtudiant}
                className="mt-6 inline-block text-sm font-semibold text-[var(--color-primary)] hover:underline"
              >
                Se connecter maintenant
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold text-[var(--color-text)]">
                Nouveau mot de passe
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                {email ? (
                  <>
                    Choisissez un nouveau mot de passe pour{" "}
                    <span className="font-medium">{email}</span>.
                  </>
                ) : (
                  "Choisissez un nouveau mot de passe."
                )}
              </p>

              {serverError && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {serverError}
                </div>
              )}

              <form onSubmit={submit} className="mt-6 space-y-5" noValidate>
                <Input
                  label="Nouveau mot de passe"
                  type={showPassword ? "text" : "password"}
                  name="motDePasse"
                  value={form.motDePasse}
                  onChange={(e) => updateField("motDePasse", e.target.value)}
                  placeholder="••••••••••••"
                  error={errors.motDePasse}
                  autoComplete="new-password"
                  leftIcon={<Lock className="h-5 w-5" />}
                  required
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="text-gray-400 hover:text-[var(--color-primary)]"
                      tabIndex={-1}
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  }
                />

                <Input
                  label="Confirmer le mot de passe"
                  type={showPasswordConfirm ? "text" : "password"}
                  name="motDePasseConfirmation"
                  value={form.motDePasseConfirmation}
                  onChange={(e) => updateField("motDePasseConfirmation", e.target.value)}
                  placeholder="••••••••••••"
                  error={errors.motDePasseConfirmation}
                  autoComplete="new-password"
                  leftIcon={<Lock className="h-5 w-5" />}
                  required
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPasswordConfirm((v) => !v)}
                      className="text-gray-400 hover:text-[var(--color-primary)]"
                      tabIndex={-1}
                      aria-label={
                        showPasswordConfirm ? "Masquer le mot de passe" : "Afficher le mot de passe"
                      }
                    >
                      {showPasswordConfirm ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  }
                />

                <Button type="submit" variant="primary" fullWidth loading={loading} className="py-3.5">
                  Réinitialiser le mot de passe
                </Button>
              </form>

              <div className="mt-6 flex items-start gap-3 rounded-xl bg-[var(--color-bg)] p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]" />
                <p className="text-xs leading-relaxed text-gray-600">
                  Choisissez un mot de passe unique d'au moins 8 caractères, que vous n'utilisez
                  sur aucun autre site.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}