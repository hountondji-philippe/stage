import { Mail, Lock, Eye, EyeOff, ArrowRight, Globe } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useLoginEtudiant } from "../hooks/useLoginEtudiant";

export default function ConnexionEtudiantForm() {
  const { form, updateField, errors, serverError, loading, submit } = useLoginEtudiant();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[440px] space-y-8">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">
          Connexion à mon espace
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Veuillez entrer vos identifiants institutionnels pour continuer.
        </p>
      </div>

      {serverError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <form onSubmit={submit} className="space-y-5" noValidate>
        <Input
          label="Adresse email"
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="exemple@eneam.uac.bj"
          error={errors.email}
          autoComplete="email"
          leftIcon={<Mail className="h-5 w-5" />}
          required
        />

        <Input
          label="Mot de passe"
          type={showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
          placeholder="••••••••••••"
          error={errors.password}
          autoComplete="current-password"
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

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => updateField("remember", e.target.checked)}
              className="h-4.5 w-4.5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            />
            Se souvenir de moi
          </label>
          <Link
            to="/mot-de-passe-oublie"
            className="text-sm font-semibold text-[var(--color-accent)] hover:brightness-90 sm:text-right"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <Button type="submit" variant="primary" fullWidth loading={loading} className="py-3.5">
          Se connecter
          {!loading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">ou</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <Link
          to="/archive"
          className="flex items-center justify-center gap-2 text-sm text-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
        >
          <Globe className="h-4 w-4" />
          Consulter les mémoires sans compte
        </Link>
      </div>

      {/* Lien inscription — visible seulement mobile (déjà dans le panneau visuel en desktop) */}
      <p className="text-center text-sm text-gray-500 md:hidden">
        Pas encore de compte ?{" "}
        <Link to="/inscription" className="font-semibold text-[var(--color-primary)]">
          Inscrivez-vous avec votre matricule
        </Link>
      </p>
    </div>
  );
}