import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, FileUp, MessageSquare, Bell, FileBarChart, User as UserIcon, Settings, LogOut, Database } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

export const DashboardLayout = () => {
  const { dashboardStyle, setDashboardStyle } = useTheme();
  const { user, logout } = useAuth();
  const { uploadSampleData, datasets } = useData();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Upload Data', path: '/upload', icon: FileUp },
    { name: 'AI Chat', path: '/chat', icon: MessageSquare },
    { name: 'Smart Alerts', path: '/alerts', icon: Bell },
    { name: 'Reports', path: '/reports', icon: FileBarChart },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#09090b] text-white pt-14">
      {/* Sidebar Navigation */}
      <aside className="w-64 flex-shrink-0 flex flex-col border-r border-white/10 bg-[#09090b] hidden md:flex">
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-2">Menu</div>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors",
                isActive 
                  ? "bg-gradient-to-r from-[#4f8ef7]/10 to-[#7c3aed]/10 text-[#4f8ef7] border border-[#4f8ef7]/20" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Theme Picker */}
        <div className="p-4 border-t border-white/10">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">UI Style</div>
          <div className="flex flex-col gap-2">
            {['glassmorphism', 'minimal-dark', 'bento'].map((style) => (
              <button
                key={style}
                onClick={() => setDashboardStyle(style)}
                className={cn(
                  "text-left text-sm px-3 py-2 rounded-lg transition-colors capitalize",
                  dashboardStyle === style 
                    ? "bg-white/10 text-white" 
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                )}
              >
                {style.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Topbar for Dashboard - Shortened height and populated */}
        <header className="h-14 flex-shrink-0 flex items-center justify-between px-6 border-b border-white/10 bg-[#09090b]/80 backdrop-blur-md relative z-20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-400">
              <span>{user?.company || 'Company'}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-white capitalize">{location.pathname.split('/').pop() || 'Dashboard'}</span>
            </div>
            {datasets.length === 0 && (
              <button 
                onClick={uploadSampleData}
                className="ml-4 px-3 py-1 rounded-full bg-[#4f8ef7]/10 text-[#4f8ef7] text-xs font-semibold border border-[#4f8ef7]/20 hover:bg-[#4f8ef7]/20 transition-all flex items-center gap-1.5"
              >
                <Database className="w-3 h-3" />
                Load Sample Data
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#2dd4bf] rounded-full border-2 border-[#09090b]"></span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#4f8ef7] to-[#7c3aed] cursor-pointer"
              >
                <span className="text-xs font-bold text-white">
                  {user?.name?.substring(0, 2).toUpperCase() || 'US'}
                </span>
              </button>
              
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-[#18181b] border border-white/10 shadow-xl overflow-hidden py-1 z-50"
                  >
                    <div className="px-4 py-2 border-b border-white/5 mb-1">
                      <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                      <p className="text-xs text-zinc-400 truncate">{user?.email || 'user@example.com'}</p>
                    </div>
                    <Link to="/profile" onClick={() => setShowProfileMenu(false)} className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2">
                       <UserIcon className="w-4 h-4" /> Profile
                    </Link>
                    <button className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white flex items-center gap-2">
                       <Settings className="w-4 h-4" /> Settings
                    </button>
                    <div className="border-t border-white/5 mt-1 pt-1">
                      <button onClick={() => { logout(); navigate('/'); }} className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-white/5 flex items-center gap-2">
                         <LogOut className="w-4 h-4" /> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Pages */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
