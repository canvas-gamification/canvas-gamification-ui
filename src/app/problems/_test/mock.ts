import {Category, Course, CourseEvent, CourseRegistrationMode, Question, STATUS, UQJ} from '@app/_models'
import {QuestionSubmission, StatusMessage} from '@app/_models/question_submission'
import {Difficulty} from "@app/_models/difficulty"
import {McqFormData} from "@app/problems/_forms/mcq.form"
import {JavaFormData} from "@app/problems/_forms/java.form"
import {ParsonsFormData} from "@app/problems/_forms/parsons.form"
import {UserStats} from "@app/_models/user_difficulty_stats"
import {Goal, GoalItem} from "@app/_models/goal/goal"
import {GoalForm, GoalFormData, GoalItemFormData} from "@app/course/_forms/goal.form"
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {TuiDay, TuiTime} from "@taiga-ui/cdk"

const builder = new FormBuilder()

export const MOCK_FORM: FormGroup = builder.group({
    end_date: new FormControl(TuiDay.currentLocal(), [Validators.required]),
    end_time: new FormControl(TuiTime.currentLocal(), [Validators.required]),
    goal_items: new FormArray([GoalForm.createGoalItemForm()], [Validators.required]),
})

export const MOCK_GOAL_FORM: GoalFormData = {
    course_id: 1,
    end_date: "2022-11-10T16:40:37.860661-08:00"
}

export const MOCK_GOAL_ITEM_FORM: GoalItemFormData = {
    goal: 3,
    category: 72,
    difficulty: "HARD",
    number_of_questions: 25
}

export const MOCK_GOAL_ITEM: GoalItem = {
    category: 71,
    difficulty: "EASY",
    number_of_questions: 5
}

export const MOCK_GOAL_ITEM_2: GoalItem = {
    category: 72,
    difficulty: "MEDIUM",
    number_of_questions: 15
}

export const MOCK_GOAL_ITEM_3: GoalItem = {
    category: 71,
    difficulty: "HARD",
    number_of_questions: 20
}

export const MOCK_GOAL_ITEMS: GoalItem[] = [MOCK_GOAL_ITEM, MOCK_GOAL_ITEM_2, MOCK_GOAL_ITEM_3]

export const MOCK_GOAL: Goal = {
    id: 13,
    course_reg: 1,
    start_date: "2004-09-03T20:50:00-07:00",
    end_date: "2022-11-10T16:40:37.860661-08:00",
    progress: 0,
    is_finished: true,
    number_of_questions: 34,
    goal_items: MOCK_GOAL_ITEMS,
    stats: null,
}

export const MOCK_GOAL_2: Goal = {
    id: 19,
    course_reg: 1,
    start_date: "2006-03-04T20:50:00-07:00",
    end_date: "2021-21-13T16:40:37.860661-08:00",
    progress: 0,
    is_finished: false,
    number_of_questions: 3,
    goal_items: MOCK_GOAL_ITEMS,
    stats: null,
}

export const MOCK_GOALS: Goal[] = [MOCK_GOAL, MOCK_GOAL_2]

export const MOCK_CATEGORY: Category = {
    name: 'Test',
    average_success: 0,
    description: '',
    next_category_ids: [],
    pk: 0,
    full_name: 'Test',
    parent: null,
    question_count: 100,
    average_success_per_difficulty: []
}

export const MOCK_CATEGORY_2: Category = {
    name: 'Test #2',
    average_success: 0,
    description: '',
    next_category_ids: [],
    pk: 1,
    full_name: 'Test #2',
    parent: 0,
    question_count: 100,
    average_success_per_difficulty: []
}

export const MOCK_CATEGORIES: Category[] = [MOCK_CATEGORY, MOCK_CATEGORY_2]

export const MOCK_COURSE_EVENT: CourseEvent = {
    id: 1,
    course: 0,
    name: '',
    is_exam: false,
    is_open: true,
    count_for_tokens: true,
    end_date: new Date("30/05/1978 02:34:56"),
    has_edit_permission: false,
    is_allowed_to_open: true,
    start_date: new Date("30/05/1979 02:34:56"),
    total_event_grade: 0,
    type: '',
    is_not_available_yet: false,
    is_closed: false
}

