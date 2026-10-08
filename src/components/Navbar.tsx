import React from 'react';
import { Home, Dumbbell, Calendar, Flame, Activity } from 'lucide-react';
import { ViewMode } from '../types/exercise';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  workoutPlanCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  workoutPlanCount,
}) => {
  const navItems = [
    { key: 'home' as ViewMode, label: 'Home', icon: Home },
    { key: 'exercises' as ViewMode, label: 'Exercises', icon: Dumbbell },
    { key: 'builder' as ViewMode, label: 'Planner', icon: Calendar, badge: workoutPlanCount },
    { key: 'heatmap' as ViewMode, label: 'Heatmap', icon: Flame },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-[#0B0F14]/90 backdrop-blur-md border-b border-[#1A2330]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF334B] to-[#F97316] flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,51,75,0.4)]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-white group-hover:text-[#FF334B] transition-colors">
                  YOUCAN
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded bg-[#1A2433] text-cyan-400 border border-[#24344A]">
                  VISUALIZER
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-none">
                Biomechanical Muscle Atlas
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#101620] p-1 rounded-xl border border-[#1E2838]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentView === item.key ||
                (item.key === 'exercises' && currentView === 'detail');

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onNavigate(item.key)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FF334B] text-white shadow-[0_0_12px_rgba(255,51,75,0.35)]'
                      : 'text-slate-400 hover:text-white hover:bg-[#16202E]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? 'bg-black/30 text-white'
                          : 'bg-[#1C2736] text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0B0F14]/95 backdrop-blur-lg border-t border-[#1C2534] px-2 py-2">
        <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentView === item.key ||
              (item.key === 'exercises' && currentView === 'detail');

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onNavigate(item.key)}
                className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all cursor-pointer relative ${
                  isActive
                    ? 'text-[#FF334B]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-[10px] font-medium tracking-tight">
                  {item.label}
                </span>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute top-1 right-5 w-4 h-4 rounded-full bg-[#10B981] text-slate-950 font-bold text-[9px] flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
