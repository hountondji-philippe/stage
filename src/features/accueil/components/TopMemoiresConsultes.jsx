import { TopMemoireRow } from "./TopMemoireRow";

export default function TopMemoiresConsultes() {
  // TODO: remplacer par un fetch backend (GET /memoires/populaires ou équivalent)
  const top = [
    { id: 1, rang: 1, titre: "Analyse de la performance financière des PME en zone UEMOA", auteur: "Jean-Paul ADANON", filiere: "Finance & Comptabilité", vues: "3,204" },
    { id: 2, rang: 2, titre: "Impact de l'intelligence artificielle sur l'audit comptable", auteur: "Koffi MENSAH", filiere: "Audit et Contrôle de Gestion", vues: "2,857" },
    { id: 3, rang: 3, titre: "Stratégies de Management Digital dans l'administration publique", auteur: "Mariam SOULE", filiere: "Management des Projets", vues: "2,410" },
    { id: 4, rang: 4, titre: "Digitalisation des PME beninoises : enjeux et perspectives", auteur: "Aïcha BOKO", filiere: "Marketing & Commerce", vues: "1,932" },
  ];

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

        <div className="flex flex-col gap-4">
          {top.map((m) => (
            <TopMemoireRow key={m.id} memoire={m} />
          ))}
        </div>
      </div>
    </section>
  );
}