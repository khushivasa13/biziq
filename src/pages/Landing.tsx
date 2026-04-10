import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, MessageSquare, Bell, FileBarChart, PieChart, Shield, ArrowRight, Download, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import ShaderBackground from '../components/ui/shader-background';
import { usePDF } from 'react-to-pdf';

// Simple typewriter effect hook
function useTypewriter(words: string[], typingSpeed = 100, deletingSpeed = 50, delay = 2000) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && text === fullText) {
        typeSpeed = delay;
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        typeSpeed = 500;
      }

      return typeSpeed;
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, delay]);

  return text;
}

const features = [
  {
    title: "Upload Data",
    description: "Drag and drop CSV, XLSX, JSON, or connect your SQL database securely.",
    icon: Database,
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "AI Chat",
    description: "Ask questions in natural language. We'll write the SQL and build the charts.",
    icon: MessageSquare,
    color: "from-purple-500 to-indigo-400"
  },
  {
    title: "Smart Alerts",
    description: "Get notified of critical changes, warnings, and opportunities automatically.",
    icon: Bell,
    color: "from-rose-500 to-orange-400"
  },
  {
    title: "Reports",
    description: "Generate executive summaries and comprehensive PDF reports in seconds.",
    icon: FileBarChart,
    color: "from-teal-500 to-emerald-400"
  },
  {
    title: "Charts & Visuals",
    description: "Beautiful, interactive charts generated from your data instantly.",
    icon: PieChart,
    color: "from-amber-500 to-yellow-400"
  },
  {
    title: "Secure Storage",
    description: "Enterprise-grade encryption for all your business data at rest and in transit.",
    icon: Shield,
    color: "from-slate-500 to-zinc-400"
  }
];

