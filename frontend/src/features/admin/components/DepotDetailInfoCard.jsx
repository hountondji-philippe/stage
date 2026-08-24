import { useState } from "react";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR");
}

export default function DepotDetailInfoCard({ memoire }) {
  const [showFull, setShowFull] = useState(false);
  const etudiant = memoire.user?.etudiantAutorise ?? memoire.user?.etudiant_autorise;
  const nomComplet = etudiant ? `${etudiant.nom} ${etudiant.prenom}` : memoire.user?.email ?? "—";

  // Binôme : nom/prénom stockés directement sur Memoire (pas une relation),
  // uniquement présents si mode_depot === "binome".
  const estBinome = memoire.mode_depot === "binome";
  const nomBinome =
    estBinome && memoire.prenom_binome
      ? `${memoire.prenom_binome} ${memoire.nom_binome}`
      : null;

  const rows = [
    { label: "Auteur", value: nomComplet },
    nomBinome && { label: "Binôme", value: nomBinome },
    { label: "Filière", value: memoire.filiere?.nom },
    { label: "Année", value: memoire.annee },
    { label: "Encadrant", value: memoire.encadrant },
    { label: "Date de dépôt", value: formatDate(memoire.created_at) },
  ].filter(Boolean);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-bold text-[var(--color-primary)]">Informations</h3>

      <dl className="space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between border-b border-gray-100 pb-2">
            <dt className="text-xs font-medium uppercase text-gray-500">{row.label}</dt>
            <dd className="text-right text-sm font-semibold text-gray-900">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <h4 className="mb-2 text-xs font-medium uppercase text-gray-500">Résumé</h4>
        <p className={`text-sm leading-relaxed text-gray-700 ${!showFull ? "line-clamp-4" : ""}`}>
          {memoire.resume}
        </p>
        {memoire.resume?.length > 200 && (
          <button
            onClick={() => setShowFull((v) => !v)}
            className="mt-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            {showFull ? "Réduire" : "Lire la suite"}
          </button>
        )}
      </div>
    </div>
  );
}