# DSA Mentor AI - Complete Full-Stack Application

> An AI-powered Data Structures & Algorithms learning assistant that helps users track, practice, and master DSA concepts.

##  Features

### Dashboard
-  Real-time statistics (total solved, by difficulty)
-  Progress tracking and streak counter
-  Recent problems overview
-  Quick add problem button

### Problems Management
-  Full CRUD operations for problems
-  Advanced filtering (difficulty, topic, status, platform)
-  Color-coded difficulty and status badges
-  Responsive table/list view
-  Persistent storage with MongoDB

### Analytics Dashboard
-  Pie chart - Problems by difficulty
-  Bar chart - Problems by topic
-  Activity timeline (last 30 days)
-  Statistics cards with percentages

### AI Mentor
-  **Explain Concept** - Get detailed explanations for DSA topics with examples
-  **Get Recommendations** - Personalized problem recommendations based on your weak topics
-  Integration with Google Gemini API for intelligent responses

### Authentication
-  JWT-based authentication (7-day expiry)
-  Secure password hashing (bcryptjs)
-  User-specific data isolation
-  Protected routes and auto-redirect

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with dark theme
- **State Management**: React Context API
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Routing**: React Router v6

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **AI Integration**: Google Gemini API
- **Middleware**: CORS, Express JSON

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm 8+
- MongoDB Atlas account
- Google Gemini API key
- Git

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dsa_mentor_ai
JWT_SECRET=your_32_character_secret_key_here
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
```

Start development server:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start development server:
```bash
npm run dev
```

##  API Documentation

### Authentication Endpoints

**POST /api/auth/register**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}
```

**POST /api/auth/login**
```json
{
  "email": "john@example.com",
  "password": "secure123"
}
```

**GET /api/auth/me** (Protected)

### Problem Endpoints (All Protected)

**GET /api/problems** - Get all user problems

**POST /api/problems** - Add new problem
```json
{
  "title": "Two Sum",
  "difficulty": "Easy",
  "topic": "Array",
  "platform": "LeetCode",
  "status": "Solved",
  "notes": "Used HashMap approach",
  "link": "https://leetcode.com/problems/two-sum"
}
```

**PUT /api/problems/:id** - Update problem

**DELETE /api/problems/:id** - Delete problem

**GET /api/problems/stats** - Get statistics

### AI Endpoints (All Protected)

**POST /api/ai/explain** - Get concept explanation
```json
{
  "concept": "Binary Search Tree",
  "code": "optional code snippet"
}
```

**POST /api/ai/recommend** - Get problem recommendations
```json
{
  "solvedTopics": ["Array", "String"],
  "weakTopics": ["Tree", "Graph"]
}
```

##  UI/UX Features

### Design System
- **Dark Theme**: Slate 950 background (#0f172a)
- **Primary Color**: Indigo (#6366f1)
- **Card Color**: Slate 800 (#1e293b)
- **Text**: White & Slate 300
- **Responsive**: Mobile-first approach

### Components
- Navbar with responsive menu
- Protected route wrapper
- Reusable problem card
- Modal forms for CRUD
- Toast notifications
- Loading states
- Chart visualizations

##  Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Problem Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  title: String,
  difficulty: String,
  topic: String,
  platform: String,
  status: String,
  notes: String,
  link: String,
  solvedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

##  Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect repo to Vercel
3. Set `VITE_API_URL` environment variable
4. Deploy (auto on push)

### Backend (Render)
1. Push to GitHub
2. Create new Web Service
3. Set environment variables
4. Deploy

## Security Features

-  Password hashing with bcryptjs (10 salt rounds)
-  JWT token validation
-  CORS protection
-  Input validation & sanitization
-  Environment variable protection
-  Protected API routes
-  User data isolation

##  Troubleshooting

### MongoDB Connection Issues
- Verify connection string format
- Add IP to MongoDB Atlas whitelist
- Check database user permissions

### Gemini API Errors
- Verify API key is correct
- Check API enablement
- Monitor quota usage

### CORS Errors
- Ensure CORS middleware in backend
- Verify frontend URL in CORS config
- Update for production domain

##  Future Enhancements

-  Problem difficulty suggestions
-  Code submission and execution
-  Discussion forum for problems
-  Video tutorials integration
-  Mobile app version
-  Social features (friends, leaderboard)
-  Interview prep mode
-  Custom study schedules

##  License

MIT License - feel free to use this project for your learning!

##  Contributing

Contributions welcome! Please feel free to submit a Pull Request.

##  Support

For issues and questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check browser console for errors
4. Monitor backend logs

