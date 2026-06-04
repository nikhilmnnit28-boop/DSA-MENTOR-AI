import ProblemSet from '../models/ProblemSet.js';

// Get all problems with optional filters
const getProblems = async (req, res) => {
  try {
    const { difficulty, topic, search } = req.query;

    let filter = {};

    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const problems = await ProblemSet.find(filter).sort({ topic: 1, difficulty: 1 });

    res.json({
      success: true,
      count: problems.length,
      data: problems
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single problem by ID
const getProblemById = async (req, res) => {
  try {
    const problem = await ProblemSet.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    res.json({
      success: true,
      data: problem
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export { getProblems, getProblemById };