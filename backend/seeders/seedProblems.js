import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

import ProblemSet from '../models/ProblemSet.js';
import problems from '../data/problems.js';

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    await ProblemSet.deleteMany({});
    console.log('Existing problems deleted...');

    await ProblemSet.insertMany(problems);
    console.log(`${problems.length} problems inserted successfully!`);

    process.exit(0);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();