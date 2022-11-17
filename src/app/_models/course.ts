import {CourseEvent, CourseRegistration, LeaderboardElement, UQJ} from '@app/_models'

export enum CourseRegistrationMode {
    OPEN = 'OPEN',
    CODE = 'CODE',
}

export interface Course {
    id: number;
    mock: boolean;
    name: string;
    url: string;
    token: string;
    allow_registration: boolean;
    visible_to_students: boolean;
    start_date: Date;
    end_date: Date;
    instructor: number;
    status: string;
    is_registered: boolean;
    events: CourseEvent[];
    token_use_options: unknown;
    question_set: unknown;
    uqjs: UQJ[];
    course_reg: CourseRegistration;
    leader_board: LeaderboardElement[];
    has_create_event_permission: boolean;
    description: string;
    registration_mode: CourseRegistrationMode;
}

export const STATUS = {
    active: 'In Session',
    pending: 'Pending',
    finished: 'Finished',
    blocked: 'Blocked',
}
