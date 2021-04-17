import {CourseEvent, CourseRegistration, UQJ} from '@app/_models';

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
    token_use_options: any;
    question_set: any;
    uqjs: UQJ[];
    course_reg: CourseRegistration;
    leader_board: [{
        name: string,
        token: number,
    }];
}

export const STATUS = {
    active: 'In Session',
    pending: 'Pending',
    finished: 'Finished',
    blocked: 'Blocked',
};

