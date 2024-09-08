export type ActiveSection = 'About' | 'Hero' | 'Features' | 'Blog' | 'Support';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Job {
  id: number;
  user: number;
  title: string;
  company: string;
  link?: string;
  applied: boolean;
  pay?: number;
  date_applied?: string;
  description: string;
  status: 'Offer' | 'Rejected' | 'Interviewing' | 'Waiting';
  notes: string;
}

interface Interview {
  id: number;
  user: number;
  job: number;
  type: string;
  round: string;
  interviewer: string;
  status: 'Upcoming' | 'Past';
  date: string;
  questions_answers?: string;
  final_questions?: string;
  notes?: string;
}

export interface Connection {
  id: number;
  user: number;
  name: string;
  company: string;
  connected: boolean;
  talked: boolean;
  referral: boolean;
  link: string;
  notes: string;
}

// export interface ConnectionsState {
//   connections: Connection[];
//   totalCount: number;
//   currentPage: number;
//   pageSize: number;
// }

export interface SortOption {
  field: keyof Connection;
  direction: 'asc' | 'desc';
}
