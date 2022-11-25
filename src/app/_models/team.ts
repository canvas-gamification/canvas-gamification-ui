import {CourseEvent, CourseRegistration} from "@app/_models/index"

export interface Team {
    id: number;
    time_created: Date;
    time_modified: Date;
    name: string;
    is_private: boolean;
    who_can_join: CourseRegistration[];
    event: CourseEvent;
    course_registrations: CourseRegistration[];
    score: number;
}
