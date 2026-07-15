import { useState, useEffect } from "react";
import { getAccueilStats, getRecentMemoires } from "../api/accueilApi";

export const useAccueilData = () => {
  const [data, setData] = useState({ stats: null, recentes: [], loading: true, error: null });

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, memoiresRes] = await Promise.all([
          getAccueilStats(),
          getRecentMemoires()
        ]);
        
        setData({
          stats: statsRes.data,
          recentes: memoiresRes.data.data, // Selon la structure paginée de Laravel
          loading: false,
          error: null
        });
      } catch (err) {
        setData(prev => ({ ...prev, loading: false, error: err }));
      }
    }
    fetchData();
  }, []);

  return data;
};