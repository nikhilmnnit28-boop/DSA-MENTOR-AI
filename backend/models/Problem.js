import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user ID'],
    },
    title: {
      type: String,
      required: [true, 'Please provide a problem title'],
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: [true, 'Please specify difficulty level'],
    },
    topic: {
      type: String,
      enum: [
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
        'Other',
      ],
      required: [true, 'Please specify a topic'],
    },
    platform: {
      type: String,
      enum: ['LeetCode', 'Codeforces', 'HackerRank', 'CodeChef', 'GFG', 'Other'],
      required: [true, 'Please specify a platform'],
    },
    status: {
      type: String,
      enum: ['Solved', 'Attempted', 'Revisit'],
      default: 'Solved',
    },
    notes: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    solvedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Problem', problemSchema);
