import { motion } from 'framer-motion';
import { AlertCircle, TrendingUp, CheckCircle, Clock, MessageSquare, FileBarChart, Sparkles, ArrowRight, Download } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';

export default function Dashboard() {
  const { dashboardStyle } = useTheme();
  const { user } = useAuth();
  const { currentDataset } = useData();
  const navigate = useNavigate();
  const { toPDF, targetRef } = usePDF({filename: 'sample_biziq_report.pdf'});

  // Helper to determine panel class based on Theme Pick
  const getPanelClass = () => {
    switch (dashboardStyle) {
      case 'bento': return 'bento-panel';
      case 'minimal-dark': return 'minimal-dark-panel rounded-2xl';
      case 'glassmorphism': 
      default:
        return 'glass-panel rounded-2xl';
    }
  };

  const getContainerClass = () => {
    if (dashboardStyle === 'bento') return 'gap-4';
    return 'gap-6';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <h1 className="text-3xl font-bold tracking-tight">Good day, {user?.name || 'User'} 👋</h1>

      {/* Alert Strip */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full p-4 rounded-xl bg-gradient-to-r from-rose-500/10 to-orange-500/10 border border-rose-500/20 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row"
      >
        <div className="flex items-center gap-3 text-rose-400">
           <AlertCircle className="w-5 h-5 shrink-0" />
           <p className="text-sm font-medium">Critical: Stock levels drop below safety margin for Top 3 SKU's based on Q3 analysis.</p>
        </div>
        <button className="whitespace-nowrap px-4 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-sm font-medium transition-colors">
          Ask BizIQ how to fix
        </button>
      </motion.div>

      {/* Main Grid */}
      <div className={cn("grid grid-cols-1 md:grid-cols-3", getContainerClass())}>
        
        {/* Sample Report Card instead of Spline */}
        <div className={cn("md:col-span-2 h-[400px] p-8 flex flex-col justify-center relative overflow-hidden group", getPanelClass())}>
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileBarChart className="w-64 h-64 text-[#4f8ef7]" />
          </div>
          
          <div className="relative z-10 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4f8ef7]/10 text-[#4f8ef7] text-xs font-bold mb-6 border border-[#4f8ef7]/20">
              <Sparkles className="w-3 h-3" />
              NEW: PRO REPORT TEMPLATE
            </div>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Generate Professional <br/> Business Summaries</h2>
            <p className="text-zinc-400 mb-8 text-lg">
              Capture your entire dataset analysis into a sleek, board-ready PDF report in one click. 
              BizIQ now supports multi-page exports with AI-generated insights.
            </p>
            <div className="flex flex-wrap gap-4">
               <button 
                 onClick={() => navigate('/reports')}
                 className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#4f8ef7] to-[#7c3aed] text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-[#4f8ef7]/20 flex items-center gap-2"
               >
                 View My Reports
                 <ArrowRight className="w-4 h-4" />
               </button>
               <button onClick={() => toPDF()} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                 <Download className="w-4 h-4" />
                 Download Sample PDF
               </button>
            </div>
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

        {/* Status Cards */}
        <div className={cn("flex flex-col", getContainerClass())}>
          <div className={cn("flex-1 p-5 flex flex-col justify-between", getPanelClass())}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-zinc-300">Upload Status</h3>
              <CheckCircle className="w-5 h-5 text-[#2dd4bf]" />
            </div>
            <div>
              <p className="text-3xl font-bold mb-1 truncate">{currentDataset?.name || 'No Dataset'}</p>
              <p className="text-sm text-zinc-500">{currentDataset ? `${currentDataset.data.length} rows indexed` : 'Start by uploading data'}</p>
            </div>
            <div className="mt-4 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
               <div className={cn("h-full bg-[#2dd4bf] rounded-full", currentDataset ? "w-full" : "w-0")}></div>
            </div>
          </div>

          <div className={cn("flex-1 p-5 flex flex-col justify-between", getPanelClass())}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-zinc-300">Analysis Health</h3>
              <div className="w-8 h-8 rounded-full bg-[#7c3aed]/20 flex items-center justify-center">
                <span className="text-xs font-bold text-[#7c3aed]">AI</span>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">Optimized</p>
              <p className="text-sm text-zinc-500">Natural language engine ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Queries */}
      <div className={cn("p-6", getPanelClass())}>
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#4f8ef7]" />
          Recent Activity
        </h3>
        <div className="space-y-2">
          {currentDataset ? (
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4f8ef7]/20 flex items-center justify-center shrink-0">
                   <MessageSquare className="w-4 h-4 text-[#4f8ef7]" />
                </div>
                <p className="font-medium text-sm sm:text-base">Successfully analyzed {currentDataset.name}</p>
              </div>
              <span className="text-xs text-zinc-500 shrink-0 ml-4">Just now</span>
            </div>
          ) : (
            <p className="text-zinc-500 text-center py-8 bg-white/5 rounded-xl border border-dashed border-white/10">
              No recent activity found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
