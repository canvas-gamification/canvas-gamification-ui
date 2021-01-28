import {Question} from '@app/_models/question';

export interface UQJ {
  id: number;
  random_seed: number;
  last_viewed: Date;
  opened_tutorial: boolean;
  tokens_received: number;
  is_solved: boolean;
  is_partially_solved: boolean;
  question: Question;
}
