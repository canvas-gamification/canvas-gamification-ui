import {APIResponse} from '@app/_models';

export interface CourseRegistrationResponse extends APIResponse {
    name?: string;
    guessed_name?: string;
    confirmed_name?: string;
    student_number?: number;
    code?: number;
    attempts_remaining?: number;
}

export interface CourseRegistrationRequest {
    name?: string;
    confirmed_name?: string;
    student_number?: number | string;
    code?: number;
    student_username?: string;
}
