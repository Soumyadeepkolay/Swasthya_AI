# Swasthya_AI: Student Workout & Diet Planner

A production-ready AI-powered fitness application tailored for students. It generates personalized 7-day workout and meal plans based on body metrics, goals, budget, and available equipment.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: FastAPI (Python), Groq LLM (AI), Pydantic
- **API**: Groq (Llama 3.3 70B Versatile)
- **Deployment**: Vercel (Frontend), Render (Backend)

## Features

- 🏋️ **AI Workout Plan**: Customized 7-day routine based on equipment.
- 🥗 **Smart Meal Plan**: Culturally adaptable, student-budget friendly.
- 📊 **Metric Calculations**: Auto BMI and TDEE calculations.
- 💰 **Budgeting**: Estimated weekly costs for student living.
- 📄 **PDF Export**: Download your plan for offline use.
- 📱 **Responsive**: Fully mobile-friendly premium UI.

## Getting Started

### 1. Prerequisites
- Node.js (v18+)
- Python (3.9+)
- Groq API Key (Get it free at [console.groq.com](https://console.groq.com))

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```
Create a `.env` file in the `backend` folder:
```env
GROQ_API_KEY=your_groq_api_key_here
```
Run the backend:
```bash
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
npm install
npm run dev
```

## Deployment Guide

### Backend (Render.com)
1. Create a New Web Service on Render.
2. Connect your GitHub Repo.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add Environment Variable: `GROQ_API_KEY`

### Frontend (Vercel)
1. Push your code to GitHub.
2. Connect to Vercel.
3. Add Environment Variable: `VITE_API_URL` (pointing to your Render URL).
4. Deploy.

## AI Prompting Strategy
We use a strict JSON-output prompt with Llama-3 to ensure consistent data structures for our frontend components. The system calculates macros and suggests meals that align with the user's budget and culture.

## Troubleshooting
- **CORS Error**: Ensure the backend has `allow_origins=["*"]` or your specific frontend domain.
- **Groq Rate Limits**: The free tier has limits; if reached, the app falls back to a mocked response.