export default function Landing() {
  const { toPDF, targetRef } = usePDF({filename: 'sample_biziq_report.pdf'});
  const typewriterText = useTypewriter([
    "Talk to Your Business Data",
    "No SQL needed. Just ask.",
    "Insights at the speed of thought."
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ShaderBackground />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#4f8ef7] animate-pulse"></span>
            <span className="text-sm font-medium text-zinc-300">BizIQ Intelligence Cloud</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 italic">
            <span className="block text-white mb-2">BizIQ —</span>
            <span className="h-[1.2em] inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#4f8ef7] via-[#7c3aed] to-[#2dd4bf]">
               {typewriterText}
               <span className="animate-pulse text-[#4f8ef7]">|</span>
            </span>
          </h1>
          
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl text-center leading-relaxed">
            Stop digging through spreadsheets. BizIQ converts your data into executive-grade strategies using advanced neural reasoning.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/auth"
                className="px-8 py-4 rounded-full bg-white text-zinc-900 font-bold text-lg hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                Get Started for Free
              </Link>
            </motion.div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('report-peek')?.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => toPDF(), 1000);
              }}
              className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2"
            >
              See Sample Report
            </motion.button>
          </div>
        </div>
      </section>

      {/* Report Preview Section */}
      <section id="report-peek" className="py-32 px-6 bg-gradient-to-b from-transparent to-[#09090b] relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7c3aed]/10 text-[#7c3aed] text-xs font-bold border border-[#7c3aed]/20">
                <Sparkles className="w-3 h-3" />
                AUTOMATED REPORTING
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Board-Ready <br/> Reports in Seconds</h2>
              <p className="text-xl text-zinc-400 leading-relaxed">
                BizIQ doesn't just show data; it writes the summary for you. 
                Our AI analyzes trends across months, identifies outliers, and delivers 
                professional PDF documentation designed for high-stakes meetings.
              </p>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-3 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7]"></span>
                  Executive Summaries & SWOT
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]"></span>
                  Interactive Financial Dashboards
                </li>
                <li className="flex items-center gap-3 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]"></span>
                  Multi-Dataset Comparison
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl bg-[#18181b] border border-white/10 shadow-2xl group"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#4f8ef7]/20 blur-3xl rounded-full"></div>
              <div className="space-y-4 opacity-50 blur-[2px] pointer-events-none group-hover:opacity-100 group-hover:blur-0 transition-all duration-700">
                <div className="h-4 w-1/3 bg-white/20 rounded"></div>
                <div className="h-3 w-full bg-white/10 rounded"></div>
                <div className="h-3 w-5/6 bg-white/10 rounded"></div>
                <div className="grid grid-cols-3 gap-4 py-8">
                  <div className="h-32 bg-[#4f8ef7]/20 rounded-xl"></div>
                  <div className="h-32 bg-[#7c3aed]/20 rounded-xl"></div>
                  <div className="h-32 bg-[#2dd4bf]/20 rounded-xl"></div>
                </div>
                <div className="h-3 w-full bg-white/10 rounded"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <button onClick={() => toPDF()} className="px-6 py-3 rounded-xl bg-white text-zinc-900 font-bold flex items-center gap-2 shadow-2xl hover:scale-110 transition-transform">
                   <Download className="w-5 h-5" />
                   Download Sample Q4 Report
                 </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hidden PDF Content */}
        <div className="absolute -left-[9999px] top-0 pointer-events-none">
          <div ref={targetRef} className="w-[800px] p-12 bg-white text-zinc-900 border border-zinc-200">
             <h1 className="text-4xl font-bold mb-4 text-black">BizIQ Sample Executive Report</h1>
             <p className="text-zinc-500 mb-8 font-medium border-b pb-4">Generated on {new Date().toLocaleDateString()}</p>
             <h2 className="text-2xl font-bold text-[#4f8ef7] mb-2 border-l-4 border-[#4f8ef7] pl-3">Q4 Financial Health</h2>
             <p className="text-zinc-800 leading-relaxed mb-8">
               Our AI analysis indicates a strong finish for the fiscal year. Revenue has grown by 14% quarter-over-quarter, 
               primarily driven by an unexpected surge in the enterprise software segment. The operational costs remained 
               stable, contributing to an overall increase in net margins by 5.2%.
             </p>
             
             <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                 <p className="text-sm font-semibold text-zinc-500">Total Revenue</p>
                 <p className="text-3xl font-bold text-emerald-600">$4.2M</p>
               </div>
               <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                 <p className="text-sm font-semibold text-zinc-500">Active Licenses</p>
                 <p className="text-3xl font-bold text-blue-600">12,492</p>
               </div>
             </div>

             <h2 className="text-2xl font-bold text-[#7c3aed] mb-2 border-l-4 border-[#7c3aed] pl-3">Strategic Recommendations</h2>
             <ul className="list-disc pl-5 space-y-2 text-zinc-800">
               <li>Increase marketing spend in the EMEA region by 15% to capture emerging market demand.</li>
               <li>Consolidate legacy tech stack systems to reduce overhead by projected $200k/yr.</li>
               <li>Initiate automated churn-prevention campaigns for user segments logging in less than twice a month.</li>
             </ul>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="py-32 px-6 relative z-10 bg-[#09090b]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2dd4bf] to-[#4f8ef7]">understand your data</span></h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Powerful features wrapped in a beautifully simple interface. Forget complex SQL queries and pivot tables.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "group relative p-8 rounded-3xl overflow-hidden",
                  "bg-gradient-to-b from-[#18181b] to-[#09090b]",
                  "border border-white/5 hover:border-white/10 transition-colors duration-500",
                  "col-span-1",
                  index === 0 && "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#18181b] via-[#09090b] to-blue-900/20",
                  index === 3 && "lg:col-span-2 bg-gradient-to-bl from-[#18181b] via-[#09090b] to-teal-900/20"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
                      "bg-gradient-to-br", feature.color
                    )}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-zinc-400 leading-relaxed max-w-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer minimal */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
             <Database className="w-6 h-6 text-[#4f8ef7]" />
             <span className="text-xl font-bold tracking-tight text-white">BizIQ</span>
           </div>
           <p className="text-zinc-500">© 2026 BizIQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
