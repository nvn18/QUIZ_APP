import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Question {
  id: string;
  question_text: string;
  category: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: 'A' | 'B' | 'C' | 'D';
}

export interface QuizAttempt {
  id?: string;
  user_name: string;
  passkey: string;
  photo_url?: string;
  score: number;
  total_questions: number;
  answers: Array<{ question_id: string; selected_answer: string }>;
  violations: string[];
  time_taken: number;
  completed_at?: string;
}

export interface Feedback {
  quiz_attempt_id: string;
  rating: number;
  comment: string;
}
