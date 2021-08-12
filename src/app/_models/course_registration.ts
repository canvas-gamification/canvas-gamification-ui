import {TokenUse} from '@app/_models/token_use';

export interface CourseRegistration {
    id: number;
    canvas_user_id: number;
    is_verified: boolean;
    is_blocked: boolean;
    token_uses: TokenUse[];
    total_tokens_received: number;
    available_tokens: number;
    user_id : number;
}
