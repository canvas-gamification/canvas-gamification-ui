import {
    Course,
    CourseRegistration,
    CourseRegistrationRequest,
    CourseRegistrationResponse,
    EventType, REGISTRATION_STATUS, RegistrationStatus, STATUS,
    TokenUseOption
} from "@app/_models";
import {TokenUse} from "@app/_models/token_use";
import {MOCK_COURSE_EVENT} from "@app/problems/_test/mock";

export const MOCK_TOKEN_USE_OPTION1: TokenUseOption = {
    id: 1,
    tokens_required: 1,
    points_given: 1,
    maximum_number_of_use: 1,
    assignment_name: 'test',
    assignment_id: 1,
    course: 1
};

export const MOCK_TOKEN_USE_OPTION2: TokenUseOption = {
    id: 2,
    tokens_required: 1,
    points_given: 1,
    maximum_number_of_use: 1,
    assignment_name: 'test',
    assignment_id: 1,
    course: 1
};

export const MOCK_TOKEN_USE1: TokenUse = {
    option: MOCK_TOKEN_USE_OPTION1,
    num_used: 1
};


export const MOCK_TOKEN_USE2: TokenUse = {
    option: MOCK_TOKEN_USE_OPTION2,
    num_used: 0
};

export const MOCK_COURSE_REGISTRATION: CourseRegistration = {
    id: 1,
    available_tokens: 100,
    canvas_user_id: 1,
    is_blocked: false,
    is_verified: true,
    token_uses: [MOCK_TOKEN_USE1, MOCK_TOKEN_USE2],
    total_tokens_received: 50
};

export const MOCK_EVENT_TYPES: EventType[] = [["PRACTICE", "PRACTICE"], ["ASSIGNMENT", "ASSIGNMENT"], ["EXAM", "EXAM"]];

export const MOCK_USER_STATS: { success_rate: number } = {
    success_rate: 0.5
};

export const MOCK_COURSE_REGISTRATION_REQUEST: CourseRegistrationRequest = {
    name: 'Test Student',
    confirmed_name: 'Test Student',
    student_number: 123,
    code: 111
};

export const MOCK_COURSE_REGISTRATION_RESPONSE: CourseRegistrationResponse = {
    success: true,
    name: 'Test Student',
    guessed_name: 'Test Student',
    confirmed_name: 'Test Student',
    student_number: 123,
    code: 111,
    attempts_remaining: 2,
};

export const MOCK_REGISTRATION_STATUS: RegistrationStatus = {
    status: REGISTRATION_STATUS.REGISTERED,
    message: null
};

export const MOCK_COURSE1: Course = {
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
    uqjs: null,
    course_reg: null,
    leader_board: null
};

export const MOCK_COURSE2: Course = {
    id: 1,
    mock: null,
    name: 'Test Course 2',
    url: null,
    token: null,
    allow_registration: true,
    visible_to_students: true,
    start_date: null,
    end_date: null,
    instructor: null,
    status: STATUS.active,
    is_registered: true,
    events: null,
    token_use_options: null,
    question_set: null,
    uqjs: null,
    course_reg: null,
    leader_board: null
};

export const MOCK_COURSES: Course[] = [MOCK_COURSE1, MOCK_COURSE2];

export const MOCK_IDENTIFICATION_STEP1: CourseRegistrationRequest = {
    name: "Firstname Lastname"
};

export const MOCK_IDENTIFICATION_STEP2: CourseRegistrationRequest = {
    name: "Multiple Student"
};

export const MOCK_CONFIRM_STEP1: CourseRegistrationRequest = {
    name: "Firstname Lastname",
    confirmed_name: "Firstname Lastname"
};

export const MOCK_VERIFY_STEP1: CourseRegistrationRequest = {
    name: "Firstname Lastname",
    code: 52
};

export const MOCK_VERIFY_STEP1FAIL: CourseRegistrationRequest = {
    name: "Firstname Lastname",
    code: 0
};

export const MOCK_VERIFY_SUCCESS: CourseRegistrationResponse = {
    attempts_remaining: 2,
    success: true
};

export const MOCK_VERIFY_FAIL: CourseRegistrationResponse = {
    attempts_remaining: 2,
    success: false
};
