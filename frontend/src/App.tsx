// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Zap } from 'lucide-react';
// import HomeHero from './pages/Home';
// import PlanForm from './pages/PlanForm';
// import ResultPage from './pages/Result';


// export function App() {
//   const [generatedPlan, setGeneratedPlan] = useState<any>(null);

//   return (
//     <Router>
//       <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
//         <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
//           <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
//             <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
//               <div className="bg-indigo-600 p-1.5 rounded-lg">
//                 <Zap className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-bold tracking-tight">Swasthya<span className="text-indigo-600">AI</span></span>
//             </div>
//             <div className="hidden md:flex items-center gap-6">
//               <a href="#features" className="text-sm font-medium text-neutral-500 hover:text-indigo-600 transition-colors">Features</a>
//               <a href="#how-it-works" className="text-sm font-medium text-neutral-500 hover:text-indigo-600 transition-colors">How it Works</a>
//               <a href="/form" className="text-sm font-medium text-neutral-500 hover:text-indigo-600 transition-colors">Create Plan</a>
//             </div>
//             <button 
//               onClick={() => window.location.href = '/form'}
//               className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
//             >
//               Get Started
//             </button>
//           </nav>
//         </header>

//         <main>
//           <Routes>
//             <Route path="/" element={<HomeHero />} />
//             <Route path="/form" element={<PlanForm setPlan={setGeneratedPlan} />} />
//             <Route path="/result" element={<ResultPage plan={generatedPlan} />} />
//           </Routes>
//         </main>

//         <footer className="bg-white border-t border-neutral-200 py-12 mt-20">
//           <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div className="space-y-4 col-span-1 md:col-span-2">
//               <div className="flex items-center gap-2">
//                 <div className="bg-indigo-600 p-1 rounded">
//                   <Zap className="w-4 h-4 text-white" />
//                 </div>
//                 <span className="text-lg font-bold">SwasthyaAI</span>
//               </div>
//               <p className="text-neutral-500 max-w-sm">
//                 Empowering students with personalized AI-driven workout and nutrition plans for a healthier lifestyle.
//               </p>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Product</h4>
//               <ul className="space-y-2 text-sm text-neutral-500">
//                 <li><a href="#" className="hover:text-indigo-600 transition-colors">Workout Builder</a></li>
//                 <li><a href="#" className="hover:text-indigo-600 transition-colors">Diet Planner</a></li>
//                 <li><a href="#" className="hover:text-indigo-600 transition-colors">Calorie Calculator</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Legal</h4>
//               <ul className="space-y-2 text-sm text-neutral-500">
//                 <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
//               </ul>
//             </div>
//           </div>
//           <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-neutral-100 text-center text-sm text-neutral-400">
//             © {new Date().getFullYear()} SwasthyaAI Planner. Made for Students.
//           </div>
//         </footer>
//       </div>
//     </Router>
//   );
// }



import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeHero from './pages/Home';
import PlanForm from './pages/PlanForm';
import ResultPage from './pages/Result';
import logo from './assets/logo.png';   // ✅ Import your logo

export function App() {
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  return (
    <Router>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
        
        {/* ================= HEADER ================= */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
          <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            
            {/* Logo Section */}
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => window.location.href = '/'}
            >
              {/* ✅ Your Custom Logo */}
              <img 
                src={logo} 
                alt="SwasthyaAI Logo" 
                className="w-10 h-10 object-contain"
              />

              <span className="text-xl font-bold tracking-tight">
                Swasthya<span className="text-indigo-600">AI</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium text-neutral-500 hover:text-indigo-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-neutral-500 hover:text-indigo-600 transition-colors">
                How it Works
              </a>
              <a href="/form" className="text-sm font-medium text-neutral-500 hover:text-indigo-600 transition-colors">
                Create Plan
              </a>
            </div>

            <button 
              onClick={() => window.location.href = '/form'}
              className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              Get Started
            </button>
          </nav>
        </header>

        {/* ================= ROUTES ================= */}
        <main>
          <Routes>
            <Route path="/" element={<HomeHero />} />
            <Route path="/form" element={<PlanForm setPlan={setGeneratedPlan} />} />
            <Route path="/result" element={<ResultPage plan={generatedPlan} />} />
          </Routes>
        </main>

        {/* ================= FOOTER ================= */}
        <footer className="bg-white border-t border-neutral-200 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="space-y-4 col-span-1 md:col-span-2">
              <div className="flex items-center gap-2">
                
                {/* ✅ Footer Logo */}
                <img 
                  src={logo} 
                  alt="SwasthyaAI Logo" 
                  className="w-8 h-8 object-contain"
                />

                <span className="text-lg font-bold">SwasthyaAI</span>
              </div>

              <p className="text-neutral-500 max-w-sm">
                Empowering students with personalized AI-driven workout and nutrition plans for a healthier lifestyle.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Workout Builder</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Diet Planner</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Calorie Calculator</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-neutral-500">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

          </div>

          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-neutral-100 text-center text-sm text-neutral-400">
            © {new Date().getFullYear()} SwasthyaAI Planner. Made for Students.
          </div>
        </footer>

      </div>
    </Router>
  );
}