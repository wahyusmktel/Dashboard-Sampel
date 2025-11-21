import React, { useState } from 'react';
import { Course, CourseModule } from '../types';
import { Search, Plus, MoreVertical, Edit2, Trash2, X, Save, Users, Clock, BookOpen, AlertCircle, ArrowLeft, Star, PlayCircle, FileText, CheckCircle, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Layout, CheckSquare } from 'lucide-react';

const INITIAL_COURSES: Course[] = [
  { 
    id: 'C001', 
    title: 'Advanced Mathematics', 
    instructor: 'Dr. Sarah Smith', 
    enrolled: 45, 
    level: 'Advanced', 
    status: 'Published', 
    schedule: 'Mon, Wed 10:00 AM', 
    image: 'https://picsum.photos/400/250?random=10',
    rating: 4.8,
    description: 'A comprehensive deep dive into calculus, linear algebra, and statistical modeling designed for senior students preparing for university.',
    modules: [
      { 
          id: 'm1', 
          title: 'Limits and Derivatives', 
          duration: '45 min', 
          type: 'Video', 
          isCompleted: true,
          videoUrl: 'https://www.youtube.com/embed/E7G7k9R0tB4', // Dummy educational placeholder
          content: 'Introduction to the fundamental concepts of limits and how they relate to the slope of a curve.'
      },
      { 
          id: 'm2', 
          title: 'Integrals Application', 
          duration: '60 min', 
          type: 'Video',
          isCompleted: false,
          videoUrl: 'https://www.youtube.com/embed/3d6DsjIBzJ4',
          content: 'Using integrals to find areas under curves and volumes of revolution.'
      },
      { 
          id: 'm3', 
          title: 'Mid-term Assessment', 
          duration: '30 min', 
          type: 'Quiz',
          isCompleted: false,
          content: 'A 20-question multiple choice quiz covering limits and derivatives.'
      },
      { 
          id: 'm4', 
          title: 'Vector Spaces', 
          duration: '50 min', 
          type: 'Video',
          isCompleted: false,
          videoUrl: 'https://www.youtube.com/embed/fNk_zzaMoSs',
          content: 'Defining vector spaces, subspaces, and linear independence.'
      },
    ]
  },
  { 
    id: 'C002', 
    title: 'Introduction to Physics', 
    instructor: 'Prof. James Doe', 
    enrolled: 32, 
    level: 'Beginner', 
    status: 'Published', 
    schedule: 'Tue, Thu 09:00 AM', 
    image: 'https://picsum.photos/400/250?random=11',
    rating: 4.5,
    description: 'Explore the fundamental laws of motion, energy, and thermodynamics. This course includes practical lab simulations.',
    modules: [
      { id: 'm1', title: 'Newton\'s Laws', duration: '40 min', type: 'Video', isCompleted: false, videoUrl: 'https://www.youtube.com/embed/kKKM8Y-u7ds' },
      { id: 'm2', title: 'Energy Conservation', duration: '55 min', type: 'Video', isCompleted: false },
      { id: 'm3', title: 'Lab: Pendulum Motion', duration: '90 min', type: 'Assignment', isCompleted: false, content: 'Complete the virtual lab simulation and submit your report PDF.' },
    ]
  },
  { 
    id: 'C003', 
    title: 'Modern World History', 
    instructor: 'Mrs. Emily Brown', 
    enrolled: 28, 
    level: 'Intermediate', 
    status: 'Draft', 
    schedule: 'Fri 11:00 AM', 
    image: 'https://picsum.photos/400/250?random=12',
    rating: 4.2,
    description: 'An analysis of major global events from the 20th century to present day, focusing on geopolitical shifts and cultural evolution.',
    modules: []
  },
  { 
    id: 'C004', 
    title: 'Computer Science 101', 
    instructor: 'Mr. Alan Tech', 
    enrolled: 60, 
    level: 'Beginner', 
    status: 'Published', 
    schedule: 'Mon, Wed 02:00 PM', 
    image: 'https://picsum.photos/400/250?random=13',
    rating: 4.9,
    description: 'Start your coding journey here. We cover algorithms, data structures, and basic syntax using Python and JavaScript.',
    modules: [
        { id: 'm1', title: 'Setup Environment', duration: '15 min', type: 'Video', isCompleted: true },
        { id: 'm2', title: 'Variables & Loops', duration: '45 min', type: 'Video', isCompleted: false },
        { id: 'm3', title: 'First Project', duration: '2 hours', type: 'Assignment', isCompleted: false },
    ]
  },
  { 
    id: 'C005', 
    title: 'Creative Writing', 
    instructor: 'Ms. Lisa Art', 
    enrolled: 15, 
    level: 'Advanced', 
    status: 'Published', 
    schedule: 'Thu 01:00 PM', 
    image: 'https://picsum.photos/400/250?random=14',
    rating: 4.7,
    description: 'Unleash your creativity through poetry, short stories, and character development workshops.',
    modules: []
  },
];

