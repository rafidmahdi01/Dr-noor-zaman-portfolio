export interface Supervision {
  studentName?: string;
  name?: string;
  level: 'phd' | 'masters' | 'undergraduate' | 'PhD/Doctoral' | 'Master' | string;
  topic?: string;
  thesis?: string;
  year: string;
  status: 'ongoing' | 'completed';
  role?: string;
}
