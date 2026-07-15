import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../router/paths";
import { useAuth } from "../../auth/context/AuthContext";

export default function CtaFinalSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-4xl rounded-[32px] bg-[var(--color-primary)] p-12 text-center text-white">
        <h2 className="mb-6 text-3xl font-black">Prêt à valoriser votre travail ?</h2>
        <p className="mb-10 text-lg opacity-90">Rejoignez la communauté académique de l'ENEAM.</p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button 
            variant="accent" 
            onClick={() => navigate(isAuthenticated ? ROUTES.depotEtudiant : ROUTES.inscription)}
          >
            Déposer mon mémoire
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10">
            Contacter l'administration
          </Button>
        </div>
      </div>
    </section>
  );
}