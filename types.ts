export interface Student {
  id: string;
  name: string;
  grade: string;
  status: 'Active' | 'Inactive' | 'Probation';
  attendance: number;
  avatar: string;
  email?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  type: 'Video' | 'Quiz' | 'Assignment';
  videoUrl?: string;
  content?: string;
  isCompleted?: boolean;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  enrolled: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Published' | 'Draft';
  schedule: string;
  image: string;
  description?: string;
  rating?: number;
  modules?: CourseModule[];
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
  COURSES = 'COURSES',
  SETTINGS = 'SETTINGS',
}