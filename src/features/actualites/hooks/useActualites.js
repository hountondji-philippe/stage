import { useState, useEffect, useMemo } from "react";
import { getActualites } from "../../admin/api/actualitesApi";

export function useActualites() {
  const [actualites, setActualites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [recherche, setRecherche] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [tri, setTri] = useState("recent");

  useEffect(() => {
    let mounted = true;
    getActualites()
      .then((data) => mounted && setActualites(data))
      .catch(() => mounted && setError("Impossible de charger les actualités."))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const resultats = useMemo(() => {
    let liste = [...actualites];

    if (recherche.trim()) {
      const terme = recherche.trim().toLowerCase();
      liste = liste.filter((a) => a.titre?.toLowerCase().includes(terme));
    }
    if (dateDebut) {
      liste = liste.filter((a) => a.date_publication >= dateDebut);
    }
    if (dateFin) {
      liste = liste.filter((a) => a.date_publication <= dateFin);
    }

    liste.sort((a, b) => {
      const diff = new Date(b.date_publication) - new Date(a.date_publication);
      return tri === "recent" ? diff : -diff;
    });

    return liste;
  }, [actualites, recherche, dateDebut, dateFin, tri]);

  function reinitialiser() {
    setRecherche("");
    setDateDebut("");
    setDateFin("");
    setTri("recent");
  }

  return {
    actualites: resultats,
    total: actualites.length,
    loading,
    error,
    recherche,
    setRecherche,
    dateDebut,
    setDateDebut,
    dateFin,
    setDateFin,
    tri,
    setTri,
    reinitialiser,
  };
}