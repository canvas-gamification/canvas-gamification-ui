export interface MultipleChoiceQuestion {
  title: string;
  text: string;
  answer: string;
  max_submission_allowed: number;
  author: number;
  category: number;
  difficulty: string;
  in_verified: boolean;
  choices: object;
  visible_distractor_count: number;
}
