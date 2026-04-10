import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Building2, Mail, Folder, Database, ShieldCheck } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export default function Profile() {
  const { user } = useAuth();
  const { datasets } = useData();
  const { dashboardStyle } = useTheme();

  const getPanelClass = () => dashboardStyle === 'bento' ? 'bento-panel' : dashboardStyle === 'minimal-dark' ? 'minimal-dark-panel rounded-2xl' : 'glass-panel rounded-2xl';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <ShieldCheck className="w-3 h-3" />
          Verified Account
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User & Corp Details */}
        <div className={cn("md:col-span-1 p-6 flex flex-col items-center text-center", getPanelClass())}>
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#4f8ef7] to-[#7c3aed] flex items-center justify-center mb-4 shadow-xl shadow-[#4f8ef7]/20">
            <span className="text-3xl font-bold text-white">
              {user?.name?.substring(0, 2).toUpperCase() || 'US'}
            </span>
          </div>
          <h2 className="text-xl font-bold">{user?.name || 'User Name'}</h2>
          <p className="text-zinc-500 text-sm mb-6">{user?.company || 'Organization'}</p>
          
          <div className="w-full space-y-3 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <Mail className="w-4 h-4" />
              <span>{user?.email || 'user@example.com'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <Building2 className="w-4 h-4" />
              <span>{user?.company || 'Organization'}</span>
            </div>
          </div>
        </div>

        {/* Database Folders / Datasets */}
        <div className={cn("md:col-span-2 p-6", getPanelClass())}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Folder className="w-5 h-5 text-[#4f8ef7]" />
              Data Folders
            </h3>
            <span className="text-xs text-zinc-500 font-medium">{datasets.length} Active Datasets</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {datasets.length === 0 ? (
              <div className="col-span-full py-12 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
                <Database className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
                <p className="text-sm text-zinc-500">No databases uploaded yet.</p>
              </div>
            ) : (
              datasets.map((ds) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={ds.id} 
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#4f8ef7]/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Database className="w-5 h-5 text-[#4f8ef7] group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold text-zinc-600 uppercase">DB</span>
                  </div>
                  <h4 className="font-bold truncate">{ds.name}</h4>
                  <p className="text-[11px] text-zinc-500 mt-1">{ds.data.length} records analyzed</p>
                </motion.div>
              ))
            )}
          </div>
          
          <div className="mt-8 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
             <h4 className="text-sm font-semibold text-amber-500 mb-1 flex items-center gap-2">
               Owner Essential Details
             </h4>
             <p className="text-xs text-zinc-400 leading-relaxed font-mono">
               Role: Administrator<br/>
               API Tier: Pro Plan<br/>
               Last Activity: {new Date().toLocaleDateString()}<br/>
               Security Key: ****-****-****-8JAy
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
