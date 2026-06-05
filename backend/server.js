import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import problemSetRoutes from './routes/problemSetRoutes.js';

// Auto-seeding imports
import ProblemSet from './models/ProblemSet.js';
import initialProblems from './data/problems.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Function to seed 54 standard DSA problems if the collection is empty
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

// Initialize database connection and start seeding process
const startServer = async () => {
  try {
    await connectDB(); // Establish MongoDB connection
    await seedDatabase(); // Trigger conditional data seeding
  } catch (err) {
    console.error('Database connection or seeding failed:', err);
  }
};
startServer();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/problemset', problemSetRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'DSA Mentor AI backend is running' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
