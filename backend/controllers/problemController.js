import Problem from '../models/Problem.js';

// Get all problems for logged-in user
export const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({ userId: req.user.id }).sort({
      solvedAt: -1,
    });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new problem
export const addProblem = async (req, res) => {
  try {
    const { title, difficulty, topic, platform, status, notes, link } =
      req.body;

    // Validation
    if (!title || !difficulty || !topic || !platform) {
      return res
        .status(400)
        .json({ message: 'Title, difficulty, topic, and platform are required' });
    }

    const problem = new Problem({
      userId: req.user.id,
      title,
      difficulty,
      topic,
      platform,
      status: status || 'Solved',
      notes,
      link,
      solvedAt: new Date(),
    });

    await problem.save();
    res.status(201).json({
      message: 'Problem added successfully',
      problem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update problem
export const updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, difficulty, topic, platform, status, notes, link } =
      req.body;

    const problem = await Problem.findById(id);

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Verify ownership
    if (problem.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update fields
    if (title) problem.title = title;
    if (difficulty) problem.difficulty = difficulty;
    if (topic) problem.topic = topic;
    if (platform) problem.platform = platform;
    if (status) problem.status = status;
    if (notes !== undefined) problem.notes = notes;
    if (link !== undefined) problem.link = link;

    await problem.save();
    res.status(200).json({
      message: 'Problem updated successfully',
      problem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete problem
export const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await Problem.findById(id);

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Verify ownership
    if (problem.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Problem.deleteOne({ _id: id });
    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get statistics
export const getStats = async (req, res) => {
  try {
    const problems = await Problem.find({ userId: req.user.id });

    const stats = {
      total: problems.length,
      solved: problems.filter((p) => p.status === 'Solved').length,
      attempted: problems.filter((p) => p.status === 'Attempted').length,
      revisit: problems.filter((p) => p.status === 'Revisit').length,
      byDifficulty: {
        Easy: problems.filter((p) => p.difficulty === 'Easy').length,
        Medium: problems.filter((p) => p.difficulty === 'Medium').length,
        Hard: problems.filter((p) => p.difficulty === 'Hard').length,
      },
      byTopic: {},
      recentActivity: [],
    };

    // Count by topic
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
      'Other',
    ];

    topics.forEach((topic) => {
      stats.byTopic[topic] = problems.filter(
        (p) => p.topic === topic
      ).length;
    });

    // Calculate recent activity (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentCount = problems.filter(
      (p) => new Date(p.solvedAt) >= sevenDaysAgo
    ).length;
    stats.recentActivity = [recentCount];

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
