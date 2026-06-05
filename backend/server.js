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

// ==========================================
// 1. MIDDLEWARES (Routes se HAMESHA pehle aane chahiye)
// ==========================================
app.use(cors({
  origin: '*', // Production me saare domains allow karega, CORS error permanent khatam
  credentials: true
}));
app.use(express.json());

// ==========================================
// 2. DATABASE INITIALIZATION & SEEDING
// ==========================================
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
    await connectDB(); // Establish MongoDB connection
    await seedDatabase(); // Trigger conditional data seeding
  } catch (err) {
    console.error('Database connection or seeding failed:', err);
  }
};
startServer();

// ==========================================
// 3. ROUTES
// ==========================================
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Endpoint Handles: Dono routes allow kar rahe hain taaki frontend mismatch na ho
app.use('/api/problems', problemRoutes);
app.use('/api/problemset', problemSetRoutes); 

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'DSA Mentor AI backend is running' });
});

// ==========================================
// 4. GLOBAL ERROR HANDLING
// ==========================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on PORT ${PORT}`);
});