import React from 'react';
import { useAnalyticsData, useGeoData } from '../hooks/useAnalyticsData';
import StatusPieChart from '../components/charts/StatusPieChart';
import ApplicationsLineChart from '../components/charts/ApplicationsLineChart';
import EligibilityHistogram from '../components/charts/EligibilityHistogram';
import IncomeGroupsBarChart from '../components/charts/IncomeGroupsBarChart';
import BlockchainActivityAreaChart from '../components/charts/BlockchainActivityAreaChart';
import AdminActionsBarChart from '../components/charts/AdminActionsBarChart';
import TopDistrictsLeaderboard from '../components/charts/TopDistrictsLeaderboard';
import BeneficiaryMap from '../components/BeneficiaryMap';
import ChartErrorBoundary from '../components/ChartErrorBoundary';

function Loading() { 
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-sm text-[#6C757D] animate-pulse">Loading...</div>
    </div>
  );
}

function ErrorMsg({e}) { 
  return (
    <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-lg p-3">
      {e?.message||'Error'}
    </div>
  );
}

export default function AdminAnalytics() {
  const { loading, error, data, refresh } = useAnalyticsData(60000);
  const geo = useGeoData();
  return (
    <div className="dark-analytics min-h-screen p-8">
      {/* Header with Indian Flag Colors */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{
            fontFamily: 'Poppins, sans-serif',
            background: 'linear-gradient(135deg, #FF9933 0%, #138808 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Analytics & Geospatial Intelligence
          </h1>
          <p className="text-[#6C757D] text-sm">Real-time insights and data visualization</p>
        </div>
        <button 
          onClick={refresh} 
          className="px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)',
            color: '#000',
            boxShadow: '0 4px 6px rgba(255, 153, 51, 0.3)',
            fontFamily: 'Poppins, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 12px rgba(255, 153, 51, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(255, 153, 51, 0.3)';
          }}
        >
          🔄 Refresh Data
        </button>
      </div>
      {error && <ErrorMsg e={error} />}
      <div className="analytics-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))' }}>
        <div className="analytics-panel col-span-2" style={{ minHeight: 340 }}>
          <h4>Beneficiary Map</h4>
          {geo.loading && <Loading />}
          {!geo.loading && geo.geo && (
            <BeneficiaryMap geo={geo.geo} />
          )}
        </div>
        <div className="analytics-panel" style={{ minHeight: 340 }}>
          <h4>Applications Over Time</h4>
          <ChartErrorBoundary>
            {loading ? <Loading /> : <ApplicationsLineChart series={data.timeseries} />}
          </ChartErrorBoundary>
        </div>
        <div className="analytics-panel" style={{ minHeight: 260 }}>
          <h4>Approval Status Breakdown</h4>
          <ChartErrorBoundary>
            {loading ? <Loading /> : <StatusPieChart data={data.status} />}
          </ChartErrorBoundary>
        </div>
        <div className="analytics-panel" style={{ minHeight: 260 }}>
          <h4>Eligibility Score Distribution</h4>
          <ChartErrorBoundary>
            {loading ? <Loading /> : <EligibilityHistogram hist={data.histogram} />}
          </ChartErrorBoundary>
        </div>
        <div className="analytics-panel" style={{ minHeight: 260 }}>
          <h4>Income Group Analysis</h4>
          <ChartErrorBoundary>
            {loading ? <Loading /> : <IncomeGroupsBarChart groups={data.income} />}
          </ChartErrorBoundary>
        </div>
        <div className="analytics-panel" style={{ minHeight: 260 }}>
          <h4>Blockchain Activity</h4>
          <ChartErrorBoundary>
            {loading ? <Loading /> : <BlockchainActivityAreaChart chain={data.blockchain} />}
          </ChartErrorBoundary>
        </div>
        <div className="analytics-panel" style={{ minHeight: 260 }}>
          <h4>Top Performing Districts</h4>
          <ChartErrorBoundary>
            {loading ? <Loading /> : <TopDistrictsLeaderboard chain={data.blockchain} />}
          </ChartErrorBoundary>
        </div>
        <div className="analytics-panel" style={{ minHeight: 260 }}>
          <h4>Admin Actions Log</h4>
          <ChartErrorBoundary>
            {loading ? <Loading /> : <AdminActionsBarChart actions={data.adminActions} />}
          </ChartErrorBoundary>
        </div>
      </div>
    </div>
  );
}