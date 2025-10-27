export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  department?: string;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const DEPARTMENTS: Department[] = [
  { id: 'mathematics', name: 'Mathematics', icon: 'Calculator', color: 'from-blue-500 to-cyan-500' },
  { id: 'science', name: 'Science', icon: 'Atom', color: 'from-green-500 to-emerald-500' },
  { id: 'english', name: 'English', icon: 'BookOpen', color: 'from-orange-500 to-amber-500' },
  { id: 'history', name: 'History', icon: 'Scroll', color: 'from-red-500 to-rose-500' },
  { id: 'geography', name: 'Geography', icon: 'Globe', color: 'from-teal-500 to-cyan-500' },
  { id: 'physics', name: 'Physics', icon: 'Zap', color: 'from-yellow-500 to-orange-500' },
  { id: 'chemistry', name: 'Chemistry', icon: 'Flask', color: 'from-pink-500 to-fuchsia-500' },
  { id: 'biology', name: 'Biology', icon: 'Leaf', color: 'from-lime-500 to-green-500' },
  { id: 'computer', name: 'Computer Science', icon: 'Code', color: 'from-violet-500 to-purple-500' },
  { id: 'arts', name: 'Arts', icon: 'Palette', color: 'from-rose-500 to-pink-500' },
];
