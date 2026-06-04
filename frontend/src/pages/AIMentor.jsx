import { useState } from 'react';
import toast from 'react-hot-toast';
import { explainConcept, getRecommendations } from '../services/gemini';
import { Zap, Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const AIMentor = () => {
  const [activeTab, setActiveTab] = useState('explain');
  const [loading, setLoading] = useState(false);

  // Explain State
  const [concept, setConcept] = useState('');
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');

  // Recommend State
  const [solvedTopics, setSolvedTopics] = useState([]);
  const [weakTopics, setWeakTopics] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const topics = [
    'Array',
    'String',
    'LinkedList',
    'Tree',
    'Graph',
    'DP',
    'Stack',
    'Queue',
    'Heap',
    'Backtracking',
    'Greedy',
    'BinarySearch',
    'Trie',
  ];

  const handleExplain = async (e) => {
    e.preventDefault();
    if (!concept.trim()) {
      toast.error('Please enter a concept');
      return;
    }

    setLoading(true);
    try {
      const result = await explainConcept(concept, code);
      setExplanation(result.explanation);
      toast.success('Explanation generated!');
    } catch (error) {
      toast.error('Failed to generate explanation');
    } finally {
      setLoading(false);
    }
  };

  const handleRecommend = async (e) => {
    e.preventDefault();
    if (weakTopics.length === 0) {
      toast.error('Please select at least one weak topic');
      return;
    }

    setLoading(true);
    try {
      const result = await getRecommendations(solvedTopics, weakTopics);
      setRecommendations(result.recommendations || []);
      toast.success('Recommendations generated!');
    } catch (error) {
      toast.error('Failed to generate recommendations');
    } finally {
      setLoading(false);
    }
  };

  const toggleTopic = (topic, type) => {
    if (type === 'solved') {
      setSolvedTopics((prev) =>
        prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
      );
    } else {
      setWeakTopics((prev) =>
        prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
      );
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Zap className="w-8 h-8 text-indigo-500" />
            AI Mentor
          </h1>
          <p className="text-dark-400 mt-2">Get explanations and personalized recommendations</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('explain')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'explain'
                ? 'bg-indigo-600 text-white'
                : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
            }`}
          >
            Explain Concept
          </button>
          <button
            onClick={() => setActiveTab('recommend')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'recommend'
                ? 'bg-indigo-600 text-white'
                : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
            }`}
          >
            Get Recommendations
          </button>
        </div>

        {/* Explain Tab */}
        {activeTab === 'explain' && (
          <div className="space-y-6">
            <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Explain a DSA Concept</h2>

              <form onSubmit={handleExplain} className="space-y-4">
                <div>
                  <label className="block text-dark-300 text-sm font-medium mb-2">
                    Concept*
                  </label>
                  <input
                    type="text"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    placeholder="e.g., Binary Search Tree, Dynamic Programming"
                    className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-dark-300 text-sm font-medium mb-2">
                    Code Example (Optional)
                  </label>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Paste your code here..."
                    className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-indigo-500 resize-none"
                    rows="6"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-dark-600 text-white font-medium rounded-lg transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Get Explanation'
                  )}
                </button>
              </form>
            </div>

            {explanation && (
              <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">Explanation</h3>
                <div className="text-dark-300 prose prose-invert max-w-none">
                  <ReactMarkdown>{explanation}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recommend Tab */}
        {activeTab === 'recommend' && (
          <div className="space-y-6">
            <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-6">Personalized Recommendations</h2>

              <form onSubmit={handleRecommend} className="space-y-6">
                {/* Solved Topics */}
                <div>
                  <label className="block text-dark-300 text-sm font-medium mb-3">
                    Topics You're Strong At
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {topics.map((topic) => (
                      <button
                        key={`solved-${topic}`}
                        type="button"
                        onClick={() => toggleTopic(topic, 'solved')}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                          solvedTopics.includes(topic)
                            ? 'bg-green-600 text-white'
                            : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weak Topics */}
                <div>
                  <label className="block text-dark-300 text-sm font-medium mb-3">
                    Topics You Want to Improve*
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {topics.map((topic) => (
                      <button
                        key={`weak-${topic}`}
                        type="button"
                        onClick={() => toggleTopic(topic, 'weak')}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                          weakTopics.includes(topic)
                            ? 'bg-red-600 text-white'
                            : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-dark-600 text-white font-medium rounded-lg transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Get Recommendations'
                  )}
                </button>
              </form>
            </div>

            {recommendations.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Recommended Problems</h3>
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-dark-800 border border-dark-700 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-2">{rec.title}</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-indigo-900 text-indigo-300 rounded text-xs">
                        {rec.topic}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        rec.difficulty === 'Easy'
                          ? 'bg-green-900 text-green-300'
                          : rec.difficulty === 'Medium'
                          ? 'bg-yellow-900 text-yellow-300'
                          : 'bg-red-900 text-red-300'
                      }`}>
                        {rec.difficulty}
                      </span>
                      <span className="px-2 py-1 bg-dark-700 text-dark-300 rounded text-xs">
                        {rec.platform}
                      </span>
                    </div>
                    <p className="text-dark-400 text-sm">{rec.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIMentor;
