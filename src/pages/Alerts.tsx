import { useState } from 'react';
import { AlertTriangle, AlertCircle, Sparkles, CheckSquare, Clock, MessageSquare, Search } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_ALERTS = [
  {
    id: 1,
    type: 'critical',
    title: 'Inventory Drop Warning',
    description: 'Stock for "Super Widget" is projected to drop below 10% next week based on current sales velocity.',
    timestamp: '1 hour ago',
    suggestion: 'Reorder 5,000 units by Friday to avoid stockout.'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Unusual Expense Spike',
    description: 'Marketing spend for Campaign Alpha exceeded budget by 15% this weekend without proportional ROI.',
    timestamp: '5 hours ago',
    suggestion: 'Pause campaign and investigate ad placements.'
  },
  {
    id: 3,
    type: 'opportunity',
    title: 'High Conversion Cohort',
    description: 'Users from organic search referring source have shown a 25% increase in conversion rate over the last 3 days.',
    timestamp: '1 day ago',
    suggestion: 'Increase budget allocation to SEO/Content initiatives.'
  }
];

export default function Alerts() {
  const { dashboardStyle } = useTheme();
  const [alerts, setAlerts] = useState(MOCK_ALERTS);

  const getPanelClass = () => dashboardStyle === 'bento' ? 'bento-panel' : dashboardStyle === 'minimal-dark' ? 'minimal-dark-panel' : 'glass-panel';

  const markResolved = (id: number) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Smart Alerts</h1>
          <p className="text-zinc-400">AI-detected anomalies, warnings, and opportunities.</p>
        </div>
        
        <div className="hidden sm:flex relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
             type="text" 
             placeholder="Search alerts..." 
             className="bg-[#18181b] border border-white/10 rounded-full py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[#4f8ef7] w-64"
          />
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {alerts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("p-12 text-center rounded-2xl", getPanelClass())}>
              <CheckSquare className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">All Clear</h3>
              <p className="text-zinc-400">You have zero pending alerts. Great job!</p>
            </motion.div>
          )}

          {alerts.map((alert, idx) => (
            <motion.div 
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1 }}
              className={cn("p-5 md:p-6 rounded-2xl", getPanelClass())}
            >
              <div className="flex flex-col md:flex-row gap-5">
                {/* Icon Column */}
                <div className="shrink-0 mt-1">
                   {alert.type === 'critical' && (
                     <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                       <AlertCircle className="w-5 h-5 text-rose-500" />
                     </div>
                   )}
                   {alert.type === 'warning' && (
                     <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                       <AlertTriangle className="w-5 h-5 text-amber-500" />
                     </div>
                   )}
                   {alert.type === 'opportunity' && (
                     <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                       <Sparkles className="w-5 h-5 text-emerald-500" />
                     </div>
                   )}
                </div>

                {/* Content Column */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                    <span className="text-xs text-zinc-500 font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/5 w-fit">
                      {alert.timestamp}
                    </span>
                  </div>
                  
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                    {alert.description}
                  </p>

                  <div className="p-3 bg-[#09090b] rounded-xl border border-white/5">
                    <p className="text-sm">
                      <span className="font-semibold text-zinc-400 mr-2">AI Suggestion:</span>
                      <span className="text-zinc-200">{alert.suggestion}</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 flex flex-wrap items-center gap-2 sm:gap-3">
                     <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4f8ef7] hover:bg-[#3b7de6] text-white text-sm font-medium transition-colors">
                       <MessageSquare className="w-4 h-4" /> Ask BizIQ
                     </button>
                     <button 
                       onClick={() => markResolved(alert.id)}
                       className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm font-medium transition-colors"
                     >
                       <CheckSquare className="w-4 h-4" /> Mark resolved
                     </button>
                     <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-sm font-medium transition-colors">
                       <Clock className="w-4 h-4" /> Snooze
                     </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
