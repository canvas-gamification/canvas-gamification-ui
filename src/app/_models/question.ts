import {Category} from '@app/_models/category';
import {Event} from '@app/_models/event';
import {User} from '@app/_models/user';

export interface Question {
  id: number;
  title: string;
  text: string;
  max_submission_allowed: number;
  author: number;
  difficulty: string;
  is_verified: boolean;
  time_created: Date;
  time_modified: Date;
  category: number;
  token_value: number;
  success_rate: number;
  type_name: string;
  event: number;
  is_sample: boolean;
  category_name: string;
  parent_category_name: string;
  course_name: string;
  event_name: string;
  author_name: string;
  choices: Map<string, string>;
}
