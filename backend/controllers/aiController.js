import axios from 'axios';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Explain DSA Concept
export const explainConcept = async (req, res) => {
  try {
    const { concept, code } = req.body;

    if (!concept) {
      return res.status(400).json({ message: 'Concept is required' });
    }

    const prompt = `You are an expert DSA (Data Structures & Algorithms) tutor. 
Explain the following concept in a clear, concise, and beginner-friendly way.
Include examples, use cases, and key points.

Concept: ${concept}
${code ? `Code example:\n${code}` : ''}

Provide a detailed explanation with:
1. Definition
2. Key characteristics
3. Time and space complexity (if applicable)
4. Real-world use cases
5. Example code
6. Common pitfalls`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const explanation =
      response.data.candidates[0].content.parts[0].text;

    res.status(200).json({
      concept,
      explanation,
    });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    res.status(500).json({
      message: 'Failed to generate explanation',
      error: error.message,
    });
  }
};

// Get Problem Recommendations
export const getRecommendations = async (req, res) => {
  try {
    const { solvedTopics, weakTopics } = req.body;

    if (!weakTopics || weakTopics.length === 0) {
      return res
        .status(400)
        .json({ message: 'Please specify weak topics' });
    }

    const prompt = `You are an expert DSA mentor. Based on the user's learning profile, 
recommend problems they should practice.

Solved Topics: ${solvedTopics?.join(', ') || 'None'}
Weak Topics (needs improvement): ${weakTopics.join(', ')}

Provide 5 problem recommendations in JSON format:
[
  {
    "title": "Problem Title",
    "topic": "Topic Name",
    "difficulty": "Easy/Medium/Hard",
    "reason": "Why this problem is recommended",
    "platform": "LeetCode/Codeforces/HackerRank/CodeChef/GFG"
  }
]

Ensure recommendations focus on weak topics and progressively increase in difficulty.
Return ONLY the JSON array, no additional text.`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const responseText =
      response.data.candidates[0].content.parts[0].text;

    // Parse JSON from response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    let recommendations = [];

    if (jsonMatch) {
      recommendations = JSON.parse(jsonMatch[0]);
    }

    res.status(200).json({
      recommendations,
    });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    res.status(500).json({
      message: 'Failed to generate recommendations',
      error: error.message,
    });
  }
};
