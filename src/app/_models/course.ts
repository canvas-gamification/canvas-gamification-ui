export interface Course {
  id: number;
  mock: boolean;
  name: string;
  url: string;
  course_id: number;
  token: string;
  allow_registration: boolean;
  visible_to_students: boolean;
  start_date: Date;
  end_date: Date;
  instructor: number;
  status: string;
  is_registered: boolean;
  token_use_options: any;
  question_set: any;
  events: Event[];
}

export const STATUS = {
  active: 'In Session',
  pending: 'Pending',
  finished: 'Finished',
  blocked: 'Blocked',
};

