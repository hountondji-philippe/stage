import { useEffect, useState } from "react";
import { TopMemoireRow } from "./TopMemoireRow";
import { apiClient } from "../../../lib/apiClient";
import { extraireTableau } from "../../../lib/apiUtils";

export default function TopMemoiresConsultes() {
  const [memoires, setMemoires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    apiClient
      .get("/memoires/plus-consultes")
      .then(({ data }) => {
        if (mounted) setMemoires(extraireTableau(data, "memoires").slice(0, 5));
      })
      .catch(() => {
        if (mounted) setError("Impossible de charger le classement.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center gap-3">
          <h2 className="text-2xl font-extrabold text-[var(--color-primary)] md:text-3xl">
            Les plus consultés
          </h2>
          <span className="hidden h-1 w-16 rounded-full bg-[var(--color-accent)] md:block" />
        </div>
        <p className="mb-10 max-w-2xl text-gray-500 md:mb-14">
          Le classement des travaux les plus lus par la communauté ENEAM.
        </p>

        {loading ? (
          <div className="py-12 text-center text-sm text-gray-400">Chargement du classement...</div>
        ) : error ? (
          <div className="py-12 text-center text-sm text-red-500">{error}</div>
        ) : memoires.length === 0 ? (
          <div className="py-12 text-center text-sm text-gray-400">Aucun mémoire consulté pour l'instant.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {memoires.map((memoire, index) => (
              <TopMemoireRow key={memoire.id} memoire={memoire} rang={index + 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}