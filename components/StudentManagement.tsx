import React, { useState } from 'react';
import { Student } from '../types';
import { Search, Plus, Edit2, Trash2, X, Save, AlertCircle, Mail, User, GraduationCap, Activity } from 'lucide-react';

// Mock Data Initial State
const INITIAL_STUDENTS: Student[] = [
  { id: 'S001', name: 'Emma Watson', email: 'emma.w@school.edu', grade: '10-A', status: 'Active', attendance: 98, avatar: 'https://picsum.photos/200/200?random=1' },
  { id: 'S002', name: 'Liam Johnson', email: 'liam.j@school.edu', grade: '11-B', status: 'Active', attendance: 85, avatar: 'https://picsum.photos/200/200?random=2' },
  { id: 'S003', name: 'Sophia Davis', email: 'sophia.d@school.edu', grade: '9-C', status: 'Probation', attendance: 65, avatar: 'https://picsum.photos/200/200?random=3' },
  { id: 'S004', name: 'Noah Wilson', email: 'noah.w@school.edu', grade: '12-A', status: 'Inactive', attendance: 0, avatar: 'https://picsum.photos/200/200?random=4' },
  { id: 'S005', name: 'Olivia Brown', email: 'olivia.b@school.edu', grade: '10-A', status: 'Active', attendance: 92, avatar: 'https://picsum.photos/200/200?random=5' },
];

export const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Student>>({
    name: '',
    email: '',
    grade: '',
    status: 'Active',
    attendance: 100,
  });

  // Filter Students
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleOpenAdd = () => {
    setCurrentStudent(null);
    setFormData({ name: '', email: '', grade: '', status: 'Active', attendance: 100 });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setCurrentStudent(student);
    setFormData({ ...student });
    setIsFormOpen(true);
  };

  const handleOpenDelete = (student: Student) => {
    setCurrentStudent(student);
    setIsDeleteOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStudent) {
      // Edit
      setStudents(prev => prev.map(s => s.id === currentStudent.id ? { ...s, ...formData } as Student : s));
    } else {
      // Add
      const newStudent: Student = {
        id: `S${Math.floor(Math.random() * 10000)}`,
        avatar: `https://picsum.photos/200/200?random=${Math.random()}`,
        ...formData as Student
      };
      setStudents(prev => [newStudent, ...prev]);
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (currentStudent) {
      setStudents(prev => prev.filter(s => s.id !== currentStudent.id));
      setIsDeleteOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Tools */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
            <h2 className="text-xl font-bold text-slate-800">Student Directory</h2>
            <p className="text-slate-500 text-sm">Manage registrations and performance</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search by name or ID..." 
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
                <span>Add Student</span>
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="p-5 font-semibold">Student</th>
                    <th className="p-5 font-semibold">Contact</th>
                    <th className="p-5 font-semibold">Grade</th>
                    <th className="p-5 font-semibold">Status</th>
                    <th className="p-5 font-semibold">Attendance</th>
                    <th className="p-5 font-semibold text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                <tr key={student.id} className="group hover:bg-slate-50/80 transition-colors">
                    <td className="p-5">
                    <div className="flex items-center gap-4">
                        <img src={student.avatar} alt={student.name} className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-primary-100 transition-colors" />
                        <div>
                            <p className="font-semibold text-slate-800">{student.name}</p>
                            <p className="text-xs text-slate-500">ID: {student.id}</p>
                        </div>
                    </div>
                    </td>
                    <td className="p-5 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-slate-400" />
                            {student.email || 'N/A'}
                        </div>
                    </td>
                    <td className="p-5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                            {student.grade}
                        </span>
                    </td>
                    <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold 
                            ${student.status === 'Active' ? 'bg-green-50 text-green-600 border border-green-100' : 
                            student.status === 'Inactive' ? 'bg-slate-100 text-slate-500 border border-slate-200' : 
                            'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                                student.status === 'Active' ? 'bg-green-500' : 
                                student.status === 'Inactive' ? 'bg-slate-400' : 
                                'bg-amber-500'
                            }`}></span>
                            {student.status}
                        </span>
                    </td>
                    <td className="p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ${student.attendance >= 90 ? 'bg-primary-500' : student.attendance >= 75 ? 'bg-accent-400' : 'bg-red-500'}`} 
                                style={{ width: `${student.attendance}%` }}
                            ></div>
                            </div>
                            <span className="text-xs font-bold text-slate-700">{student.attendance}%</span>
                        </div>
                    </td>
                    <td className="p-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => handleOpenEdit(student)}
                                className="p-2 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm text-slate-400 hover:text-primary-600 rounded-lg transition-all"
                                title="Edit Student"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button 
                                onClick={() => handleOpenDelete(student)}
                                className="p-2 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm text-slate-400 hover:text-red-500 rounded-lg transition-all"
                                title="Delete Student"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </td>
                </tr>
                )) : (
                    <tr>
                        <td colSpan={6} className="p-12 text-center text-slate-400">
                            <div className="flex flex-col items-center gap-3">
                                <div className="p-4 bg-slate-50 rounded-full">
                                    <Search className="w-8 h-8 text-slate-300" />
                                </div>
                                <p>No students found matching "{searchTerm}"</p>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-xs text-slate-500">
            <span>Showing {filteredStudents.length} students</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
            </div>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-800">
                        {currentStudent ? 'Edit Student' : 'Add New Student'}
                    </h3>
                    <button onClick={() => setIsFormOpen(false)} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                                required
                                type="text" 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                                placeholder="e.g. John Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                                type="email" 
                                value={formData.email} 
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                                placeholder="e.g. john@school.edu"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Grade / Class</label>
                            <div className="relative">
                                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                    type="text" 
                                    value={formData.grade} 
                                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
                                    placeholder="e.g. 10-A"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</label>
                            <div className="relative">
                                <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select 
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none appearance-none transition-all"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Probation">Probation</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <span>Attendance (%)</span>
                            <span className="text-primary-600">{formData.attendance}%</span>
                        </label>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={formData.attendance}
                            onChange={(e) => setFormData({...formData, attendance: parseInt(e.target.value)})}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                        />
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
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Confirm Deletion</h3>
                    <p className="text-slate-500 text-sm mb-6">
                        Are you sure you want to delete <span className="font-semibold text-slate-700">{currentStudent?.name}</span>? This action cannot be undone.
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