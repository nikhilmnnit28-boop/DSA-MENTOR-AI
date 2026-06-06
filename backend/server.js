import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import problemSetRoutes from './routes/problemSetRoutes.js';
import ProblemSet from './models/ProblemSet.js';
import initialProblems from './data/problems.js'; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'https://dsa-mentor-ai-f062.onrender.com',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

const seedDatabase = async () => {
  try {
    const count = await ProblemSet.countDocuments();
    if (count === 0) {
      console.log('Database is empty! Seeding 54 standard DSA problems...');
      await ProblemSet.insertMany(initialProblems);
      console.log('✅ Database successfully seeded! 54 problems added.');
    } else {
      console.log(`Database already contains ${count} problems.`);
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();
  } catch (err) {
    console.error('Database connection or seeding failed:', err);
  }
};
startServer();

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/problemset', problemSetRoutes); 

app.get('/api/health', (req, res) => {
  res.json({ message: 'DSA Mentor AI backend is running' });
});

// ✅ SEED ENDPOINT - Problems manually seed karne ke liye
app.get('/api/seed', async (req, res) => {
  try {
    await ProblemSet.deleteMany({});
    await ProblemSet.insertMany(initialProblems);
    res.json({ message: `✅ ${initialProblems.length} problems seeded!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on PORT ${PORT}`);
});
