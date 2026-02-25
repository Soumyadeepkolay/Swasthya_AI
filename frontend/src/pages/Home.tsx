import { useNavigate } from 'react-router-dom';
import { Zap, Utensils, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
              The Ultimate Student Fitness Companion
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 mb-8">
              Your Personalized AI <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500">
                Fitness & Nutrition Coach
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-500 mb-10 leading-relaxed">
              Tailored workout plans and meal guides designed specifically for the student lifestyle and budget. Powered by advanced AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/form')}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Create My Plan Free
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-neutral-900 border border-neutral-200 rounded-xl font-bold text-lg hover:bg-neutral-50 transition-all">
                View Sample Plan
              </button>
            </div>
          </motion.div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-indigo-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[10%] w-64 h-64 bg-violet-400 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to reach your goals</h2>
          <p className="text-neutral-500 max-w-xl mx-auto">Our AI considers your budget, equipment, and dietary preferences to build a plan that actually works for you.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6 text-indigo-600" />,
              title: "AI-Powered Workouts",
              desc: "7-day custom routines based on your available equipment, from zero-gym bodyweight to full-rack lifting."
            },
            {
              icon: <Utensils className="w-6 h-6 text-indigo-600" />,
              title: "Budget Meal Plans",
              desc: "Nutritious meal plans that don't break the bank, optimized for student budgets and limited prep time."
            },
            {
              icon: <Target className="w-6 h-6 text-indigo-600" />,
              title: "Macro Calculations",
              desc: "Precise TDEE, BMI, and calorie tracking. We handle the math, you handle the work."
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 bg-neutral-50 rounded-2xl hover:shadow-lg transition-all border border-neutral-100 group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-neutral-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">How it works in 3 easy steps</h2>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Share Your Goals", desc: "Fill out a quick form about your body type, goals, and budget." },
                  { step: "02", title: "AI Generation", desc: "Our model processes your data and generates a scientifically backed plan." },
                  { step: "03", title: "Start Training", desc: "Get your PDF guide and start your transformation journey immediately." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <span className="text-2xl font-black text-indigo-200">{item.step}</span>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-neutral-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-indigo-600 rounded-3xl overflow-hidden shadow-2xl rotate-3 relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Fitness Training" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="absolute inset-0 bg-violet-200 rounded-3xl -rotate-3 -z-10" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
