import {TokenUse} from '@app/_models/token_use';

export interface CourseRegistration {
  id: number;
  canvas_user_id: number;
  is_verified: boolean;
  is_blocked: boolean;
  verification_code: number;
  verification_attempts: number;
  course: number;
  user: number;
  token_uses: TokenUse[];
  total_tokens_received: number;
  available_tokens: number;
}
