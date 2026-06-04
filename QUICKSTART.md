# 🚀 Quick Start Guide - DSA Mentor AI

Get the application running in 5 minutes!

## Step 1: Clone & Setup

```bash
# Navigate to project
cd DSA-Mentor-AI

# Backend setup
cd backend
npm install
cp .env.example .env  # Edit with your credentials

# Frontend setup (new terminal)
cd frontend
npm install
```

## Step 2: Get Your Credentials

### MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Create database user
4. Copy connection string to `backend/.env` as `MONGO_URI`

### Google Gemini API
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Create new API key
3. Add to `backend/.env` as `GEMINI_API_KEY`

## Step 3: Environment Configuration

**backend/.env**
```env
PORT=5000
MONGO_URI=mongodb+srv://youruser:yourpass@cluster.mongodb.net/dsa_mentor_ai
JWT_SECRET=your_secret_key_at_least_32_chars_long_1234567890ab
GEMINI_API_KEY=sk_live_your_gemini_api_key_here
NODE_ENV=development
```

**frontend/.env.local**
```env
VITE_API_URL=http://localhost:5000/api
```

## Step 4: Run the Application

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

## Step 5: Access the App

Open your browser and go to:
```
http://localhost:5173
```

## Create Test Account

1. Click "Sign Up"
2. Enter test credentials:
   - Name: Test User
   - Email: test@example.com
   - Password: test123

3. You're in! Start adding DSA problems

## 🧪 Test the Features

### Add a Problem
1. Go to **Problems** page
2. Click "Add Problem"
3. Fill in details and save

### View Analytics
1. Go to **Analytics** page
2. See charts of your progress

### Try AI Mentor
1. Go to **AI Mentor** tab
2. **Explain Concept**: Enter "Binary Search Tree"
3. **Get Recommendations**: Select weak topics

## ✅ Verification Checklist

- [ ] Backend running (check http://localhost:5000/api/health)
- [ ] Frontend running (check http://localhost:5173)
- [ ] Can sign up and login
- [ ] Can add problems
- [ ] Can view analytics
- [ ] AI mentor generates explanations
- [ ] AI mentor generates recommendations

## 📱 Key Pages

| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | /dashboard | Overview & stats |
| Problems | /problems | CRUD operations |
| Analytics | /analytics | Charts & graphs |
| AI Mentor | /ai-mentor | Explanations & recommendations |
| Login | /login | Authentication |

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- Check MONGO_URI in `.env`
- Add your IP to MongoDB Atlas whitelist
- Verify username:password in connection string

### "Gemini API Error"
- Verify API key is correct
- Ensure API is enabled in Google Cloud
- Check API quota hasn't exceeded

### "Port already in use"
- Backend: Change PORT in `.env` (default 5000)
- Frontend: Vite auto-assigns if 5173 is busy

### "CORS Error"
- Ensure backend CORS middleware is enabled
- Check frontend URL matches backend CORS config

## 📚 Next Steps

1. **Customize the theme** - Edit `tailwind.config.js`
2. **Add more topics** - Update topic enum in `Problem.js` model
3. **Deploy** - Follow deployment guides in main README
4. **Build features** - Check future enhancements

## 🎯 Pro Tips

- Use Chrome DevTools to inspect API calls
- Check backend console for detailed error logs
- Test API endpoints with Postman before frontend
- Use MongoDB Atlas UI to view saved data
- Refresh page after model changes

## 📖 Full Documentation

- Backend details: See `SETUP_GUIDE.md`
- API endpoints: See `README.md`
- Architecture: Check backend/frontend structure

---

**Need help?** Check troubleshooting or review logs!

**Ready to deploy?** See deployment section in README.md