export const CoursesManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeModule, setActiveModule] = useState<CourseModule | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum'>('overview');

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    instructor: '',
    level: 'Beginner',
    status: 'Draft',
    schedule: '',
    enrolled: 0,
    description: ''
  });

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -- Handlers --

  const handleOpenAdd = () => {
    setCurrentCourse(null);
    setFormData({ title: '', instructor: '', level: 'Beginner', status: 'Draft', schedule: '', enrolled: 0, description: '' });
    setIsFormOpen(true);
    setActiveMenuId(null);
  };

  const handleOpenEdit = (course: Course) => {
    setCurrentCourse(course);
    setFormData({ ...course });
    setIsFormOpen(true);
    setActiveMenuId(null);
  };

  const handleOpenDelete = (course: Course) => {
    setCurrentCourse(course);
    setIsDeleteOpen(true);
    setActiveMenuId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCourse) {
      setCourses(prev => prev.map(c => c.id === currentCourse.id ? { ...c, ...formData } as Course : c));
      // If currently viewing details of this course, update the view
      if (selectedCourse?.id === currentCourse.id) {
          setSelectedCourse({ ...selectedCourse, ...formData } as Course);
      }
    } else {
      const newCourse: Course = {
        id: `C${Math.floor(Math.random() * 10000)}`,
        image: `https://picsum.photos/400/250?random=${Math.random()}`,
        rating: 0,
        modules: [],
        ...formData as Course
      };
      setCourses(prev => [newCourse, ...prev]);
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (currentCourse) {
      setCourses(prev => prev.filter(c => c.id !== currentCourse.id));
      setIsDeleteOpen(false);
      if (selectedCourse?.id === currentCourse.id) {
          setSelectedCourse(null);
      }
    }
  };

  const handleModuleChange = (direction: 'next' | 'prev') => {
      if (!selectedCourse?.modules || !activeModule) return;
      const currentIndex = selectedCourse.modules.findIndex(m => m.id === activeModule.id);
      if (direction === 'next' && currentIndex < selectedCourse.modules.length - 1) {
          setActiveModule(selectedCourse.modules[currentIndex + 1]);
      } else if (direction === 'prev' && currentIndex > 0) {
          setActiveModule(selectedCourse.modules[currentIndex - 1]);
      }
  };

  // -- Render Views --

  const renderLessonView = (course: Course, module: CourseModule) => {
      const currentIndex = course.modules?.findIndex(m => m.id === module.id) || 0;
      const hasNext = course.modules && currentIndex < course.modules.length - 1;
      const hasPrev = currentIndex > 0;

      return (
        <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Lesson Header */}
            <div className="flex items-center justify-between mb-4 shrink-0">
                <button 
                    onClick={() => setActiveModule(null)}
                    className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-medium text-sm">Back to Course</span>
                </button>
                <div className="flex gap-2">
                    <button 
                        onClick={() => handleModuleChange('prev')}
                        disabled={!hasPrev}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium border border-slate-200 rounded-lg hover:bg-white hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white"
                    >
                        <ChevronLeft className="w-4 h-4" /> Previous
                    </button>
                    <button 
                        onClick={() => handleModuleChange('next')}
                        disabled={!hasNext}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium border border-slate-200 rounded-lg hover:bg-white hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white"
                    >
                        Next <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    {/* Player / Content Window */}
                    <div className="bg-slate-900 aspect-video w-full flex items-center justify-center relative">
                        {module.type === 'Video' && module.videoUrl ? (
                             <iframe 
                                src={module.videoUrl} 
                                title={module.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                             ></iframe>
                        ) : (
                            <div className="text-center p-8">
                                {module.type === 'Video' ? <PlayCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" /> : 
                                 module.type === 'Quiz' ? <CheckSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" /> :
                                 <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                }
                                <h3 className="text-slate-400 font-semibold text-lg">{module.type} Placeholder</h3>
                                <p className="text-slate-600 text-sm">Simulated Content Area</p>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="p-6 overflow-y-auto">
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide
                                ${module.type === 'Video' ? 'bg-blue-100 text-blue-700' : 
                                  module.type === 'Quiz' ? 'bg-purple-100 text-purple-700' : 
                                  'bg-amber-100 text-amber-700'}`}>
                                {module.type}
                            </span>
                            <h2 className="text-xl font-bold text-slate-800">{module.title}</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed">
                            {module.content || 'No additional notes provided for this lesson.'}
                        </p>
                    </div>
                </div>

                {/* Sidebar / Playlist */}
                <div className="w-full lg:w-80 shrink-0 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-800">Course Content</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-1/3"></div>
                            </div>
                            <span className="text-xs text-slate-500 font-medium">33% Complete</span>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {course.modules?.map((mod, idx) => (
                            <button 
                                key={mod.id}
                                onClick={() => setActiveModule(mod)}
                                className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all
                                    ${mod.id === module.id ? 'bg-primary-50 border-primary-100 ring-1 ring-primary-200' : 'hover:bg-slate-50 border border-transparent hover:border-slate-100'}
                                `}
                            >
                                <div className={`mt-0.5 shrink-0
                                     ${mod.isCompleted ? 'text-green-500' : 
                                       mod.id === module.id ? 'text-primary-500' : 'text-slate-300'}
                                `}>
                                    {mod.isCompleted ? <CheckCircle className="w-5 h-5 fill-green-100" /> : 
                                     mod.type === 'Video' ? <PlayCircle className="w-5 h-5" /> :
                                     <Layout className="w-5 h-5" />
                                    }
                                </div>
                                <div>
                                    <h4 className={`text-sm font-semibold ${mod.id === module.id ? 'text-primary-700' : 'text-slate-700'}`}>
                                        {idx + 1}. {mod.title}
                                    </h4>
                                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {mod.duration}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      );
  };

  const renderDetailView = (course: Course) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Breadcrumb / Back */}
        <button 
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors mb-2 group"
        >
            <div className="p-1 rounded-full bg-slate-100 group-hover:bg-primary-50">
                <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Back to Courses</span>
        </button>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="h-48 md:h-64 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent z-10"></div>
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md
                            ${course.status === 'Published' ? 'bg-green-500/30 border border-green-400/40' : 'bg-yellow-500/30 border border-yellow-400/40'}
                        `}>
                            {course.status}
                        </span>
                        <span className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                            <Star className="w-3 h-3 text-accent-400 fill-accent-400" />
                            {course.rating || 'N/A'}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
                    <div className="flex items-center gap-4 text-slate-200 text-sm">
                        <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {course.enrolled} Enrolled</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {course.schedule}</span>
                        <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {course.level}</span>
                    </div>
                </div>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-slate-100 px-6 flex gap-8">
                <button 
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'overview' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                    Overview
                </button>
                <button 
                    onClick={() => setActiveTab('curriculum')}
                    className={`py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'curriculum' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                    Curriculum ({course.modules?.length || 0})
                </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
                {activeTab === 'overview' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <section>
                                <h3 className="text-lg font-bold text-slate-800 mb-3">About this Course</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {course.description || "No description provided for this course yet."}
                                </p>
                            </section>
                            <section>
                                <h3 className="text-lg font-bold text-slate-800 mb-3">What you'll learn</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {['Understand core concepts', 'Practical application', 'Critical thinking', 'Industry standard tools'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-6 h-fit border border-slate-100">
                             <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Instructor</h4>
                             <div className="flex items-center gap-3 mb-4">
                                 <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                                    {course.instructor.charAt(0)}
                                 </div>
                                 <div>
                                     <p className="font-bold text-slate-800">{course.instructor}</p>
                                     <p className="text-xs text-slate-500">Senior Lecturer</p>
                                 </div>
                             </div>
                             <button className="w-full py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:text-primary-600 hover:border-primary-200 transition-all">
                                 View Profile
                             </button>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-3xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-800">Course Modules</h3>
                            <span className="text-sm text-slate-500">{course.modules?.length || 0} Total Lessons</span>
                        </div>
                        
                        <div className="space-y-3">
                            {course.modules && course.modules.length > 0 ? (
                                course.modules.map((mod, idx) => (
                                    <div 
                                        key={mod.id} 
                                        onClick={() => setActiveModule(mod)}
                                        className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-md hover:border-primary-100 transition-all group cursor-pointer"
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
                                            ${mod.isCompleted ? 'bg-green-100 text-green-600' : 'bg-white border border-slate-200 text-slate-400 group-hover:border-primary-200 group-hover:text-primary-600'}`}>
                                            {mod.isCompleted ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-slate-700 group-hover:text-primary-700 transition-colors">{mod.title}</h4>
                                            <p className="text-xs text-slate-500 mt-0.5">{mod.type}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-100">
                                            <Clock className="w-3 h-3" />
                                            {mod.duration}
                                        </div>
                                        <div className="p-2 text-slate-400 group-hover:text-primary-500">
                                            {mod.type === 'Video' ? <PlayCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                                    <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                    <p className="text-slate-500">No modules added yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );

  // -- Main Render Logic --

  if (activeModule && selectedCourse) {
      return renderLessonView(selectedCourse, activeModule);
  }

  if (selectedCourse) {
      return renderDetailView(selectedCourse);
  }

  // -- Render List View (Default) --

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
            <h2 className="text-xl font-bold text-slate-800">Courses & Curriculum</h2>
            <p className="text-slate-500 text-sm">Manage active courses and schedules</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative group flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search courses..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none w-full sm:w-64 transition-all"
                />
            </div>
            <button 
                onClick={handleOpenAdd}
                className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg shadow-lg shadow-primary-600/30 transition-all transform hover:-translate-y-0.5 font-medium"
            >
                <Plus className="w-4 h-4" />
                <span>New Course</span>
            </button>
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative">
                    {/* Image Area */}
                    <div className="h-48 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-4 right-4 z-20">
                             <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md
                                ${course.status === 'Published' ? 'bg-green-500/20 text-green-50 border border-green-400/30' : 'bg-yellow-500/20 text-yellow-50 border border-yellow-400/30'}
                             `}>
                                {course.status}
                             </span>
                        </div>
                        <div className="absolute bottom-4 left-4 z-20">
                            <span className="text-white font-bold text-lg drop-shadow-md line-clamp-1">{course.title}</span>
                            <p className="text-slate-200 text-xs flex items-center gap-1 mt-1">
                                <Users className="w-3 h-3" /> {course.enrolled} Students Enrolled
                            </p>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Instructor</p>
                                <p className="text-slate-800 font-medium">{course.instructor}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Level</p>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium 
                                    ${course.level === 'Beginner' ? 'bg-blue-50 text-blue-600' : 
                                      course.level === 'Intermediate' ? 'bg-purple-50 text-purple-600' : 
                                      'bg-orange-50 text-orange-600'}`}>
                                    {course.level}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-6 bg-slate-50 p-2 rounded-lg">
                            <Clock className="w-4 h-4 text-primary-500" />
                            <span>{course.schedule}</span>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-slate-100 relative">
                            <button 
                                onClick={() => setSelectedCourse(course)}
                                className="flex-1 py-2 text-sm font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                            >
                                View Details
                            </button>
                            <div className="relative">
                                <button 
                                    onClick={() => setActiveMenuId(activeMenuId === course.id ? null : course.id)}
                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                                >
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                                {/* Dropdown Menu */}
                                {activeMenuId === course.id && (
                                    <div className="absolute bottom-full right-0 mb-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-30 animate-in fade-in zoom-in-95 duration-200">
                                        <button 
                                            onClick={() => handleOpenEdit(course)}
                                            className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary-600 flex items-center gap-2"
                                        >
                                            <Edit2 className="w-4 h-4" /> Edit
                                        </button>
                                        <button 
                                            onClick={() => handleOpenDelete(course)}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                        >
                                            <Trash2 className="w-4 h-4" /> Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-slate-100 border-dashed">
             <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
             <h3 className="text-lg font-semibold text-slate-700">No courses found</h3>
             <p className="text-slate-500 max-w-sm mx-auto mt-2">We couldn't find any courses matching "{searchTerm}". Try a different keyword or add a new course.</p>
        </div>
      )}

       {/* ADD / EDIT MODAL */}
       {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-800">
                        {currentCourse ? 'Edit Course' : 'Create New Course'}
                    </h3>
                    <button onClick={() => setIsFormOpen(false)} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Course Title</label>
                        <input 
                            required
                            type="text" 
                            value={formData.title} 
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                            placeholder="e.g. Introduction to Psychology"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</label>
                        <textarea 
                            value={formData.description} 
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all min-h-[80px]"
                            placeholder="Course summary..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Instructor Name</label>
                            <input 
                                required
                                type="text" 
                                value={formData.instructor} 
                                onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                                placeholder="e.g. Dr. John Doe"
                            />
                        </div>
                        <div className="space-y-1.5">
                             <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Schedule</label>
                            <input 
                                type="text" 
                                value={formData.schedule} 
                                onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                                placeholder="e.g. Mon 10:00 AM"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                         <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Level</label>
                            <select 
                                value={formData.level}
                                onChange={(e) => setFormData({...formData, level: e.target.value as any})}
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all text-sm"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</label>
                            <select 
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all text-sm"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Enrolled</label>
                            <input 
                                type="number" 
                                min="0"
                                value={formData.enrolled} 
                                onChange={(e) => setFormData({...formData, enrolled: parseInt(e.target.value)})}
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button 
                            type="button"
                            onClick={() => setIsFormOpen(false)}
                            className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium shadow-lg shadow-primary-600/20 transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Save Course
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Remove Course?</h3>
                    <p className="text-slate-500 text-sm mb-6">
                        Are you sure you want to delete <span className="font-semibold text-slate-700">{currentCourse?.title}</span>? 
                        All associated materials and student enrollments will be unlinked.
                    </p>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setIsDeleteOpen(false)}
                            className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium shadow-lg shadow-red-500/30 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};