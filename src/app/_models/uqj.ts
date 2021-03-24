import {Question, Category} from '@app/_models';


export interface UQJ {
  id: number;
  random_seed: number;
  last_viewed: Date;
  opened_tutorial: boolean;
  tokens_received: number;
  is_solved: boolean;
  is_partially_solved: boolean;
  question: Question;
  num_attempts: number;
  format: string;
  category: Category;
  subcategory: string;
  status: string;
  formatted_current_tokens_received: string;
}
