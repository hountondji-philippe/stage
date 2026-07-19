import { useState, useEffect, useMemo } from 'react';
import AdminLayout from "../components/AdminLayout";
import PageHeader from "../components/PageHeader";
import DepotToolbar from "../components/DepotToolbar";
import AdminDepotCard from "../components/AdminDepotCard";
import Pagination from "../components/Pagination";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import { getMemoiresEnAttente, getFiliereList } from '../api/adminService';

const PAGE_SIZE = 4; // comme dans la maquette ("Affichage 1-4 sur 8 dépôts")

function joursDepuis(dateStr) {
  if (!dateStr) return 0;
  return (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24);
}

export default function DepotsPage() {
  const [memoires, setMemoires] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [loading, setLoading] = useState(true);

  // État de la recherche/filtre/tri/pagination — géré côté frontend,
  // le controller Laravel ne supporte pas encore ces paramètres.
  const [search, setSearch] = useState("");
  const [filiereId, setFiliereId] = useState("");
  const [sort, setSort] = useState("ancien"); // "ancien" | "recent"
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [depotsRes, filieresRes] = await Promise.all([
        getMemoiresEnAttente(),
        getFiliereList(),
      ]);
      setMemoires(depotsRes.data.memoires || []);
      setFilieres(filieresRes.data.filieres || []);
    } catch (err) {
      console.error("Erreur de chargement:", err);
    } finally {
      setLoading(false);
    }
  };

  // Recherche + filtre + tri, recalculés à chaque changement
  const filtered = useMemo(() => {
    let result = memoires;

    if (search) {
      const terme = search.toLowerCase();
      result = result.filter((m) => {
        const etudiant = m.user?.etudiantAutorise ?? m.user?.etudiant_autorise;
        const nomComplet = etudiant ? `${etudiant.nom} ${etudiant.prenom}` : m.user?.email ?? "";
        return (
          m.titre?.toLowerCase().includes(terme) ||
          nomComplet.toLowerCase().includes(terme)
        );
      });
    }

    if (filiereId) {
      result = result.filter((m) => String(m.filiere_id) === String(filiereId));
    }

    result = [...result].sort((a, b) => {
      const diff = joursDepuis(b.created_at) - joursDepuis(a.created_at);
      return sort === "ancien" ? diff : -diff;
    });

    return result;
  }, [memoires, search, filiereId, sort]);

  // Repart à la page 1 dès qu'un filtre change
  useEffect(() => {
    setPage(1);
  }, [search, filiereId, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <AdminLayout>
      <PageHeader
        title="Dépôts en attente"
        subtitle={`${memoires.length} dépôt(s) à examiner pour validation finale.`}
      />

      <DepotToolbar
        search={search}
        onSearchChange={setSearch}
        filiereId={filiereId}
        onFiliereChange={setFiliereId}
        filieres={filieres}
        sort={sort}
        onSortChange={setSort}
      />

      {loading ? (
        <div className="relative min-h-[320px]">
          <LoadingScreen fullScreen={false} message="Chargement en cours..." />
        </div>
      ) : paginated.length === 0 ? (
        <div className="rounded-2xl border border-outline-variant bg-white p-10 text-center text-gray-400">
          Aucun dépôt ne correspond à ces critères.
        </div>
      ) : (
        <div className="space-y-4">
          {paginated.map((memoire) => (
            <AdminDepotCard key={memoire.id} memoire={memoire} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={filtered.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </AdminLayout>
  );
}