export const MOCK_PRACTICE_EVENT: CourseEvent = {
    name: '',
    type: null,
    count_for_tokens: false,
    start_date: new Date("30/05/1978 02:34:56"),
    end_date: new Date("30/05/1979 02:34:56"),
    course: null,
    is_not_available_yet: null,
    is_closed: null
}

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
    difficulty: 'EASY',
    event: MOCK_COURSE_EVENT.id,
    event_obj: MOCK_COURSE_EVENT,
    is_exam: false,
    is_exam_and_open: false,
    is_open: true,
    is_sample: false,
    is_verified: true,
    junit_template: '',
    variables: [],
    max_submission_allowed: 5,
    parent_category_name: '',
    success_rate: 0,
    text: 'test',
    time_created: null,
    time_modified: null,
    title: 'MCQ Test',
    token_value: 5,
    type_name: 'multiple choice question',
    visible_distractor_count: 1,
    is_author: true,
    is_checkbox: false,
    input_files: null,
    is_practice: false,
}

export const MOCK_CHECKBOX_QUESTION: Question = {
    id: 1,
    category: 0,
    category_obj: MOCK_CATEGORY,
    status: 'Partially Solved',
    answer: 'a,b',
    author: 0,
    author_name: '',
    choices: {
        'a': 'sag',
        'b': 'gav',
        'c': 'foo',
        'd': 'bar'
    },
    course_name: '',
    difficulty: 'EASY',
    event: MOCK_COURSE_EVENT.id,
    event_obj: MOCK_COURSE_EVENT,
    is_exam: false,
    is_exam_and_open: false,
    is_open: true,
    is_sample: false,
    is_verified: true,
    junit_template: '',
    variables: [],
    max_submission_allowed: 5,
    parent_category_name: '',
    success_rate: 0,
    text: 'test',
    time_created: null,
    time_modified: null,
    title: 'MCQ Test',
    token_value: 5,
    type_name: 'multiple choice question',
    visible_distractor_count: 1,
    is_author: true,
    is_checkbox: true,
    input_files: null,
    is_practice: false,
}

export const MOCK_JAVA_QUESTION: Question = {
    id: 2,
    category: 0,
    category_obj: MOCK_CATEGORY,
    status: 'Wrong',
    answer: '',
    author: 0,
    author_name: '',
    choices: null,
    course_name: '',
    difficulty: 'EASY',
    event: MOCK_COURSE_EVENT.id,
    event_obj: MOCK_COURSE_EVENT,
    is_exam: false,
    is_exam_and_open: false,
    is_open: true,
    is_sample: false,
    is_verified: true,
    junit_template: 'TEST JUNIT',
    variables: [],
    max_submission_allowed: 5,
    parent_category_name: '',
    success_rate: 0,
    text: 'This is a Java question.',
    time_created: null,
    time_modified: null,
    title: 'Java Test',
    token_value: 5,
    type_name: 'java question',
    visible_distractor_count: 0,
    is_author: true,
    is_checkbox: false,
    input_files: [{
        name: 'input',
        compile: false,
        template: 'code'
    }],
    is_practice: false,
}

export const MOCK_PARSONS_QUESTION: Question = {
    id: 3,
    category: 0,
    category_obj: MOCK_CATEGORY,
    status: '',
    answer: '',
    author: 0,
    author_name: '',
    choices: null,
    course_name: '',
    difficulty: 'EASY',
    event: MOCK_COURSE_EVENT.id,
    event_obj: MOCK_COURSE_EVENT,
    is_exam: false,
    is_exam_and_open: false,
    is_open: true,
    is_sample: false,
    is_verified: true,
    junit_template: 'TEST JUNIT',
    variables: [],
    max_submission_allowed: 5,
    parent_category_name: '',
    success_rate: 0,
    text: 'This is a Parsons question.',
    time_created: null,
    time_modified: null,
    title: 'Parsons Test',
    token_value: 5,
    type_name: 'parsons question',
    visible_distractor_count: 0,
    is_author: true,
    is_checkbox: false,
    input_files: [{
        name: 'test',
        lines: ['a', 'b', 'c'],
        compile: true,
    }],
    is_practice: false,
}

export const MOCK_PRACTICE_JAVA_QUESTION: Question = {
    id: 4,
    category: 0,
    status: 'Wrong',
    answer: '',
    author: 0,
    author_name: '',
    category_obj: MOCK_CATEGORY,
    choices: null,
    course_name: '',
    difficulty: 'EASY',
    event: null,
    event_obj: MOCK_PRACTICE_EVENT,
    is_exam: false,
    is_exam_and_open: false,
    is_open: true,
    is_sample: false,
    is_verified: true,
    junit_template: 'TEST JUNIT',
    variables: [],
    max_submission_allowed: 5,
    parent_category_name: '',
    success_rate: 0,
    text: 'This is a Java question.',
    time_created: null,
    time_modified: null,
    title: '',
    token_value: 5,
    type_name: 'java question',
    visible_distractor_count: 0,
    is_author: true,
    is_checkbox: false,
    input_files: null,
    is_practice: true,
}

