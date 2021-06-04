import {Category, CourseEvent, Question, UQJ} from '@app/_models';
import {QuestionSubmission} from '@app/_models/question_submission';

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

export const MOCK_QUESTION: Question = {
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
    type_name: '',
    visible_distractor_count: 1,
    is_author: true,
    is_checkbox: false
};

export const MOCK_UQJ: UQJ = {
    category: MOCK_CATEGORY,
    id: 0,
    question: MOCK_QUESTION,
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
    is_checkbox: false
};

export const MOCK_QUESTION_SUBMISSION: QuestionSubmission = {
    answer: '',
    status: '',
    question: MOCK_QUESTION,
    pk: 0,
    answer_display: '',
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
    safeAnswer: ''
};
