import React from 'react';
import { LayoutDashboard, Users, BookOpen, Calendar, Settings, LogOut, GraduationCap } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  isOpen: boolean;
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentView, onChangeView, onCloseMobile }) => {
  const menuItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.STUDENTS, label: 'Students', icon: Users },
    { id: 'COURSES', label: 'Courses', icon: BookOpen }, // Placeholder ID
    { id: 'SCHEDULE', label: 'Schedule', icon: Calendar }, // Placeholder ID
    { id: ViewState.SETTINGS, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onCloseMobile}
      />

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 
          bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 
          text-white transition-transform duration-300 transform 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          shadow-2xl flex flex-col
        `}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-300 rounded-lg shadow-lg shadow-yellow-500/20">
              <GraduationCap className="w-6 h-6 text-primary-900" />
            </div>
            <span className="text-xl font-bold tracking-tight">Edu<span className="text-accent-300">Dash</span></span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                   // Only switch if it's a valid view state for this demo
                   if(item.id === ViewState.DASHBOARD || item.id === ViewState.STUDENTS || item.id === ViewState.SETTINGS) {
                       onChangeView(item.id as ViewState);
                   }
                   onCloseMobile();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-white/10 text-accent-300 shadow-lg backdrop-blur-sm font-semibold' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-accent-300' : 'text-slate-400 group-hover:text-white'}`} />
                <span>{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-300 shadow-[0_0_8px_rgba(253,224,71,0.6)]" />}
              </button>
            );
          })}
        </nav>

        {/* User Profile Snippet */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/20 backdrop-blur-sm">
            <img src="https://picsum.photos/100/100" alt="Admin" className="w-10 h-10 rounded-full border-2 border-accent-300" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Alex Morgan</p>
              <p className="text-xs text-slate-400 truncate">Administrator</p>
            </div>
            <LogOut className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </aside>
    </>
  );
};