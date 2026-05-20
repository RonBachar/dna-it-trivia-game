export type Question = {
  id: string;
  prompt: string;
  options: string[];
  correct_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Participant = {
  id: string;
  full_name: string;
  company: string;
  normalized_full_name: string;
  normalized_company: string;
  participant_key: string;
  quiz_question_ids: string[];
  started_at: string;
  finished_at: string | null;
  score: number;
  duration_ms: number | null;
  created_at: string;
};

export type Answer = {
  id: string;
  participant_id: string;
  question_id: string;
  selected_index: number | null;
  is_correct: boolean;
  answered_at: string;
};

export type Database = {
  public: {
    Tables: {
      questions: {
        Row: Question;
        Insert: Omit<Question, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Question>;
        Relationships: [];
      };
      participants: {
        Row: Participant;
        Insert: Omit<Participant, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Participant>;
        Relationships: [];
      };
      answers: {
        Row: Answer;
        Insert: Omit<Answer, "id" | "answered_at"> & {
          id?: string;
          answered_at?: string;
        };
        Update: Partial<Answer>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
