import { useState } from "react";
import { CheckCircle2, UserPlus, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";
import PasswordField from "../../../components/ui/PasswordField";

export default function CompteStep({ nom, emailSuggere, onCreerCompte, loading, erreur }) {
  const [email, setEmail] = useState(emailSuggere || "");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [accepteConditions, setAccepteConditions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreerCompte({ email, password, passwordConfirmation, accepteConditions });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[var(--color-accent)]/10 text-[var(--color-text)] p-4 rounded-lg border-l-4 border-[var(--color-accent)] flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold">Matricule vérifié</p>
          {nom && <p className="text-xs opacity-90">{nom}</p>}
        </div>
      </div>

      <div className="space-y-4">
        <TextField
          id="email"
          label="Email"
          icon={Mail}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PasswordField
            id="password"
            label="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PasswordField
            id="password-confirmation"
            label="Confirmer"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>

        <div className="flex items-start gap-3 py-1">
          <input
            id="terms"
            type="checkbox"
            checked={accepteConditions}
            onChange={(e) => setAccepteConditions(e.target.checked)}
            className="w-4 h-4 mt-0.5 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)]"
          />
          <label htmlFor="terms" className="text-xs text-gray-600">
            J'accepte les{" "}
            <Link to="/conditions-utilisation" className="text-[var(--color-primary)] underline font-bold">
              conditions d'utilisation
            </Link>
          </label>
        </div>

        {erreur && <p className="text-xs text-red-600">{erreur.message}</p>}

        <Button type="submit" variant="accent" fullWidth loading={loading} disabled={!accepteConditions}>
          Créer mon compte
          <UserPlus className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
}