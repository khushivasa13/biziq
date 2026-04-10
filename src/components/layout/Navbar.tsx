import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Database } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/10 py-3 shadow-sm'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4f8ef7] to-[#7c3aed] flex items-center justify-center p-[2px]">
            <div className="w-full h-full bg-white dark:bg-[#09090b] rounded-lg flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
              <Database className="w-5 h-5 text-[#4f8ef7] group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight">BizIQ</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/#features" className="text-zinc-600 dark:text-zinc-300 hover:text-[#4f8ef7] transition-colors">Features</Link>
          <Link to="/dashboard" className="text-zinc-600 dark:text-zinc-300 hover:text-[#4f8ef7] transition-colors">Dashboard</Link>
          
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-zinc-200 dark:border-white/10">
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {location.pathname !== '/auth' && (
              <>
                <Link
                  to="/auth"
                  className="hidden lg:block text-zinc-600 dark:text-zinc-300 hover:text-[#4f8ef7] transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4f8ef7] to-[#7c3aed] text-white font-semibold hover:opacity-90 transition-opacity shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -mr-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-[#09090b] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/#features" className="text-lg py-2">Features</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/dashboard" className="text-lg py-2">Dashboard</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/auth" className="text-lg py-2">Login</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/auth" className="mt-2 text-center text-lg px-5 py-3 rounded-xl bg-gradient-to-r from-[#4f8ef7] to-[#7c3aed] text-white font-medium">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
