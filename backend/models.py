from pydantic import BaseModel, Field
from typing import List, Optional
from sqlalchemy import Column, Integer, String, JSON, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class UserInput(BaseModel):
    age: int
    gender: str
    height: float # cm
    weight: float # kg
    goal: str
    diet_preference: str
    budget: str
    equipment: str
    activity_level: str
    health_restrictions: Optional[str] = ""

class WorkoutItem(BaseModel):
    day: str
    exercises: List[dict]

class MealItem(BaseModel):
    day: str
    meals: List[dict]

class PlanResponse(BaseModel):
    workout_plan: List[dict]
    meal_plan: List[dict]
    grocery_list: List[str]
    daily_calories: int
    protein_target: int
    budget_estimate: str
    motivational_message: str
    bmi: float
    tdee: float

class PlanDB(Base):
    __tablename__ = "plans"
    id = Column(Integer, primary_key=True, index=True)
    user_data = Column(JSON)
    plan_data = Column(JSON)
    created_at = Column(String)
