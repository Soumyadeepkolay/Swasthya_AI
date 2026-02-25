import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { generatePlan } from '../api';
import { calculateBMI, calculateTDEE } from '../utils/fitness';

const schema = z.object({
  age: z.number().min(16).max(80),
  gender: z.enum(['male', 'female', 'other']),
  height: z.number().min(120).max(250),
  weight: z.number().min(30).max(250),
  goal: z.string().min(1, 'Goal is required'),
  diet_preference: z.string().min(1, 'Diet preference is required'),
  budget: z.string().min(1, 'Budget is required'),
  equipment: z.string().min(1, 'Equipment info is required'),
  activity_level: z.string().min(1, 'Activity level is required'),
  health_restrictions: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const PlanForm = ({ setPlan }: { setPlan: (plan: any) => void }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      age: 20,
      height: 170,
      weight: 65,
      gender: 'male',
      goal: 'muscle_gain',
      diet_preference: 'non_veg',
      budget: 'medium',
      equipment: 'gym',
      activity_level: 'moderate',
    }
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const plan = await generatePlan(data);
      // Supplement AI response with local calculations if needed
      const bmi = calculateBMI(data.weight, data.height);
      const tdee = calculateTDEE(data.weight, data.height, data.age, data.gender, data.activity_level);
      
      const finalPlan = { ...plan, bmi: plan.bmi || bmi, tdee: plan.tdee || tdee };
      setPlan(finalPlan);
      navigate('/result');
    } catch (error) {
      console.error('Error generating plan:', error);
      alert('Failed to generate plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Personal Basics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <input type="number" {...register('age', { valueAsNumber: true })} className="w-full p-3 bg-neutral-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                <select {...register('gender')} className="w-full p-3 bg-neutral-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Height (cm)</label>
                <input type="number" {...register('height', { valueAsNumber: true })} className="w-full p-3 bg-neutral-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Weight (kg)</label>
                <input type="number" {...register('weight', { valueAsNumber: true })} className="w-full p-3 bg-neutral-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
            <button type="button" onClick={nextStep} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Goals & Diet</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">What is your primary goal?</label>
              <select {...register('goal')} className="w-full p-3 bg-neutral-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
                <option value="lean_bulk">Lean Bulk</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Dietary Preference</label>
              <select {...register('diet_preference')} className="w-full p-3 bg-neutral-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                <option value="vegetarian">Vegetarian</option>
                <option value="non_veg">Non-Veg (Indian/International)</option>
                <option value="vegan">Vegan</option>
                <option value="keto">Keto-Friendly</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Activity Level</label>
              <select {...register('activity_level')} className="w-full p-3 bg-neutral-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                <option value="sedentary">Sedentary (Little/no exercise)</option>
                <option value="light">Lightly Active (1-3 days/week)</option>
                <option value="moderate">Moderately Active (3-5 days/week)</option>
                <option value="active">Very Active (6-7 days/week)</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={prevStep} className="flex-1 py-4 bg-neutral-200 text-neutral-700 rounded-xl font-bold flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button type="button" onClick={nextStep} className="flex-[2] py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Lifestyle & Constraints</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Budget Level (Weekly)</label>
              <select {...register('budget')} className="w-full p-3 bg-neutral-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                <option value="low">Student Budget (Low)</option>
                <option value="medium">Medium</option>
                <option value="high">Flexible (High)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Available Equipment</label>
              <select {...register('equipment')} className="w-full p-3 bg-neutral-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                <option value="none">Bodyweight Only (None)</option>
                <option value="dumbbells">Dumbbells only</option>
                <option value="gym">Full Gym Access</option>
                <option value="home">Home Gym</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Health Restrictions (Injuries, Allergies)</label>
              <textarea {...register('health_restrictions')} placeholder="e.g., knee pain, peanut allergy..." className="w-full p-3 bg-neutral-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-24" />
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={prevStep} className="flex-1 py-4 bg-neutral-200 text-neutral-700 rounded-xl font-bold flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button type="submit" disabled={loading} className="flex-[2] py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all disabled:bg-indigo-300">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Generate My Plan"}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-neutral-100">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full mx-1 ${s <= step ? 'bg-indigo-600' : 'bg-neutral-200'}`} />
            ))}
          </div>
          <h2 className="text-2xl font-black text-center">Customize Your Plan</h2>
          <p className="text-neutral-500 text-center text-sm">Step {step} of 3</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStep()}
        </form>
      </div>
    </div>
  );
};

export default PlanForm;
