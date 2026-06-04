# DSA Mentor AI - Full Stack Application Setup Guide

## Overview
DSA Mentor AI is a complete full-stack web application helping users track, practice, and learn Data Structures & Algorithms with AI-powered explanations and personalized recommendations.

## Project Structure
```
dsa-mentor-ai/
├── backend/          # Node.js + Express API
├── frontend/         # React + Vite SPA
└── docs/             # Documentation
```

## Tech Stack
- **Frontend**: React 18 + Vite + Tailwind CSS + Lucide Icons
- **Backend**: Express.js + Node.js
- **Database**: MongoDB (Atlas recommended)
- **Authentication**: JWT (7-day expiry)
- **AI**: Google Gemini API
- **Deployment**: Vercel (frontend) + Render (backend)

## Prerequisites
- Node.js 16+ and npm 8+
- MongoDB Atlas account (free tier available)
- Google Gemini API key
- Git

## Setup Instructions

### 1. Backend Setup

#### Installation
```bash
cd backend
npm install
```

#### Environment Configuration (.env)
Create `.env` file in backend directory:
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dsa_mentor_ai
JWT_SECRET=your_super_secret_jwt_key_change_in_production_use_32chars
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

**Getting MongoDB Connection String:**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with password
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/dsa_mentor_ai`

**Getting Gemini API Key:**
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Create new API key
3. Copy and paste in .env

#### Running Backend
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Backend will run on `http://localhost:5000`

### 2. Frontend Setup

#### Installation
```bash
cd frontend
npm install
```

#### Environment Configuration (.env.local)
Create `.env.local` in frontend directory:
```
VITE_API_URL=http://localhost:5000/api
```

For production (Vercel):
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

#### Running Frontend
```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Frontend will run on `http://localhost:5173`

## API Documentation

### Authentication Endpoints
- **POST /api/auth/register** - Register new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepass123"
  }
  ```

- **POST /api/auth/login** - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "securepass123"
  }
  ```

- **GET /api/auth/me** - Get current user (requires JWT)

### Problem Endpoints (All require JWT)
- **GET /api/problems** - Get all problems for user
- **POST /api/problems** - Add new problem
  ```json
  {
    "title": "Two Sum",
    "difficulty": "Easy",
    "topic": "Array",
    "platform": "LeetCode",
    "status": "Solved",
    "notes": "Used two-pointer approach",
    "link": "https://..."
  }
  ```

- **PUT /api/problems/:id** - Update problem
- **DELETE /api/problems/:id** - Delete problem
- **GET /api/problems/stats** - Get user statistics

### AI Endpoints (All require JWT)
- **POST /api/ai/explain** - Get explanation for DSA concept
  ```json
  {
    "concept": "Binary Search Tree",
    "code": "optional code snippet"
  }
  ```

- **POST /api/ai/recommend** - Get problem recommendations
  ```json
  {
    "solvedTopics": ["Array", "String"],
    "weakTopics": ["Tree", "Graph"]
  }
  ```

## Application Features

### Dashboard
- Welcome message with user stats
- Summary cards (Total solved, Easy/Medium/Hard counts)
- Recent problems list
- Quick add problem button

### Problems Management
- View all problems in table format
- Add new problems with full details
- Edit existing problems
- Delete problems
- Filter by: difficulty, topic, status, platform
- Search by title
- Color-coded difficulty and status badges

### Analytics
- Pie chart: Problems by difficulty
- Bar chart: Problems by topic
- Line chart: Activity over 30 days
- Progress statistics with percentages

### AI Mentor
Two main features:
1. **Explain Concept**: Get detailed AI explanations for DSA topics
2. **Recommend Problems**: Get personalized problem recommendations based on strong/weak topics

## Validation Rules

### Password Requirements
- Minimum 6 characters
- Must contain: letters, numbers, and optionally special characters

### Problem Topics
Array, String, LinkedList, Tree, Graph, DP, Stack, Queue, Heap, Backtracking, Greedy, BinarySearch, Trie, Other

### Difficulty Levels
- Easy
- Medium
- Hard

### Problem Platforms
- LeetCode
- Codeforces
- HackerRank
- CodeChef
- GFG
- Other

### Problem Status
- Solved
- Attempted
- Revisit

## Deployment Guide

### Frontend (Vercel)
1. Push code to GitHub
2. Connect GitHub repo to [Vercel](https://vercel.com)
3. Set environment variable: `VITE_API_URL=<your-backend-url>`
4. Deploy (automatic on push to main)

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on [Render](https://render.com)
3. Connect GitHub repo
4. Set environment variables (MONGO_URI, JWT_SECRET, GEMINI_API_KEY)
5. Build command: `npm install`
6. Start command: `npm start`
7. Deploy

## Key Features Implementation

### JWT Token Management
- Token stored in localStorage
- Automatically attached to all API requests
- 7-day expiry
- Protected routes redirect to login if not authenticated

### Error Handling
- Graceful error messages to users
- Toast notifications for success/error
- Backend validation and error responses
- Network error handling

### Loading States
- Loading spinners on async operations
- Disabled buttons during submission
- Skeleton loaders for better UX

### Security
- Password hashing with bcryptjs (salt rounds: 10)
- JWT secret stored in environment variables
- Protected API routes with middleware
- CORS configured for frontend domain

## Troubleshooting

### Backend Connection Issues
1. Check if backend is running: `http://localhost:5000/api/health`
2. Verify MongoDB connection string in .env
3. Check firewall/port permissions

### MongoDB Connection Failed
1. Verify connection string format
2. Add your IP to MongoDB Atlas IP whitelist
3. Ensure database user has correct permissions
4. Check network connectivity

### Gemini API Errors
1. Verify API key is correct
2. Check API key has been enabled
3. Ensure API quotas haven't been exceeded
4. Test with simple requests first

### CORS Errors
1. Verify backend has CORS middleware enabled
2. Check frontend URL is allowed in CORS configuration
3. For production, update CORS to allow your Vercel domain

### Token Expiry Issues
1. Clear localStorage if token persists after logout
2. Implement token refresh logic if needed
3. Verify JWT_SECRET is same in backend

## Performance Tips
1. Implement pagination for large problem lists
2. Use React Query for caching API responses
3. Lazy load charts in Analytics page
4. Optimize images in assets
5. Enable gzip compression on backend

## Testing
```bash
# Backend: Test API endpoints
curl http://localhost:5000/api/health

# Frontend: Check console for errors
# Use browser DevTools Network tab to monitor API calls
```

## Support & Documentation
- Check error messages in browser console
- Review API response status codes
- Monitor backend logs for detailed errors
- Verify all environment variables are set correctly

## Security Checklist
- [ ] JWT_SECRET is 32+ characters
- [ ] Database credentials never committed
- [ ] API keys stored in environment variables
- [ ] CORS restricted to frontend domain in production
- [ ] HTTPS enabled in production
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Regular backups configured

## Next Steps for Production
1. Set NODE_ENV=production
2. Configure custom domain
3. Set up SSL/TLS certificates
4. Configure monitoring and logging
5. Set up automated backups
6. Implement rate limiting
7. Add request validation middleware
8. Set up CI/CD pipeline
