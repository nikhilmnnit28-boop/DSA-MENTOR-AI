import { useState, useEffect } from 'react';
import axios from 'axios';

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [topic, setTopic] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (difficulty) params.difficulty = difficulty;
      if (topic) params.topic = topic;

      const res = await axios.get(`${API_URL}/api/problemset`, { params });
      setProblems(res.data.data);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [difficulty, topic]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProblems();
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
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">DSA Problems</h1>
          <p className="text-slate-400">Browse and practice {problems.length} curated problems</p>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 rounded-xl p-4 mb-6 flex flex-wrap gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-64">
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg outline-none"
            />
            <button type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg">
              Search
            </button>
          </form>

          {/* Difficulty Filter */}
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg outline-none">
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Topic Filter */}
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg outline-none">
            <option value="">All Topics</option>
            {topics.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Clear Filters */}
          {(difficulty || topic || search) && (
            <button
              onClick={() => { setDifficulty(''); setTopic(''); setSearch(''); }}
              className="bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-lg">
              Clear
            </button>
          )}
        </div>

        {/* Problems Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading problems...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((problem) => (
              <div key={problem._id}
                className="bg-slate-800 rounded-xl p-5 hover:bg-slate-700 transition-all border border-slate-700">

                {/* Title */}
                <h3 className="text-white font-semibold text-lg mb-3">{problem.title}</h3>

                {/* Description */}
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{problem.description}</p>

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
            <p className="text-slate-400 text-xl">No problems found</p>
            <button onClick={() => { setDifficulty(''); setTopic(''); setSearch(''); }}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problems;