export const MOCK_PRACTICE_PARSONS_QUESTION: Question = {
    id: 5,
    category: 0,
    status: '',
    answer: '',
    author: 0,
    author_name: '',
    category_obj: MOCK_CATEGORY,
    choices: null,
    course_name: '',
    difficulty: 'EASY',
    event: null,
    event_obj: MOCK_PRACTICE_EVENT,
    is_exam: false,
    is_exam_and_open: false,
    is_open: true,
    is_sample: false,
    is_verified: true,
    junit_template: 'TEST JUNIT',
    variables: [],
    max_submission_allowed: 5,
    parent_category_name: '',
    success_rate: 0,
    text: 'This is a Parsons question.',
    time_created: null,
    time_modified: null,
    title: '',
    token_value: 5,
    type_name: 'parsons question',
    visible_distractor_count: 0,
    is_author: true,
    is_checkbox: false,
    input_files: [{
        name: 'test',
        lines: ['a', 'b', 'c'],
        compile: true,
    }],
    is_practice: true,
}

export const MOCK_PRACTICE_MCQ_QUESTION: Question = {
    id: 6,
    category: 0,
    status: 'Solved',
    answer: 'a',
    author: 0,
    author_name: '',
    category_obj: MOCK_CATEGORY,
    choices: {
        'a': 'sag',
        'b': 'gav'
    },
    course_name: '',
    difficulty: 'EASY',
    event: null,
    event_obj: MOCK_PRACTICE_EVENT,
    is_exam: false,
    is_exam_and_open: false,
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
    is_practice: true,
}

export const MOCK_PRACTICE_CHECKBOX_QUESTION: Question = {
    id: 7,
    category: 0,
    status: 'Partially Solved',
    answer: 'a,b',
    author: 0,
    author_name: '',
    category_obj: MOCK_CATEGORY,
    choices: {
        'a': 'sag',
        'b': 'gav',
        'c': 'foo',
        'd': 'bar'
    },
    course_name: '',
    difficulty: 'EASY',
    event: null,
    event_obj: MOCK_PRACTICE_EVENT,
    is_exam: false,
    is_exam_and_open: false,
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
    is_checkbox: true,
    input_files: null,
    is_practice: true,
}

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
}

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
    rendered_choices: {
        'a': 'sag',
        'b': 'gav',
        'c': 'foo',
        'd': 'bar'
    },
    rendered_lines: [],
    rendered_text: '',
    status: '',
    status_class: '',
    subcategory: '',
    tokens_received: 50,
    variables: JSON.parse('{}'),
    variables_errors: [],
    is_checkbox: true,
}

export const MOCK_UQJ_3: UQJ = {
    category: MOCK_CATEGORY,
    id: 2,
    question: MOCK_JAVA_QUESTION,
    format: '',
    formatted_current_tokens_received: '',
    input_files: [
        {
            name: 'Test',
            compile: true,
            template: 'Test Template',
        },
        {
            name: 'Test2',
            compile: false,
            template: '',
        }
    ],
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
}

export const MOCK_UQJ_4: UQJ = {
    category: MOCK_CATEGORY,
    id: 3,
    question: MOCK_PARSONS_QUESTION,
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
    rendered_lines: [{
        name: 'test',
        lines: ['a', 'b', 'c']
    }],
    rendered_text: '',
    status: '',
    status_class: '',
    subcategory: '',
    tokens_received: 50,
    variables: JSON.parse('{}'),
    variables_errors: [],
    is_checkbox: false,
}

export const MOCK_UQJ_5: UQJ = {
    category: MOCK_CATEGORY,
    id: 4,
    question: MOCK_PRACTICE_JAVA_QUESTION,
    format: '',
    formatted_current_tokens_received: '',
    input_files: [
        {
            name: 'Test',
            compile: true,
            template: 'Test Template',
        },
        {
            name: 'Test2',
            compile: false,
            template: '',
        }
    ],
    is_allowed_to_submit: true,
    is_partially_solved: false,
    is_solved: false,
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
}

export const MOCK_UQJ_6: UQJ = {
    category: MOCK_CATEGORY,
    id: 5,
    question: MOCK_PRACTICE_PARSONS_QUESTION,
    format: '',
    formatted_current_tokens_received: '',
    input_files: [],
    is_allowed_to_submit: true,
    is_partially_solved: false,
    is_solved: false,
    last_viewed: null,
    num_attempts: 5,
    opened_tutorial: false,
    random_seed: 0,
    rendered_choices: null,
    rendered_lines: [{
        name: 'test',
        lines: ['a', 'b', 'c']
    }],
    rendered_text: '',
    status: '',
    status_class: '',
    subcategory: '',
    tokens_received: 50,
    variables: JSON.parse('{}'),
    variables_errors: [],
    is_checkbox: false,
}

