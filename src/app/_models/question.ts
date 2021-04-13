import {CourseEvent} from '@app/_models/course_event';

export interface Question {
  id: number;
  title: string;
  text: string;
  max_submission_allowed: number;
  author: number;
  category: number;
  difficulty: string;
  is_verified: boolean;
  time_created: Date;
  time_modified: Date;
  token_value: number;
  success_rate: number;
  type_name: string;
  event: CourseEvent;
  is_sample: boolean;
  category_name: string;
  parent_category_name: string;
  course_name: string;
  event_name: string;
  author_name: string;
  choices: any;
  variables: [];
  input_file_names: [];
  answer: any;
  junit_template: string;
  lines: any[];
  additional_file_name: any;
  status: string;
  is_open: boolean;
  is_exam: boolean;
  is_exam_and_open: boolean;
}
