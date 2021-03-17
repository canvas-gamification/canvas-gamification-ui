import {TokenUse} from '@app/_models/token_use';

export interface CourseRegistration {
  id: number;
  canvas_user_id: number;
  is_verified: boolean;
  is_blocked: boolean;
  token_uses: TokenUse[];
  // TODO: Check the difference here has repurcussions for token-use-options
  // What is the difference between these two? Is available the remaining?
  total_tokens_received: number;
  available_tokens: number;
}
