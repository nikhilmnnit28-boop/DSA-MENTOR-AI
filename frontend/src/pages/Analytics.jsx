import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/problems/stats');
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-dark-300">Loading analytics...</div>
      </div>
    );
  }

  // Prepare data for charts
  const difficultyData = [
    { name: 'Easy', value: stats.byDifficulty.Easy, fill: '#22c55e' },
    { name: 'Medium', value: stats.byDifficulty.Medium, fill: '#eab308' },
    { name: 'Hard', value: stats.byDifficulty.Hard, fill: '#ef4444' },
  ].filter((item) => item.value > 0);

  const topicData = Object.entries(stats.byTopic)
    .filter(([, count]) => count > 0)
    .map(([topic, count]) => ({
      topic,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  // Activity data (simplified - last 7 days)
  const activityData = stats.recentActivity.length > 0
    ? [
        { day: 'This Week', problems: stats.recentActivity[0] },
      ]
    : [];

  const solvedPercentage = Math.round(
    ((stats.solved / stats.total) * 100) || 0
  );

  return (
    <div className="min-h-screen bg-dark-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-indigo-500" />
            Analytics
          </h1>
          <p className="text-dark-400 mt-2">Track your DSA learning progress</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
            <p className="text-dark-400 text-sm">Total Problems</p>
            <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
          </div>

          <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
            <p className="text-dark-400 text-sm">Problems Solved</p>
            <div className="mt-2">
              <p className="text-3xl font-bold text-green-400">{stats.solved}</p>
              <p className="text-dark-400 text-xs mt-1">{solvedPercentage}% complete</p>
            </div>
          </div>

          <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
            <p className="text-dark-400 text-sm">Attempted</p>
            <p className="text-3xl font-bold text-blue-400 mt-2">{stats.attempted}</p>
          </div>

          <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
            <p className="text-dark-400 text-sm">Need Revisit</p>
            <p className="text-3xl font-bold text-orange-400 mt-2">{stats.revisit}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Difficulty Distribution */}
          <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">By Difficulty</h2>
            {difficultyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-dark-400 py-8 text-center">No data yet</p>
            )}
          </div>

          {/* Activity Chart */}
          <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
            {activityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                    }}
                  />
                  <Bar dataKey="problems" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-dark-400 py-8 text-center">No activity yet</p>
            )}
          </div>
        </div>

        {/* Topic Distribution */}
        {topicData.length > 0 && (
          <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">Problems by Topic</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={topicData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="topic" type="category" stroke="#64748b" width={140} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                  }}
                />
                <Bar dataKey="count" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
