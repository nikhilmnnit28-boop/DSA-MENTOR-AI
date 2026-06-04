import mongoose from 'mongoose';

const problemSetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  topic: {
    type: String,
    enum: ['Array', 'String', 'LinkedList', 'Tree', 'Graph',
      'DP', 'Stack', 'Queue', 'Heap', 'Backtracking',
      'Greedy', 'BinarySearch', 'Trie', 'Other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  leetcodeUrl: {
    type: String,
    default: ''
  },
  gfgUrl: {
    type: String,
    default: ''
  },
  tags: [String]
});

export default mongoose.model('ProblemSet', problemSetSchema);