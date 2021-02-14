export interface CanvasCourse {
  mock: boolean;
  name: string;
  url: URL;
  course_id: number;
  token: string;
  instructor_id: number;
  allow_registration: boolean;
  visible_to_students: boolean;
  start_date: Date;
  end_date: Date;
  verification_assignment_group_name: string;
  verification_assignment_group_id: number;
  verification_assignment_name: string;
  verification_assignment_id : number;
  bonus_assignment_group_name : string;
  bonus_assignment_group_id : number;
}
