import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/api';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Clock, Activity } from 'lucide-react';
import AnalyticsChart from '../components/AnalyticsChart';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to load stats", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading Dashboard...</div>;
  if (!stats) return <div className="p-10 text-center text-red-500">Error loading data. Is Backend running?</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center gap-4">
        <Link to="/" className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
          <ArrowLeft size={24} className="text-gray-700" />
        </Link>
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
            <p className="text-gray-500">Real-time overview of your voice bot performance.</p>
        </div>
      </div>

      {/* 1. Stats Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={<MessageSquare className="text-blue-600" size={24} />} 
          label="Total Conversations" 
          value={stats.totalQueries} 
          color="bg-blue-50"
        />
        <StatCard 
          icon={<Clock className="text-orange-600" size={24} />} 
          label="Avg Response Time" 
          value={`${stats.avgLatency}ms`} 
          color="bg-orange-50"
        />
        <StatCard 
          icon={<Activity className="text-green-600" size={24} />} 
          label="System Status" 
          value="Online" 
          color="bg-green-50"
        />
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 2. Chart Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Latency Performance</h2>
            <div className="h-64">
                <AnalyticsChart data={stats.recentLogs || []} />
            </div>
        </div>

        {/* 3. History Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent History</h2>
            <div className="overflow-y-auto h-64 pr-2">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="text-xs font-semibold text-gray-400 uppercase py-2">Time</th>
                            <th className="text-xs font-semibold text-gray-400 uppercase py-2">User Said</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {stats.recentLogs.map((log) => (
                            <tr key={log._id} className="hover:bg-gray-50">
                                <td className="py-3 text-sm text-gray-500 whitespace-nowrap">
                                    {new Date(log.timestamp).toLocaleTimeString()}
                                </td>
                                <td className="py-3 text-sm text-gray-800 font-medium truncate max-w-[200px]" title={log.userQuery}>
                                    "{log.userQuery}"
                                </td>
                            </tr>
                        ))}
                        {stats.recentLogs.length === 0 && (
                            <tr>
                                <td colSpan="2" className="py-4 text-center text-sm text-gray-400">No history yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

      </div>
    </div>
  );
};

// Helper Component for Cards
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default Dashboard;