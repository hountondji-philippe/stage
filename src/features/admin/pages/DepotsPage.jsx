import { useState, useEffect } from 'react';
import AdminLayout from "../components/AdminLayout";
import PageHeader from "../components/PageHeader";
import DepotToolbar from "../components/DepotToolbar";
import DepotsTable from "../components/DepotsTable";
import Pagination from "../components/Pagination";
import { getMemoiresEnAttente } from '../api/adminService';

export default function DepotsPage() {
  const [memoires, setMemoires] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await getMemoiresEnAttente();
      setMemoires(data.memoires || []);
    } catch (err) {
      console.error("Erreur de chargement:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <PageHeader 
        title="Dépôts en attente" 
        subtitle="8 dépôts à examiner pour validation finale." 
      />
      
      <DepotToolbar />

      {loading ? (
        <div className="p-10 text-center">Chargement en cours...</div>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant card-shadow overflow-hidden">
          <DepotsTable memoires={memoires} />
          <Pagination />
        </div>
      )}
    </AdminLayout>
  );
}