export interface Question {
  title: string;
  text: string;
  max_submission_allowed: number;
  author: number;
  category: number;
  difficulty: string;
  is_verified: boolean;
}
