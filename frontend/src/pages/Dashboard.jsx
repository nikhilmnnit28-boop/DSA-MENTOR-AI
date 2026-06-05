import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import {
  TrendingUp,
  Trophy,
  Flame,
  Plus,
} from 'lucide-react';
import ProblemCard from '../components/ProblemCard';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Initialize navigate
  const [stats, setStats] = useState(null);
  const [recentProblems, setRecentProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, problemsRes] = await Promise.all([
        api.get('/problems/stats'),
        api.get('/problems'),
      ]);

      setStats(statsRes.data);
      setRecentProblems(problemsRes.data.slice(0, 5));
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to handle card clicks
  const handleCardClick = (difficulty = '') => {
    if (difficulty) {
      // Redirect to problems page with difficulty filter
      navigate(`/problems?difficulty=${difficulty}`);
    } else {
      // Redirect to all problems
      navigate('/problems');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-dark-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome, {user?.name}! 👋
          </h1>
          <p className="text-dark-400">Track your DSA learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Solved Button */}
          <div 
            onClick={() => handleCardClick()}
            className="bg-dark-800 border border-dark-700 hover:border-indigo-500 rounded-lg p-6 cursor-pointer transition transform hover:-translate-y-1 active:scale-95"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm">Total Solved</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {stats?.solved || 0}
                </p>
              </div>
              <Trophy className="w-10 h-10 text-yellow-500 opacity-20" />
            </div>
          </div>

          {/* Easy Button */}
          <div 
            onClick={() => handleCardClick('Easy')}
            className="bg-dark-800 border border-dark-700 hover:border-green-500 rounded-lg p-6 cursor-pointer transition transform hover:-translate-y-1 active:scale-95"
          >
            <div>
              <p className="text-dark-400 text-sm">Easy</p>
              <p className="text-3xl font-bold text-green-400 mt-2">
                {stats?.byDifficulty?.Easy || 0}
              </p>
            </div>
          </div>

          {/* Medium Button */}
          <div 
            onClick={() => handleCardClick('Medium')}
            className="bg-dark-800 border border-dark-700 hover:border-yellow-500 rounded-lg p-6 cursor-pointer transition transform hover:-translate-y-1 active:scale-95"
          >
            <div>
              <p className="text-dark-400 text-sm">Medium</p>
              <p className="text-3xl font-bold text-yellow-400 mt-2">
                {stats?.byDifficulty?.Medium || 0}
              </p>
            </div>
          </div>

          {/* Hard Button */}
          <div 
            onClick={() => handleCardClick('Hard')}
            className="bg-dark-800 border border-dark-700 hover:border-red-500 rounded-lg p-6 cursor-pointer transition transform hover:-translate-y-1 active:scale-95"
          >
            <div>
              <p className="text-dark-400 text-sm">Hard</p>
              <p className="text-3xl font-bold text-red-400 mt-2">
                {stats?.byDifficulty?.Hard || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div 
            onClick={() => handleCardClick()}
            className="bg-dark-800 border border-dark-700 hover:border-indigo-500 rounded-lg p-6 cursor-pointer transition transform hover:-translate-y-1 active:scale-95"
          >
            <p className="text-dark-400 text-sm">Total Problems</p>
            <p className="text-3xl font-bold text-white mt-2">
              {stats?.total || 0}
            </p>
          </div>

          <div 
            onClick={() => handleCardClick()}
            className="bg-dark-800 border border-dark-700 hover:border-blue-500 rounded-lg p-6 cursor-pointer transition transform hover:-translate-y-1 active:scale-95"
          >
            <p className="text-dark-400 text-sm">Attempted</p>
            <p className="text-3xl font-bold text-blue-400 mt-2">
              {stats?.attempted || 0}
            </p>
          </div>

          <div 
            onClick={() => handleCardClick()}
            className="bg-dark-800 border border-dark-700 hover:border-orange-500 rounded-lg p-6 cursor-pointer transition transform hover:-translate-y-1 active:scale-95"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm">Revisit</p>
                <p className="text-3xl font-bold text-orange-400 mt-2">
                  {stats?.revisit || 0}
                </p>
              </div>
              <Flame className="w-10 h-10 text-orange-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Recent Problems */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-indigo-500" />
              Recent Problems
            </h2>
            <button
              onClick={() => navigate('/problems')} // Fixed to use React Router navigation instead of hard reload
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
              Add Problem
            </button>
          </div>

          {recentProblems.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {recentProblems.map((problem) => (
                <ProblemCard key={problem._id} problem={problem} />
              ))}
            </div>
          ) : (
            <div className="bg-dark-800 border border-dark-700 rounded-lg p-12 text-center">
              <p className="text-dark-400">No problems yet. Start adding your solved problems!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;