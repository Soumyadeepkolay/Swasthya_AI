import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_fitness_plan(user_data: dict):
    prompt = f"""
    You are an expert fitness coach and nutritionist. Generate a comprehensive 7-day workout and diet plan for a student based on these details:
    - Age: {user_data['age']}
    - Gender: {user_data['gender']}
    - Height: {user_data['height']}cm
    - Weight: {user_data['weight']}kg
    - Goal: {user_data['goal']}
    - Diet: {user_data['diet_preference']}
    - Budget: {user_data['budget']}
    - Equipment: {user_data['equipment']}
    - Activity Level: {user_data['activity_level']}
    - Health Restrictions: {user_data['health_restrictions']}

    Calculate BMI and TDEE correctly.
    Provide the response strictly as valid JSON with the following structure:
    {{
        "workout_plan": [
            {{
                "day": "Day 1",
                "focus": "Upper Body",
                "exercises": [
                    {{"name": "Pushups", "sets": 3, "reps": "12-15", "notes": "Form focus"}}
                ]
            }}
        ],
        "meal_plan": [
            {{
                "day": "Day 1",
                "meals": [
                    {{"type": "Breakfast", "name": "Oatmeal", "calories": 300, "protein": 10, "ingredients": ["oats", "milk", "banana"]}}
                ]
            }}
        ],
        "grocery_list": ["list of items based on the meal plan"],
        "daily_calories": 2500,
        "protein_target": 150,
        "budget_estimate": "Detailed breakdown based on student budget",
        "motivational_message": "A daily quote for students",
        "bmi": 22.5,
        "tdee": 2400
    }}

    IMPORTANT: For meal plans, prioritize Indian/Culturally adaptable meals if specified or common for the profile.
    Generate a full 7-day schedule for both workout and meals.
    JSON output ONLY.
    """

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a professional fitness and nutrition AI."},
            {"role": "user", "content": prompt}
        ],
        response_format={"type": "json_object"}
    )

    return json.loads(completion.choices[0].message.content)
