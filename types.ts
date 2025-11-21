export interface Student {
  id: string;
  name: string;
  grade: string;
  status: 'Active' | 'Inactive' | 'Probation';
  attendance: number;
  avatar: string;
}

export interface MonthlyStat {
  name: string;
  avgScore: number;
  attendance: number;
}

export interface DashboardStats {
  totalStudents: number;
  newAdmissions: number;
  totalTeachers: number;
  avgAttendance: number;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  STUDENTS = 'STUDENTS',
  SETTINGS = 'SETTINGS',
}