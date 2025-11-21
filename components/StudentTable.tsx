import React from 'react';
import { Student } from '../types';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';

interface StudentTableProps {
  students: Student[];
}

export const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800">Recent Registrations</h3>
        <button className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Student Name</th>
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Grade</th>
              <th className="p-4 font-semibold">Attendance</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                    <span className="font-medium text-slate-700">{student.name}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-500 text-sm">#{student.id}</td>
                <td className="p-4 text-slate-500 text-sm">{student.grade}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${student.attendance >= 90 ? 'bg-green-500' : student.attendance >= 75 ? 'bg-yellow-400' : 'bg-red-500'}`} 
                        style={{ width: `${student.attendance}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-slate-600">{student.attendance}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                    ${student.status === 'Active' ? 'bg-green-100 text-green-600' : 
                      student.status === 'Inactive' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {student.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-primary-50 text-slate-400 hover:text-primary-600 rounded-lg transition-colors">
                        <Edit2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                        <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};