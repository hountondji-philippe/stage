import { GraduationCap, KeyRound, Clock, XCircle, UserCheck, ShieldAlert, RotateCw, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/TextField";
import PasswordField from "../../../components/ui/PasswordField";
import { useActivation, ETATS } from "../hooks/useActivation";
import { ROUTES } from "../../../router/paths";

export default function ActivationPage() {
  const {
    etat,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    loading,
    erreur,
    activerCompte,
    matriculeRenvoi,
    setMatriculeRenvoi,
    renvoiLoading,
    renvoiMessage,
    renvoyerLien,
  } = useActivation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="flex justify-center items-center w-full py-10">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--color-primary)]">MÉMOIRES+</h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-start px-4 pb-16">
        <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          {etat === ETATS.FORMULAIRE && (
            <form onSubmit={activerCompte} className="space-y-6">
              <div className="text-center space-y-3">
                <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20">
                  <KeyRound className="w-9 h-9 text-white" strokeWidth={1.75} />
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-text)]">
                  Définissez votre mot de passe
                </h2>
                <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">
                  Dernière étape avant d'activer votre compte étudiant.
                </p>
              </div>

              <div className="space-y-4 text-left">
                <PasswordField
                  label="Mot de passe"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <PasswordField
                  label="Confirmer le mot de passe"
                  name="password_confirmation"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-400 -mt-2">Au moins 8 caractères.</p>
              </div>

              {erreur && (
                <p className="text-sm text-red-600 flex items-center justify-center gap-1.5 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {erreur}
                </p>
              )}

              <Button type="submit" variant="primary" fullWidth loading={loading}>
                Activer mon compte
              </Button>
            </form>
          )}

          {etat === ETATS.EXPIRE && (
            <div className="text-center space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center">
                <Clock className="w-9 h-9 text-amber-500" strokeWidth={1.75} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-[var(--color-text)]">Lien expiré</h2>
                <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">
                  Ce lien d'activation a expiré. Saisissez votre matricule pour en recevoir un nouveau.
                </p>
              </div>

              <div className="text-left space-y-3 pt-2">
                <Input
                  label="Matricule"
                  name="matriculeRenvoi"
                  value={matriculeRenvoi}
                  onChange={(e) => setMatriculeRenvoi(e.target.value)}
                  placeholder="Votre matricule"
                />
                {renvoiMessage && (
                  <p
                    className={`text-sm font-medium flex items-center gap-1.5 ${
                      renvoiMessage.type === "succes" ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {renvoiMessage.type === "succes" ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    )}
                    {renvoiMessage.texte}
                  </p>
                )}
                <Button
                  type="button"
                  variant="primary"
                  fullWidth
                  loading={renvoiLoading}
                  disabled={!matriculeRenvoi.trim()}
                  onClick={renvoyerLien}
                >
                  <RotateCw className="w-4 h-4" />
                  Renvoyer un lien d'activation
                </Button>
              </div>
            </div>
          )}

          {etat === ETATS.INVALIDE && (
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
                <XCircle className="w-9 h-9 text-red-500" strokeWidth={1.75} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-[var(--color-text)]">Lien invalide</h2>
                <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">
                  Ce lien d'activation n'est pas reconnu. Vérifiez que vous avez copié l'adresse complète.
                </p>
              </div>
              <Link
                to={ROUTES.connexionEtudiant}
                className="inline-block text-[var(--color-primary)] font-semibold underline underline-offset-2"
              >
                Retour à la connexion
              </Link>
            </div>
          )}

          {etat === ETATS.DEJA_ACTIVE && (
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                <UserCheck className="w-9 h-9 text-[var(--color-primary)]" strokeWidth={1.75} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-[var(--color-text)]">Compte déjà activé</h2>
                <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">
                  Ce compte est déjà activé. Connectez-vous directement avec vos identifiants.
                </p>
              </div>
              <Link
                to={ROUTES.connexionEtudiant}
                className="inline-block text-[var(--color-primary)] font-semibold underline underline-offset-2"
              >
                Aller à la connexion
              </Link>
            </div>
          )}

          {etat === ETATS.NIVEAU_NON_AUTORISE && (
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <ShieldAlert className="w-9 h-9 text-gray-500" strokeWidth={1.75} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-[var(--color-text)]">Inscription non autorisée</h2>
                <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">
                  L'inscription en ligne est réservée aux étudiants de Licence 3, Master 1 et Master 2.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}