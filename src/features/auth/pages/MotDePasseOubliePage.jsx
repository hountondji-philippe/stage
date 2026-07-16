import { GraduationCap, Mail, CheckCircle2, ArrowLeft, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useMotDePasseOublie } from "../hooks/useMotDePasseOublie";

// TODO : Samson fournira l'image finale à cet emplacement exact.
import bgImage from "../../../assets/forget.png";

export default function MotDePasseOubliePage() {
  const navigate = useNavigate();
  const { email, updateEmail, error, serverError, loading, sent, submit } =
    useMotDePasseOublie();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      {/* Fond : image légèrement floutée + overlay navy, comme la connexion étudiant */}
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
        {/* Logo centré, seul en haut */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg">
            <GraduationCap className="h-6 w-6 text-[var(--color-primary)]" />
          </div>
          <span className="text-lg font-extrabold uppercase tracking-tight text-white">
            MÉMOIRES+
          </span>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2 className="h-7 w-7 text-[var(--color-status-valide)]" />
              </div>
              <h1 className="text-xl font-bold text-[var(--color-text)]">Lien envoyé</h1>
              <p className="mt-2 text-sm text-gray-500">
                Si un compte existe pour <span className="font-medium">{email}</span>, un lien
                de réinitialisation vient de lui être envoyé. Vérifiez votre boîte mail.
              </p>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour à la connexion
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold text-[var(--color-text)]">
                Mot de passe oublié
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Entrez votre adresse email institutionnelle, nous vous enverrons un lien pour
                réinitialiser votre mot de passe.
              </p>

              {serverError && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {serverError}
                </div>
              )}

              <form onSubmit={submit} className="mt-6 space-y-5" noValidate>
                <Input
                  label="Adresse email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => updateEmail(e.target.value)}
                  placeholder="exemple@eneam.uac.bj"
                  error={error}
                  autoComplete="email"
                  leftIcon={<Mail className="h-5 w-5" />}
                  required
                />

                <Button type="submit" variant="primary" fullWidth loading={loading} className="py-3.5">
                  Envoyer le lien de réinitialisation
                </Button>
              </form>

              {/* Conseil de sécurité */}
              <div className="mt-6 flex items-start gap-3 rounded-xl bg-[var(--color-bg)] p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]" />
                <p className="text-xs leading-relaxed text-gray-600">
                  Prenez soin de votre mot de passe : ne le partagez avec personne et choisissez-en
                  un unique, que vous n'utilisez sur aucun autre site.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mt-6 flex w-full items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-[var(--color-primary)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour à la connexion
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}