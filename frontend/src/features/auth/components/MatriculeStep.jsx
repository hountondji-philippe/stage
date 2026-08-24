import { IdCard, Info, MailCheck, CheckCircle2, AlertCircle, RotateCw, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/TextField";

export default function MatriculeStep({
  matricule,
  onChangeMatricule,
  onVerifier,
  loading,
  erreur,
  etape,
  chrono,
  renvoiLoading,
  renvoiMessage,
  onRenvoyer,
  onRenvoyerCode,
  codeL2,
  onChangeCodeL2,
  codeL2Loading,
  codeL2Erreur,
  onVerifierCode,
}) {
  // --- Étape : accès en lecture seule L2 (saisie du code à 6 chiffres) ---
  if (etape === "code_l2") {
    const handleSubmitCode = (e) => {
      e.preventDefault();
      onVerifierCode();
    };

    return (
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20">
            <KeyRound className="w-9 h-9 text-white" strokeWidth={1.75} />
          </div>
          <h3 className="text-2xl font-bold text-[var(--color-text)]">Saisissez votre code d'accès</h3>
          <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
            Un code à 6 chiffres a été envoyé à l'adresse enregistrée pour le matricule{" "}
            <span className="font-semibold text-[var(--color-text)]">{matricule}</span>. Ce code expire
            dans 15 minutes et donne un accès en lecture seule de 24 heures.
          </p>
        </div>

        <form onSubmit={handleSubmitCode} className="space-y-4">
          <Input
            label="Code à 6 chiffres"
            name="code_l2"
            value={codeL2}
            onChange={(e) => onChangeCodeL2(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="000000"
            inputMode="numeric"
            maxLength={6}
            error={codeL2Erreur}
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={codeL2Loading}
            disabled={codeL2.trim().length !== 6}
          >
            Valider le code
          </Button>
        </form>

        {renvoiMessage && (
          <p
            className={`text-sm font-medium flex items-center justify-center gap-1.5 ${
              renvoiMessage.type === "succes" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {renvoiMessage.type === "succes" ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {renvoiMessage.texte}
          </p>
        )}

        <div className="space-y-2 text-center">
          <Button variant="outline" fullWidth loading={renvoiLoading} disabled={chrono > 0} onClick={onRenvoyerCode}>
            <RotateCw className="w-4 h-4" />
            Renvoyer un code
          </Button>
          {chrono > 0 && (
            <p className="text-xs text-gray-400">
              Vous pourrez renvoyer un code dans{" "}
              <span className="font-semibold text-[var(--color-primary)] tabular-nums">{chrono}s</span>
            </p>
          )}
        </div>
      </div>
    );
  }

  // --- Étape : email d'activation envoyé (L3/M1/M2) ---
  if (etape === "lien_envoye") {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20">
          <MailCheck className="w-9 h-9 text-white" strokeWidth={1.75} />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-[var(--color-text)]">Vérifiez votre boîte mail</h3>
          <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
            Un email d'activation a été envoyé à l'adresse enregistrée pour le matricule{" "}
            <span className="font-semibold text-[var(--color-text)]">{matricule}</span>. Cliquez sur le
            lien qu'il contient pour définir votre mot de passe.
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-4 text-left flex items-start gap-3">
          <Info className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-500 leading-relaxed">
            Vous ne trouvez pas l'email ? Pensez à vérifier vos courriers indésirables (spam) —
            l'envoi peut prendre quelques minutes.
          </p>
        </div>

        {renvoiMessage && (
          <p
            className={`text-sm font-medium flex items-center justify-center gap-1.5 ${
              renvoiMessage.type === "succes" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {renvoiMessage.type === "succes" ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {renvoiMessage.texte}
          </p>
        )}

        <div className="space-y-2">
          <Button variant="outline" fullWidth loading={renvoiLoading} disabled={chrono > 0} onClick={onRenvoyer}>
            <RotateCw className="w-4 h-4" />
            Renvoyer le lien
          </Button>
          {chrono > 0 && (
            <p className="text-xs text-gray-400">
              Vous pourrez renvoyer un lien dans{" "}
              <span className="font-semibold text-[var(--color-primary)] tabular-nums">{chrono}s</span>
            </p>
          )}
        </div>
      </div>
    );
  }

  // --- Étape par défaut : saisie du matricule ---
  const handleSubmit = (e) => {
    e.preventDefault();
    onVerifier();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Matricule"
        name="matricule"
        value={matricule}
        onChange={(e) => onChangeMatricule(e.target.value)}
        placeholder="Ex : 2021-00123"
        leftIcon={<IdCard className="w-4 h-4" />}
        error={erreur?.message}
        required
      />

      {erreur?.dejaActive && (
        <p className="text-sm">
          <Link to="/connexion-etudiant" className="text-[var(--color-primary)] font-semibold underline">
            Aller à la connexion
          </Link>
        </p>
      )}

      <Button type="submit" variant="primary" fullWidth loading={loading} disabled={!matricule.trim()}>
        Vérifier
      </Button>
    </form>
  );
}