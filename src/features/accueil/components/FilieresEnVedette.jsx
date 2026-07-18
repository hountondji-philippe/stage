import { useEffect, useState } from "react";
import {
  Landmark,
  Briefcase,
  Calculator,
  TrendingUp,
  Scale,
  Users,
  Globe,
  GraduationCap,
} from "lucide-react";
import { FiliereCard } from "./FiliereCard";
import { getFilieres, getToutesSousFilieres } from "../../memoires/api/filieresApi";
const ICONES_PAR_MOT_CLE = [
  { motCle: "finance", icon: Landmark },
  { motCle: "comptab", icon: Landmark },
  { motCle: "projet", icon: Briefcase },
  { motCle: "audit", icon: Calculator },
  { motCle: "contrôle", icon: Calculator },
  { motCle: "marketing", icon: TrendingUp },
  { motCle: "commerce", icon: TrendingUp },
  { motCle: "droit", icon: Scale },
  { motCle: "juridique", icon: Scale },
  { motCle: "ressources humaines", icon: Users },
  { motCle: "rh", icon: Users },
  { motCle: "international", icon: Globe },
];

function iconePourFiliere(nom) {
  const nomNormalise = nom.toLowerCase();
  const trouve = ICONES_PAR_MOT_CLE.find((entree) => nomNormalise.includes(entree.motCle));
  return trouve ? trouve.icon : GraduationCap;
}

export default function FilieresEnVedette() {
  const [filieres, setFilieres] = useState([]);
  const [sousFilieresParFiliere, setSousFilieresParFiliere] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    Promise.all([getFilieres(), getToutesSousFilieres()])
      .then(([listeFilieres, listeSousFilieres]) => {
        if (!mounted) return;

        const groupees = {};
        listeSousFilieres.forEach((sf) => {
          if (!groupees[sf.filiere_id]) groupees[sf.filiere_id] = [];
          groupees[sf.filiere_id].push(sf);
        });

        setFilieres(listeFilieres);
        setSousFilieresParFiliere(groupees);
      })
      .catch(() => {
        if (mounted) setError("Impossible de charger les filières.");
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
            Filières en vedette
          </h2>
          <span className="hidden h-1 w-16 rounded-full bg-[var(--color-accent)] md:block" />
        </div>
        <p className="mb-10 max-w-2xl text-gray-500 md:mb-14">
          Explorez les travaux de recherche classés par domaine d'étude.
        </p>

        {loading ? (
          <div className="py-12 text-center text-sm text-gray-400">Chargement des filières...</div>
        ) : error ? (
          <div className="py-12 text-center text-sm text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filieres.map((f) => (
              <FiliereCard
                key={f.id}
                filiere={{
                  id: f.id,
                  nom: f.nom,
                  description: f.description,
                  icon: iconePourFiliere(f.nom),
                  memoires_count: f.memoires_count,
                }}
                sousFilieres={sousFilieresParFiliere[f.id] || []}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}