export const MOCK_UQJ_7: UQJ = {
    category: MOCK_CATEGORY,
    id: 6,
    question: MOCK_PRACTICE_MCQ_QUESTION,
    format: '',
    formatted_current_tokens_received: '',
    input_files: [],
    is_allowed_to_submit: true,
    is_partially_solved: false,
    is_solved: false,
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
}

export const MOCK_UQJ_8: UQJ = {
    category: MOCK_CATEGORY,
    id: 7,
    question: MOCK_PRACTICE_CHECKBOX_QUESTION,
    format: '',
    formatted_current_tokens_received: '',
    input_files: [],
    is_allowed_to_submit: true,
    is_partially_solved: false,
    is_solved: false,
    last_viewed: null,
    num_attempts: 5,
    opened_tutorial: false,
    random_seed: 0,
    rendered_choices: {
        'a': 'sag',
        'b': 'gav',
        'c': 'foo',
        'd': 'bar'
    },
    rendered_lines: [],
    rendered_text: '',
    status: '',
    status_class: '',
    subcategory: '',
    tokens_received: 50,
    variables: JSON.parse('{}'),
    variables_errors: [],
    is_checkbox: true,
}

export const MOCK_QUESTION_SUBMISSION: QuestionSubmission = {
    answer: '',
    status: '',
    question: MOCK_MCQ_QUESTION,
    pk: 0,
    answer_display: [
        'This is an answer to a question.'
    ],
    tokens_received: 1,
    answer_files: {
        "test.java": ""
    },
    finalized: true,
    formatted_tokens_received: '',
    token_value: 1,
    get_decoded_results: [],
    get_status_message: StatusMessage.ACCEPTED,
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
    safeAnswer: [],
    author: 'studentName',
}

export const MOCK_QUESTION_SUBMISSION_2: QuestionSubmission = {
    answer: '',
    status: '',
    question: MOCK_CHECKBOX_QUESTION,
    pk: 1,
    answer_display: [],
    tokens_received: 1,
    answer_files: {
        "test.java": ""
    },
    finalized: true,
    formatted_tokens_received: '',
    token_value: 1,
    get_decoded_results: [],
    get_status_message: StatusMessage.ACCEPTED,
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
    safeAnswer: [],
    author: 'studentName',
}

export const MOCK_DIFFICULTIES: Difficulty[] = [
    ['EASY', 'Easy'],
    ['MEDIUM', 'Medium'],
    ['HARD', 'Hard'],
]

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
    choices: null,
    is_verified: true
}

export const MOCK_JAVA_FORM_DATA: JavaFormData = {
    title: 'This is a test.',
    difficulty: 'EASY',
    course: null,
    event: null,
    text: null,
    category: null,
    variables: [],
    junit_template: null,
    input_files: null,
    is_verified: true
}

export const MOCK_PARSONS_FORM_DATA: ParsonsFormData = {
    title: 'This is a test.',
    difficulty: 'EASY',
    course: null,
    event: null,
    text: null,
    category: null,
    variables: null,
    junit_template: null,
    input_files: [{
        name: 'test',
        lines: ['a', 'b', 'c'],
        compile: true,
    }],
    is_verified: true
}

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
]

export const MOCK_VARIABLES = [
    {
        "type": "int",
        "name": "Test",
        "min": "0",
        "max": "1"
    }
]

export const MOCK_UQJS: UQJ[] = [MOCK_UQJ, MOCK_UQJ_2, MOCK_UQJ_3, MOCK_UQJ_4, MOCK_UQJ_5, MOCK_UQJ_6, MOCK_UQJ_7, MOCK_UQJ_8]

export const MOCK_QUESTIONS: Question[] = [MOCK_MCQ_QUESTION, MOCK_CHECKBOX_QUESTION, MOCK_JAVA_QUESTION, MOCK_PARSONS_QUESTION, MOCK_PRACTICE_MCQ_QUESTION, MOCK_PRACTICE_CHECKBOX_QUESTION, MOCK_PRACTICE_JAVA_QUESTION, MOCK_PRACTICE_PARSONS_QUESTION]

export const MOCK_SUBMISSIONS: QuestionSubmission[] = [MOCK_QUESTION_SUBMISSION, MOCK_QUESTION_SUBMISSION_2]

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
    leader_board: null,
    has_create_event_permission: true,
    description: "",
    registration_mode: CourseRegistrationMode.OPEN,
}

export const MOCK_USER_DIFFICULTY_STATS: UserStats[] = [
    {difficulty: 'EASY', avgSuccess: 1},
    {difficulty: 'NORMAL', avgSuccess: 1},
    {difficulty: 'HARD', avgSuccess: 1},
    {difficulty: 'ALL', avgSuccess: 1},
]
