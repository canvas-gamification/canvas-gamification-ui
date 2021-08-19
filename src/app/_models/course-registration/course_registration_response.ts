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
}

export interface CourseDashboardRegistrationResponse extends APIResponse {
    id?: number;
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    token?: string;
    tokens?: number;
    role?: string;
    is_teacher?: boolean;
    is_student?: boolean;
    has_consent?: boolean;
}
