import {Category, CourseEvent, Question, UQJ} from '@app/_models';
import {QuestionSubmission} from '@app/_models/question_submission';
import {Difficulty} from "@app/_models/difficulty";
import {McqFormData} from "@app/problems/_forms/mcq.form";
import {JavaFormData} from "@app/problems/_forms/java.form";
import {ParsonsFormData} from "@app/problems/_forms/parsons.form";

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

export const MOCK_MCQ_QUESTION: Question = {
    id: 0,
    category: 0,
    status: '',
    additional_file_name: '',
    answer: 'a',
    author: 0,
    author_name: '',
    category_name: '',
    choices: {
        'a': 'sag',
        'b': 'gav'
    },
    course_name: '',
    difficulty: '',
    event: MOCK_COURSE_EVENT,
    event_name: '',
    full_category_name: '',
    input_file_names: [],
    is_exam: false,
    is_exam_and_open: false,
    is_open: true,
    is_sample: false,
    is_verified: true,
    junit_template: '',
    lines: [],
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
};

export const MOCK_CHECKBOX_QUESTION: Question = {
    id: 1,
    category: 0,
    status: '',
    additional_file_name: '',
    answer: 'a,b',
    author: 0,
    author_name: '',
    category_name: '',
    choices: {
        'a': 'sag',
        'b': 'gav',
        'c': 'foo',
        'd': 'bar'
    },
    course_name: '',
    difficulty: '',
    event: MOCK_COURSE_EVENT,
    event_name: '',
    full_category_name: '',
    input_file_names: [],
    is_exam: false,
    is_exam_and_open: false,
    is_open: true,
    is_sample: false,
    is_verified: true,
    junit_template: '',
    lines: [],
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
    is_checkbox: true,
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
    rendered_choices: null,
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

export const MOCK_UQJ_2: UQJ = {
    category: MOCK_CATEGORY,
    id: 1,
    question: MOCK_CHECKBOX_QUESTION,
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
    rendered_choices: null,
    rendered_lines: [],
    rendered_text: '',
    status: '',
    status_class: '',
    subcategory: '',
    tokens_received: 50,
    variables: JSON.parse('{}'),
    variables_errors: [],
    is_checkbox: true,
};

export const MOCK_QUESTION_SUBMISSION: QuestionSubmission = {
    answer: '',
    status: '',
    question: MOCK_MCQ_QUESTION,
    pk: 0,
    answer_display: [],
    tokens_received: 1,
    answer_files: {},
    finalized: true,
    formatted_tokens_received: '',
    token_value: 1,
    get_decoded_results: [],
    get_decoded_stderr: '',
    get_failed_test_results: [],
    get_formatted_test_results: '',
    get_num_tests: 1,
    get_passed_test_results: [],
    grade: 1,
    is_correct: true,
    submission_time: null,
    is_partially_correct: false,
    no_file_answer: false,
    show_answer: false,
    show_detail: true,
    status_color: '',
    safeAnswer: [],
};

export const MOCK_QUESTION_SUBMISSION_2: QuestionSubmission = {
    answer: '',
    status: '',
    question: MOCK_CHECKBOX_QUESTION,
    pk: 1,
    answer_display: [],
    tokens_received: 1,
    answer_files: {},
    finalized: true,
    formatted_tokens_received: '',
    token_value: 1,
    get_decoded_results: [],
    get_decoded_stderr: '',
    get_failed_test_results: [],
    get_formatted_test_results: '',
    get_num_tests: 1,
    get_passed_test_results: [],
    grade: 1,
    is_correct: false,
    submission_time: null,
    is_partially_correct: false,
    no_file_answer: false,
    show_answer: false,
    show_detail: true,
    status_color: '',
    safeAnswer: [],
};

export const MOCK_DIFFICULTIES: Difficulty[] = [
    ['EASY', 'EASY'],
    ["NORMAL", 'MEDIUM'],
    ['HARD', 'HARD'],
];

export const MOCK_MCQ_FORM_DATA: McqFormData = {
    title: 'This is a test.',
    difficulty: 'EASY',
    course: null,
    event: null,
    text: null,
    answer: null,
    category: null,
    variables: null,
    visible_distractor_count: null,
    choices: null
};

export const MOCK_JAVA_FORM_DATA: JavaFormData = {
    title: 'This is a test.',
    difficulty: 'EASY',
    course: null,
    event: null,
    text: null,
    category: null,
    variables: [],
    junit_template: null,
    input_file_names: null
};

export const MOCK_PARSONS_FORM_DATA: ParsonsFormData = {
    title: 'This is a test.',
    difficulty: 'EASY',
    course: null,
    event: null,
    text: null,
    category: null,
    variables: null,
    lines: null,
    additional_file_name: null,
    junit_template: null
};

// TODO - Determine a more specific type.
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const MOCK_SCHEMAS: any = [
    {
        title: 'TestSchema',
        type: 'array',
        format: 'table',
        items: {
            type: 'string',
            title: 'Test'
        }
    },
    {
        title: 'TestSchema2',
        type: 'array',
        format: 'table',
    }
];

export const MOCK_UQJS: UQJ[] = [MOCK_UQJ, MOCK_UQJ_2];

export const MOCK_QUESTIONS: Question[] = [MOCK_MCQ_QUESTION, MOCK_CHECKBOX_QUESTION];

export const MOCK_SUBMISSIONS: QuestionSubmission[] = [MOCK_QUESTION_SUBMISSION, MOCK_QUESTION_SUBMISSION_2];
