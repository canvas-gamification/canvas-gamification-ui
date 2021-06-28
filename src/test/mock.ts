import {Category, Course, CourseEvent, STATUS} from "@app/_models";
import {MOCK_UQJS} from "@app/problems/_test/mock";

export const MOCK_CATEGORY: Category = {
    name: '',
    average_success: 0,
    description: '',
    next_category_ids: [],
    pk: 0,
    full_name: '',
    parent: 0,
    question_count: 100,
};

export const MOCK_COURSE_EVENT: CourseEvent = {
    id: 0,
    course: 0,
    name: '',
    is_exam: false,
    is_open: true,
    count_for_tokens: true,
    end_date: null,
    has_edit_permission: false,
    is_allowed_to_open: true,
    start_date: null,
    total_event_grade: 0,
    type: '',
};

export const MOCK_COURSE: Course = {
    id: 0,
    mock: null,
    name: 'Test Course',
    url: null,
    token: null,
    allow_registration: true,
    visible_to_students: true,
    start_date: null,
    end_date: null,
    instructor: null,
    status: STATUS.active,
    is_registered: true,
    events: [MOCK_COURSE_EVENT],
    token_use_options: null,
    question_set: null,
    uqjs: MOCK_UQJS,
    course_reg: null,
    leader_board: null
};
export const MOCK_CATEGORIES: Category[] = [MOCK_CATEGORY];

export const MOCK_COURSES: Course[] = [MOCK_COURSE];
