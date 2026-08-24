import { MemoireCard } from "../../../components/ui/MemoireCard";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../router/paths";

export default function RecentMemoiresSection({ memoires }) {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="relative text-3xl font-bold text-[var(--color-primary)] after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-20 after:rounded-full after:bg-[var(--color-accent)]">
            Mémoires récents
          </h2>
          <Link to={ROUTES.recherche} className="font-semibold text-[var(--color-primary-light)] hover:underline">
            Voir tout
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {memoires.map((memoire) => (
            <MemoireCard key={memoire.id} memoire={memoire} />
          ))}
        </div>
      </div>
    </section>
  );
}