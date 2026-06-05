import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // URL se filter read karne ke liye
import toast from 'react-hot-toast';
import api from '../services/api'; // Hamara core configured api link config

const Problems = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // URL parameters se initial state uthayenge taaki dashboard click kaam kare
  const difficulty = searchParams.get('difficulty') || '';
  const topic = searchParams.get('topic') || '';

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (difficulty) params.difficulty = difficulty;
      if (topic) params.topic = topic;

      // Sahi routes aur pre-configured api instance ka use
      const res = await api.get('/problems', { params });
      
      // Backend structured response array format ko set karein
      if (Array.isArray(res.data)) {
        setProblems(res.data);
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        setProblems(res.data.data);
      } else {
        setProblems([]);
      }
    } catch (error) {
      console.error('Error fetching problems:', error);
      toast.error('Failed to fetch problems from server');
    } finally {
      setLoading(false);
    }
  };

  // Jab bhi difficulty, topic badlega URL update hoga aur data refetch hoga
  useEffect(() => {
    fetchProblems();
  }, [difficulty, topic]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProblems();
  };

  const handleDifficultyChange = (val) => {
    const newParams = new URLSearchParams(searchParams);
    if (val) newParams.set('difficulty', val);
    else newParams.delete('difficulty');
    setSearchParams(newParams);
  };

  const handleTopicChange = (val) => {
    const newParams = new URLSearchParams(searchParams);
    if (val) newParams.set('topic', val);
    else newParams.delete('topic');
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearch('');
    setSearchParams({});
  };

  const difficultyColor = (diff) => {
    if (diff === 'Easy') return 'bg-green-500';
    if (diff === 'Medium') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const topics = ['Array', 'String', 'LinkedList', 'Tree', 'Graph',
    'DP', 'Stack', 'Queue', 'Heap', 'Backtracking',
    'Greedy', 'BinarySearch', 'Trie'];

  return (
    <div className="min-h-screen bg-dark-900 text-white p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">DSA Problems</h1>
          <p className="text-dark-400">Browse and practice {problems.length} curated problems</p>
        </div>

        {/* Filters */}
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-4 mb-6 flex flex-wrap gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-64">
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-dark-900 border border-dark-700 text-white px-4 py-2 rounded-lg outline-none focus:border-indigo-500"
            />
            <button type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition">
              Search
            </button>
          </form>

          {/* Difficulty Filter */}
          <select
            value={difficulty}
            onChange={(e) => handleDifficultyChange(e.target.value)}
            className="bg-dark-900 border border-dark-700 text-white px-4 py-2 rounded-lg outline-none focus:border-indigo-500">
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Topic Filter */}
          <select
            value={topic}
            onChange={(e) => handleTopicChange(e.target.value)}
            className="bg-dark-900 border border-dark-700 text-white px-4 py-2 rounded-lg outline-none focus:border-indigo-500">
            <option value="">All Topics</option>
            {topics.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Clear Filters */}
          {(difficulty || topic || search) && (
            <button
              onClick={clearFilters}
              className="bg-dark-700 hover:bg-dark-600 border border-dark-600 px-4 py-2 rounded-lg transition">
              Clear
            </button>
          )}
        </div>

        {/* Problems Grid */}
        {loading ? (
          <div className="text-center py-20 text-dark-400">Loading problems...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((problem) => (
              <div key={problem._id}
                className="bg-dark-800 rounded-xl p-5 hover:border-indigo-500 transition-all border border-dark-700">

                {/* Title */}
                <h3 className="text-white font-semibold text-lg mb-3">{problem.title}</h3>

                {/* Description */}
                <p className="text-dark-400 text-sm mb-4 line-clamp-2">{problem.description}</p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`${difficultyColor(problem.difficulty)} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                    {problem.difficulty}
                  </span>
                  <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                    {problem.topic}
                  </span>
                </div>

                {/* Links */}
                <div className="flex gap-2">
                  {problem.leetcodeUrl && (
                    <a href={problem.leetcodeUrl} target="_blank" rel="noreferrer"
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 px-3 rounded-lg text-center font-medium transition-all">
                      LeetCode
                    </a>
                  )}
                  {problem.gfgUrl && (
                    <a href={problem.gfgUrl} target="_blank" rel="noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-3 rounded-lg text-center font-medium transition-all">
                      GFG
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && problems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-dark-400 text-xl">No problems found</p>
            <button onClick={clearFilters}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg transition">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problems;