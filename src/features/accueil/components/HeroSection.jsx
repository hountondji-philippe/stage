import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Button from "../../../components/ui/Button";
import { ROUTES } from "../../../router/paths";

export default function HeroSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // TODO(auth): rôle réel une fois l'AuthContext branché.
  const role = "invite"; // "invite" | "etudiant" | "admin"

  function handleSearch(e) {
    e.preventDefault();
    const params = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
    navigate(`${ROUTES.recherche}${params}`);
  }

  function handleDeposer() {
  if (role === "admin") {
    window.alert("Un administrateur ne peut pas déposer de mémoire.");
    return;
  }
  navigate(role === "etudiant" ? ROUTES.depotEtudiant : ROUTES.inscription);
}

  return (
    <section className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden bg-[var(--color-primary)] px-6 py-20 text-center">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[var(--color-primary-light)] blur-[120px]" />
        <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-[var(--color-accent)] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-extrabold leading-tight text-white md:text-5xl">
          Consultez et déposez les mémoires de l'ENEAM
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-white/80 text-lg">
          La plateforme officielle de centralisation des travaux académiques.
          Accédez à des milliers de ressources de recherche validées par nos
          facultés.
        </p>

        <form
          onSubmit={handleSearch}
          className="mx-auto mb-10 flex w-full max-w-3xl flex-col gap-2 rounded-xl bg-white p-2 shadow-xl md:flex-row"
        >
          <div className="flex flex-1 items-center border-b border-gray-200 px-4 md:border-b-0 md:border-r">
            <Search size={20} className="mr-3 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Thème, mot-clé, auteur..."
              className="w-full border-none py-3 text-sm text-[var(--color-text)] outline-none placeholder:text-gray-400"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-[var(--color-primary)] px-8 py-3 font-bold text-white transition-colors hover:bg-[var(--color-primary-light)]"
          >
            Rechercher
          </button>
        </form>

        <Button variant="accent" className="px-10 py-4 text-lg" onClick={handleDeposer}>
          Déposer mon mémoire
        </Button>
      </div>
    </section>
  );
}