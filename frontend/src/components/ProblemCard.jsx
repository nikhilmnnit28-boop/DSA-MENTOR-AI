import { FileText, ExternalLink, Edit2, Trash2 } from 'lucide-react';

const ProblemCard = ({ problem, onEdit, onDelete }) => {
  const difficultyColor = {
    Easy: 'bg-green-900 text-green-300',
    Medium: 'bg-yellow-900 text-yellow-300',
    Hard: 'bg-red-900 text-red-300',
  };

  const statusColor = {
    Solved: 'bg-green-900 text-green-300',
    Attempted: 'bg-yellow-900 text-yellow-300',
    Revisit: 'bg-orange-900 text-orange-300',
  };

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-lg p-6 hover:border-dark-600 transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            {problem.title}
          </h3>
          <p className="text-dark-400 mt-1">{problem.topic}</p>
        </div>
        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(problem)}
              className="p-2 hover:bg-dark-700 rounded transition"
              title="Edit"
            >
              <Edit2 className="w-4 h-4 text-blue-400" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(problem._id)}
              className="p-2 hover:bg-dark-700 rounded transition"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[problem.status]}`}>
          {problem.status}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-dark-700 text-dark-300">
          {problem.platform}
        </span>
      </div>

      {problem.notes && (
        <p className="text-dark-300 text-sm mb-3 line-clamp-2">
          {problem.notes}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-dark-400">
        <span>
          {new Date(problem.solvedAt).toLocaleDateString()}
        </span>
        {problem.link && (
          <a
            href={problem.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            View <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProblemCard;
