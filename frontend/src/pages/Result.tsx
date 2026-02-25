import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download, Share2, ArrowLeft, Heart, Info, Dumbbell, Coffee, ShoppingBasket, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResultPage = ({ plan }: { plan: any }) => {
  const navigate = useNavigate();
  const pdfRef = useRef<HTMLDivElement>(null);

  if (!plan) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-neutral-500">No plan found. Let's create one!</p>
        <button onClick={() => navigate('/form')} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold">
          Go to Form
        </button>
      </div>
    );
  }

  const downloadPDF = async () => {
    if (!pdfRef.current) return;
    const canvas = await html2canvas(pdfRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('FitAI_Fitness_Plan.pdf');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <button onClick={() => navigate('/form')} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-indigo-600 mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Edit Preferences
          </button>
          <h1 className="text-4xl font-black">Your Personalized Plan</h1>
          <p className="text-neutral-500 italic mt-2">"{plan.motivational_message}"</p>
        </div>
        <div className="flex gap-3">
          <button onClick={downloadPDF} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all">
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button className="p-2.5 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div ref={pdfRef} className="space-y-12 bg-white md:p-8 rounded-3xl">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={<Target className="w-5 h-5 text-indigo-600" />} label="BMI" value={plan.bmi} sub={getBMICategoryLabel(plan.bmi)} />
          <StatCard icon={<Info className="w-5 h-5 text-indigo-600" />} label="Daily Calories" value={`${plan.daily_calories} kcal`} sub={`TDEE: ${plan.tdee}`} />
          <StatCard icon={<Heart className="w-5 h-5 text-rose-600" />} label="Protein Target" value={`${plan.protein_target}g`} sub="Daily Goal" />
          <StatCard icon={<ShoppingBasket className="w-5 h-5 text-emerald-600" />} label="Est. Budget" value={plan.budget_estimate} sub="Per Week" />
        </div>

        {/* Workout Plan */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold">7-Day Workout Routine</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {plan.workout_plan.map((day: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100"
              >
                <h3 className="font-bold text-lg mb-4 text-indigo-600 flex justify-between">
                  {day.day} <span className="text-neutral-400 font-medium text-sm">{day.focus}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {day.exercises.map((ex: any, j: number) => (
                    <div key={j} className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
                      <p className="font-bold text-neutral-800">{ex.name}</p>
                      <p className="text-sm text-indigo-600 font-medium">{ex.sets} sets × {ex.reps} reps</p>
                      {ex.notes && <p className="text-xs text-neutral-400 mt-2 italic">{ex.notes}</p>}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Meal Plan */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <Coffee className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold">7-Day Nutritional Guide</h2>
          </div>
          <div className="space-y-6">
            {plan.meal_plan.map((day: any, i: number) => (
              <div key={i} className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                <h3 className="font-bold text-lg mb-4 text-orange-600">{day.day}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {day.meals.map((meal: any, j: number) => (
                    <div key={j} className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
                      <span className="text-[10px] uppercase font-black text-orange-400 tracking-widest">{meal.type}</span>
                      <p className="font-bold text-neutral-800">{meal.name}</p>
                      <p className="text-xs text-neutral-500 mt-1">{meal.calories} kcal | {meal.protein}g protein</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Grocery List */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <ShoppingBasket className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold">Weekly Grocery List</h2>
          </div>
          <div className="bg-emerald-50/50 p-8 rounded-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-8">
            {plan.grocery_list.map((item: string, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-neutral-700">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, sub }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-2xl font-black text-neutral-900">{value}</div>
    <div className="text-xs text-neutral-400 mt-1">{sub}</div>
  </div>
);

const getBMICategoryLabel = (bmi: number) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Healthy';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export default ResultPage;
