import { useEffect, useState, useCallback } from 'react';
import api from '../api/api';

export function useAnalyticsData(refreshMs = 60000) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [status, timeseries, hist, income, chain, actions] = await Promise.all([
        api.get('/analytics/status-breakdown'),
        api.get('/analytics/applications-timeseries?days=30'),
        api.get('/analytics/eligibility-histogram'),
        api.get('/analytics/income-groups'),
        api.get('/analytics/blockchain-activity'),
        api.get('/analytics/admin-actions'),
      ]);
      setData({
        status: status.data,
        timeseries: timeseries.data,
        histogram: hist.data,
        income: income.data,
        blockchain: chain.data,
        adminActions: actions.data,
      });
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);
  useEffect(() => {
    if (!refreshMs) return;
    const id = setInterval(fetchAll, refreshMs);
    return () => clearInterval(id);
  }, [fetchAll, refreshMs]);

  return { loading, error, data, refresh: fetchAll };
}

export function useGeoData() {
  const [geo, setGeo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/analytics/geo/beneficiaries');
      setGeo(res.data);
    } catch (e) { setError(e); } finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);
  return { geo, loading, error, refresh: load };
}