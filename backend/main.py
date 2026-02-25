import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from ai import generate_fitness_plan
from models import UserInput
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Fitness Planner API")

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AI Fitness Planner API is running"}

@app.post("/generate-plan")
async def create_plan(user_input: UserInput):
    try:
        # Check if GROQ_API_KEY is set
        if not os.getenv("GROQ_API_KEY"):
            # Return a mocked plan for testing purposes if API key is missing
            return {
                "workout_plan": [
                    {
                        "day": "Day 1",
                        "focus": "Full Body Strength",
                        "exercises": [
                            {"name": "Bodyweight Squats", "sets": 3, "reps": "15", "notes": "Focus on depth"},
                            {"name": "Push-ups", "sets": 3, "reps": "10-12", "notes": "Knees on ground if needed"},
                            {"name": "Plank", "sets": 3, "reps": "30 sec", "notes": "Keep core tight"}
                        ]
                    }
                ],
                "meal_plan": [
                    {
                        "day": "Day 1",
                        "meals": [
                            {"type": "Breakfast", "name": "Greek Yogurt with Berries", "calories": 250, "protein": 20, "ingredients": ["Yogurt", "Berries"]},
                            {"type": "Lunch", "name": "Chicken Salad", "calories": 400, "protein": 35, "ingredients": ["Chicken", "Greens", "Olive oil"]},
                            {"type": "Dinner", "name": "Grilled Fish and Veggies", "calories": 500, "protein": 40, "ingredients": ["Fish", "Broccoli", "Rice"]}
                        ]
                    }
                ],
                "grocery_list": ["Greek Yogurt", "Berries", "Chicken breast", "Mixed greens", "Fish fillet", "Broccoli", "Brown rice"],
                "daily_calories": 2000,
                "protein_target": 140,
                "budget_estimate": "Approx $40-60/week",
                "motivational_message": "Success starts with self-discipline. Let's go!",
                "bmi": 24.2,
                "tdee": 2300
            }
        
        plan = generate_fitness_plan(user_input.model_dump())
        return plan
    except Exception as e:
        print(f"Error generating plan: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
