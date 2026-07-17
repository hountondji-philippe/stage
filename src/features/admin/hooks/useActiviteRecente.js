import { useEffect, useState } from "react";
import { getAllMemoires } from "../api/adminService";

function nomAuteur(m) {
  const etudiant = m.user?.etudiantAutorise ?? m.user?.etudiant_autorise;
  return etudiant ? `${etudiant.nom} ${etudiant.prenom}` : m.user?.email ?? "—";
}

/**
 * ⚠️ Pas de table/route "notifications" côté backend pour l'instant.
 * On dérive une timeline d'activité à partir de GET /admin/memoires
 * (statut + dates) : validations, rejets, nouveaux dépôts.
 * À remplacer par un vrai flux de notifications si tu en codes un jour un.
 */
export function useActiviteRecente(limit = 6) {
  const [activites, setActivites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllMemoires();
        const memoires = data.memoires || data.data || data || [];

        const evenements = memoires.map((m) => {
          if (m.statut === "valide") {
            return {
              id: `valide-${m.id}`,
              type: "valide",
              date: m.valide_le || m.updated_at,
              titre: m.titre,
              detail: `Auteur : ${nomAuteur(m)}`,
            };
          }
          if (m.statut === "rejete") {
            return {
              id: `rejete-${m.id}`,
              type: "rejete",
              date: m.valide_le || m.updated_at,
              titre: m.titre,
              detail: m.motif_rejet ? `Motif : ${m.motif_rejet}` : "Rejeté",
            };
          }
          return {
            id: `depot-${m.id}`,
            type: "depot",
            date: m.created_at,
            titre: m.titre,
            detail: `Auteur : ${nomAuteur(m)} • En attente d'examen`,
          };
        });

        const tries = evenements
          .filter((e) => e.date)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, limit);

        setActivites(tries);
      } catch (err) {
        setError("Impossible de charger l'activité récente.");
      } finally {
        setLoading(false);
      }
    })();
  }, [limit]);

  return { activites, loading, error };
}
