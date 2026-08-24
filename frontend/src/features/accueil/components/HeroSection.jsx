import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { ROUTES } from "../../../router/paths";
import { useAuth } from "../../auth/context/AuthContext";
import heroBg from "../../../assets/auth-etudiant-bg.jpg";

export default function HeroSection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAuthenticated = Boolean(user);

  function handleDeposer() {
    if (user?.role === "admin") {
      window.alert("Un administrateur ne peut pas déposer de mémoire.");
      return;
    }
    // Si connecté et étudiant -> dépôt, sinon -> connexion étudiant
    navigate(isAuthenticated ? ROUTES.depotEtudiant : ROUTES.connexionEtudiant);
  }

  return (
    <section 
  className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cover bg-center px-6 py-20 text-center"
  style={{ backgroundImage: `url(${heroBg})` }}
>
      <div className="absolute inset-0 bg-[var(--color-primary)]/80" /> {/* Calque de couleur */}

      <div className="relative z-10 mx-auto max-w-5xl">
        <h1 className="mb-8 text-4xl font-black leading-tight tracking-tight text-white drop-shadow-lg md:text-6xl">
          Consultez et déposez les mémoires de{" "}
          <span className="italic text-[var(--color-accent)]">l'ENEAM</span>
        </h1>
        <p className="mx-auto mb-12 max-w-3xl text-xl font-medium leading-relaxed text-white/90 drop-shadow-md md:text-2xl">
          La plateforme officielle de centralisation des travaux académiques.
          Accédez à des milliers de ressources de recherche{" "}
          <span className="italic text-[var(--color-accent)]">validées</span> par nos facultés.
        </p>

        <Button variant="accent" className="px-10 py-4 text-lg" onClick={handleDeposer}>
          Déposer mon mémoire
        </Button>
      </div>
    </section>
  );
}