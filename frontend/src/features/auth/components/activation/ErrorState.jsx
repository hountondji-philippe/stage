import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../../components/ui/Button";

export default function ErrorState({ messageErreur, email, onChangeEmail, onRenvoyer, envoiEnCours, message }) {
  return (
    <section className="flex flex-col items-center text-center w-full">
      <div className="mb-6 w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
        <XCircle className="w-10 h-10 text-red-600" />
      </div>
      <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-6">{messageErreur || "Lien expiré"}</h2>

      <div className="w-full space-y-3 mb-6">
        <div className="text-left">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-1">
            Adresse e-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            placeholder="etudiant@eneam.uac.bj"
            className="w-full border border-gray-300 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
          />
        </div>

        {message && (
          <p className={`text-sm ${message.type === "succes" ? "text-green-600" : "text-red-600"}`}>
            {message.texte}
          </p>
        )}

        <Button variant="primary" fullWidth loading={envoiEnCours} disabled={!email.trim()} onClick={onRenvoyer}>
          Renvoyer le lien d'activation
        </Button>
      </div>

      <Link to="/connexion" className="text-sm font-semibold text-[var(--color-primary)] hover:underline">
        Retour à la connexion
      </Link>
    </section>
  );
}