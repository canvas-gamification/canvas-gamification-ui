import {TokenUse} from '@app/_models/token_use';

export interface CourseRegistration {
    id: number;
    canvas_user_id: number;
    status: string;
    token_uses: TokenUse[];
    total_tokens_received: number;
    available_tokens: number;
    user_id? : number;
    username?: string;
    name?: string;
}

export interface CourseRegistrationData {
    id?: number;
    status?: string;
    username?: string;
}
