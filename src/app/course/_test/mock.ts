import {
    Course,
    CourseRegistration,
    CourseRegistrationRequest,
    CourseRegistrationResponse,
    EventType, Question, REGISTRATION_STATUS, RegistrationStatus, STATUS,
    TokenUseOption, UQJ, User
} from "@app/_models";
import {TokenUse} from "@app/_models/token_use";
import {MOCK_CATEGORY, MOCK_COURSE_EVENT} from "@app/problems/_test/mock";

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
    leader_board: null,
    has_create_event_permission: true
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
    is_registered: false,
    events: null,
    token_use_options: null,
    question_set: null,
    uqjs: null,
    course_reg: null,
    leader_board: null,
    has_create_event_permission: true
};

export const MOCK_COURSES: Course[] = [MOCK_COURSE1, MOCK_COURSE2];

export const MOCK_COURSE_REGISTRATION_RESPONSE: CourseRegistrationResponse = {
    success: true,
    name: 'Test Student',
    guessed_name: 'Test Student',
    confirmed_name: 'Test Student',
    student_number: 123,
    code: 111,
    attempts_remaining: 2,
};

//Data for case where there is only one student
export const MOCK_IDENTIFICATION_STEP1: CourseRegistrationRequest = {
    name: "Firstname Lastname"
};

export const MOCK_IDENTIFICATION_RESPONSE1: CourseRegistrationResponse = {
    success: true,
    guessed_name: 'Firstname Lastname',
};
export const MOCK_CONFIRM_STEP1: CourseRegistrationRequest = {
    name: "Firstname Lastname",
    confirmed_name: "Firstname Lastname"
};
export const MOCK_CONFIRM_RESPONSE1: CourseRegistrationResponse = {
    success: true,
};

export const MOCK_VERIFY_STEP1: CourseRegistrationRequest = {
    name: "Firstname Lastname",
    code: 52
};

export const MOCK_VERIFY_STEP1_FAIL: CourseRegistrationRequest = {
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

//Data for case where multiple students have same name
export const MOCK_IDENTIFICATION_STEP2: CourseRegistrationRequest = {
    name: "Multiple Student"
};

export const MOCK_IDENTIFICATION_RESPONSE2: CourseRegistrationResponse = {
    success: false,
    guessed_name: null,
};
export const MOCK_CONFIRM_STEP2_SUCCESS: CourseRegistrationRequest = {
    name: "Multiple Student",
    student_number: "12345678"
};
export const MOCK_CONFIRM_RESPONSE2_SUCCESS: CourseRegistrationResponse = {
    success: true,
};
export const MOCK_CONFIRM_STEP2_FAIL: CourseRegistrationRequest = {
    name: "Multiple Student",
    student_number: "0"
};
export const MOCK_CONFIRM_RESPONSE2_FAIL: CourseRegistrationResponse = {
    success: false,
    bad_request: true
};

export const MOCK_USER_STUDENT: User = {
    id: 0,
    username: 'student@test.com',
    first_name: 'Firstname',
    last_name: 'Lastname',
    email: 'student@test.com',
    token: null,
    tokens: 0,
    role: 'student',
    is_teacher: false,
    is_student: true,
    has_consent: true
};

export const MOCK_USER_TEACHER: User = {
    id: 1,
    username: 'teacher@test.com',
    first_name: 'FirstnameTeach',
    last_name: 'LastnameTeach',
    email: 'teacher@test.com',
    token: null,
    tokens: 0,
    role: 'teacher',
    is_teacher: true,
    is_student: false,
    has_consent: true
};

export const MOCK_MCQ_QUESTION: Question = {
    id: 0,
    category: 0,
    category_obj: MOCK_CATEGORY,
    status: 'Solved',
    answer: 'a',
    author: 0,
    author_name: '',
    choices: {
        'a': 'sag',
        'b': 'gav'
    },
    course_name: '',
    difficulty: '',
    event: MOCK_COURSE_EVENT.id,
    event_obj: MOCK_COURSE_EVENT,
    is_exam: true,
    is_exam_and_open: true,
    is_open: true,
    is_sample: false,
    is_verified: true,
    junit_template: '',
    variables: [],
    max_submission_allowed: 5,
    parent_category_name: '',
    success_rate: 0,
    text: '',
    time_created: null,
    time_modified: null,
    title: '',
    token_value: 5,
    type_name: 'multiple choice question',
    visible_distractor_count: 1,
    is_author: true,
    is_checkbox: false,
    input_files: null,
};

export const MOCK_UQJ: UQJ = {
    category: MOCK_CATEGORY,
    id: 0,
    question: MOCK_MCQ_QUESTION,
    format: '',
    formatted_current_tokens_received: '',
    input_files: [],
    is_allowed_to_submit: true,
    is_partially_solved: false,
    is_solved: true,
    last_viewed: null,
    num_attempts: 5,
    opened_tutorial: false,
    random_seed: 0,
    rendered_choices: {
        'a': 'sag',
        'b': 'gav'
    },
    rendered_lines: [],
    rendered_text: '',
    status: '',
    status_class: '',
    subcategory: '',
    tokens_received: 50,
    variables: JSON.parse('{}'),
    variables_errors: [],
    is_checkbox: false,
};

export const MOCK_UQJ2: UQJ = {
    category: MOCK_CATEGORY,
    id: 0,
    question: MOCK_MCQ_QUESTION,
    format: '',
    formatted_current_tokens_received: '',
    input_files: [],
    is_allowed_to_submit: true,
    is_partially_solved: false,
    is_solved: true,
    last_viewed: null,
    num_attempts: 0,
    opened_tutorial: false,
    random_seed: 0,
    rendered_choices: {
        'a': 'sag',
        'b': 'gav'
    },
    rendered_lines: [],
    rendered_text: '',
    status: '',
    status_class: '',
    subcategory: '',
    tokens_received: 50,
    variables: JSON.parse('{}'),
    variables_errors: [],
    is_checkbox: false,
};
