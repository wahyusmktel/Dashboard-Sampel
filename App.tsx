import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatsCard } from './components/StatsCard';
import { ChartWidget } from './components/ChartWidget';
import { StudentTable } from './components/StudentTable';
import { StudentManagement } from './components/StudentManagement';
import { CoursesManagement } from './components/CoursesManagement';
import { AiInsight } from './components/AiInsight';
import { ViewState, Student, MonthlyStat } from './types';
import { Users, UserPlus, GraduationCap, Percent, Menu, Search, Bell } from 'lucide-react';

// Mock Data for Dashboard
const MONTHLY_DATA: MonthlyStat[] = [
  { name: 'Jan', avgScore: 65, attendance: 85 },
  { name: 'Feb', avgScore: 68, attendance: 82 },
  { name: 'Mar', avgScore: 75, attendance: 88 },
  { name: 'Apr', avgScore: 72, attendance: 85 },
  { name: 'May', avgScore: 82, attendance: 92 },
  { name: 'Jun', avgScore: 85, attendance: 95 },
  { name: 'Jul', avgScore: 80, attendance: 80 }, // Summer dip
];

// Dashboard only Preview Data
const RECENT_STUDENTS: Student[] = [
  { id: 'S001', name: 'Emma Watson', grade: '10-A', status: 'Active', attendance: 98, avatar: 'https://picsum.photos/200/200?random=1' },
  { id: 'S002', name: 'Liam Johnson', grade: '11-B', status: 'Active', attendance: 85, avatar: 'https://picsum.photos/200/200?random=2' },
  { id: 'S003', name: 'Sophia Davis', grade: '9-C', status: 'Probation', attendance: 65, avatar: 'https://picsum.photos/200/200?random=3' },
  { id: 'S004', name: 'Noah Wilson', grade: '12-A', status: 'Inactive', attendance: 0, avatar: 'https://picsum.photos/200/200?random=4' },
  { id: 'S005', name: 'Olivia Brown', grade: '10-A', status: 'Active', attendance: 92, avatar: 'https://picsum.photos/200/200?random=5' },
];

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderDashboardContent = () => (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
              title="Total Students" 
              value="1,234" 
              change="12%" 
              isPositive={true} 
              icon={Users} 
              colorClass="bg-blue-600" // Maps to primary-600
          />
          <StatsCard 
              title="New Admissions" 
              value="145" 
              change="5%" 
              isPositive={true} 
              icon={UserPlus} 
              colorClass="bg-accent-400" // Yellow
          />
          <StatsCard 
              title="Graduation Rate" 
              value="94%" 
              change="1.2%" 
              isPositive={true} 
              icon={GraduationCap} 
              colorClass="bg-indigo-600" 
          />
          <StatsCard 
              title="Avg Attendance" 
              value="88%" 
              change="3%" 
              isPositive={false} 
              icon={Percent} 
              colorClass="bg-emerald-500" 
          />
      </div>

      {/* Mid Section: Chart + AI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
              <ChartWidget data={MONTHLY_DATA} />
          </div>
          <div className="lg:col-span-1 h-full">
                <div className="flex flex-col gap-6 h-full">
                  <AiInsight />
                  {/* Additional smaller widget or info block could go here */}
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white flex-1 relative overflow-hidden shadow-md">
                      <div className="relative z-10">
                          <h3 className="font-bold text-lg mb-2 text-accent-300">Upcoming Event</h3>
                          <p className="text-2xl font-bold mb-1">Science Fair 2024</p>
                          <p className="text-slate-400 text-sm mb-4">Friday, 24th October</p>
                          <button className="px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-bold hover:bg-accent-300 transition-colors">
                              View Details
                          </button>
                      </div>
                      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-300 rounded-full opacity-20 blur-2xl"></div>
                  </div>
                </div>
          </div>
      </div>

      {/* Student Table */}
      <StudentTable students={RECENT_STUDENTS} />
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        currentView={view}
        onChangeView={setView}
        onCloseMobile={() => setSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-8 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 lg:hidden text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">
              {view === ViewState.DASHBOARD ? 'Dashboard Overview' : 
               view === ViewState.STUDENTS ? 'Student Management' : 
               view === ViewState.COURSES ? 'Course Catalog' : 'Settings'}
            </h1>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="pl-10 pr-4 py-2 rounded-full bg-slate-50 border-none focus:ring-2 focus:ring-primary-500 w-64 text-sm transition-all"
                />
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          {view === ViewState.DASHBOARD && renderDashboardContent()}
          
          {view === ViewState.STUDENTS && (
             <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <StudentManagement />
             </div>
          )}

          {view === ViewState.COURSES && (
             <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CoursesManagement />
             </div>
          )}

          {view === ViewState.SETTINGS && (
             <div className="max-w-7xl mx-auto text-center py-20 text-slate-400">
                <p>Settings panel coming soon...</p>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;