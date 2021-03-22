import {APIResponse} from '@app/_models';

export interface CourseRegistrationResponse extends APIResponse {
    guessed_name?: string;
    attempts_remaining?: number;
}
