export interface CourseRegistration {
  id: number;
  canvas_user_id: number;
  is_verified: boolean;
  is_blocked: boolean;
  verification_code: number;
  verification_attempts: number;
  course: number;
  user: number;
}
