import { useState } from "react";
import { User, GraduationCap, Calendar, Users, Eye, CheckCircle2 } from "lucide-react";

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-bg)] text-[var(--color-primary)]">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="truncate text-sm font-medium text-[var(--color-text)]">{value || "—"}</p>
      </div>
    </div>
  );
}

export default function InfoCard({ memoire }) {
  const [resumeOuvert, setResumeOuvert] = useState(false);

  const auteur = memoire.user?.etudiant_autorise
    ? `${memoire.user.etudiant_autorise.prenom} ${memoire.user.etudiant_autorise.nom}`
    : "Auteur inconnu";

  return (
    <aside className="w-full md:w-[35%]">
      <div className="sticky top-24 flex flex-col gap-6 rounded-xl border border-gray-100 bg-white p-6 shadow-[0px_4px_20px_rgba(19,36,107,0.05)] sm:p-8">
        <div>
          <span className="mb-4 inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
            <CheckCircle2 size={14} />
            Validé
          </span>
          <h1 className="mb-4 text-xl font-bold leading-tight text-[var(--color-primary)]">
            {memoire.titre}
          </h1>
          <p className={`text-sm text-gray-500 ${resumeOuvert ? "" : "line-clamp-4"}`}>
            {memoire.resume}
          </p>
          {memoire.resume?.length > 200 && (
            <button
              onClick={() => setResumeOuvert((v) => !v)}
              className="mt-2 text-sm font-medium text-[var(--color-primary-light)] hover:underline"
            >
              {resumeOuvert ? "Voir moins" : "Lire la suite"}
            </button>
          )}
        </div>

        <div className="h-px w-full bg-gray-100" />

        <div className="flex flex-col gap-4">
          <InfoRow icon={User} label="Auteur" value={auteur} />
          <InfoRow icon={GraduationCap} label="Filière" value={memoire.filiere?.nom} />
          <InfoRow icon={Calendar} label="Année" value={memoire.annee} />
          <InfoRow icon={Users} label="Maître de mémoire" value={memoire.encadrant} />
          <InfoRow icon={Eye} label="Vues" value={`${memoire.views_count ?? 0} lectures`} />
        </div>
      </div>
    </aside>
  );
}