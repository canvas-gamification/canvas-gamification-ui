import {
    Course,
    CourseRegistration,
    CourseRegistrationMode,
    EventType,
    LeaderboardElement,
    Question,
    STATUS,
    TokenUseOption,
    UQJ,
    User
} from "@app/_models"
import {TokenUse} from "@app/_models/token_use"
import {MOCK_CATEGORY, MOCK_COURSE_EVENT} from "@app/problems/_test/mock"
import {Stats} from "@app/_models/user_difficulty_stats"
import {GoalItemSubmissionStats, GoalLimit} from "@app/_models/goal/goal"

export const MOCK_TOKEN_USE_OPTION1: TokenUseOption = {
    id: 1,
    tokens_required: 1,
    points_given: 1,
    maximum_number_of_use: 1,
    assignment_name: 'test',
    assignment_id: 1,
    course: 1
}

export const MOCK_TOKEN_USE_OPTION2: TokenUseOption = {
    id: 2,
    tokens_required: 1,
    points_given: 1,
    maximum_number_of_use: 1,
    assignment_name: 'test',
    assignment_id: 1,
    course: 1
}

export const MOCK_TOKEN_USE1: TokenUse = {
    option: MOCK_TOKEN_USE_OPTION1,
    num_used: 1
}


export const MOCK_TOKEN_USE2: TokenUse = {
    option: MOCK_TOKEN_USE_OPTION2,
    num_used: 0
}

export const MOCK_COURSE_REGISTRATION: CourseRegistration = {
    id: 1,
    available_tokens: 100,
    canvas_user_id: 1,
    is_blocked: false,
    is_verified: true,
    token_uses: [MOCK_TOKEN_USE1, MOCK_TOKEN_USE2],
    total_tokens_received: 50,
    name: 'test',
}

export const MOCK_EVENT_TYPES: EventType[] = [
    ["PRACTICE", "PRACTICE"],
    ["ASSIGNMENT", "ASSIGNMENT"],
    ["EXAM", "EXAM"]
]

export const MOCK_USER_STATS: { success_rate: number } = {
    success_rate: 0.5
}

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
    instructor: 1,
    status: STATUS.active,
    is_registered: true,
    events: [MOCK_COURSE_EVENT],
    token_use_options: null,
    course_reg: MOCK_COURSE_REGISTRATION,
    leader_board: [{
        name: 'name',
        token: 2,
    }, {
        name: 'name 2',
        token: 5,
    }],
    has_create_event_permission: true,
    has_create_challenge_permission: true,
    has_view_permission: true,
    description: "",
    registration_mode: CourseRegistrationMode.OPEN,
}

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
    course_reg: null,
    leader_board: [{
        name: 'name',
        token: 2,
    }, {
        name: 'name 2',
        token: 5,
    }],
    has_create_event_permission: true,
    has_create_challenge_permission: true,
    has_view_permission: true,
    description: "",
    registration_mode: CourseRegistrationMode.OPEN,
}

export const MOCK_COURSES: Course[] = [MOCK_COURSE1, MOCK_COURSE2]

export const MOCK_USER_STUDENT: User = {
    id: 0,
    username: 'student@test.com',
    first_name: 'Firstname',
    nickname: 'Savvy Seal',
    last_name: 'Lastname',
    email: 'student@test.com',
    token: null,
    tokens: 0,
    role: 'student',
    is_teacher: false,
    is_student: true,
    has_consent: true,
    community_jwt: ""
}

export const MOCK_USER_TEACHER: User = {
    id: 1,
    username: 'teacher@test.com',
    first_name: 'FirstnameTeach',
    last_name: 'LastnameTeach',
    nickname: 'Teach',
    email: 'teacher@test.com',
    token: null,
    tokens: 0,
    role: 'teacher',
    is_teacher: true,
    is_student: false,
    has_consent: true,
    community_jwt: ""
}

export const MOCK_MCQ_QUESTION: Question = {
    id: 0,
    category: 0,
    category_name: "Test",
    full_category_name: "Test",
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
    is_practice: false,
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
}

export const MOCK_USER_STATS1: Stats = {
    challenge_stats: {
        challenges_completed: 2
    },
    goal_stats: {
        goals_completed: 2
    },
    question_stats: {
        mcq: {
            questions_attempt: 2,
            questions_solved: 2,
            avgSuccess: 1
        },
        java: {
            questions_attempt: 1,
            questions_solved: 1,
            avgSuccess: 1
        },
        parsons: {
            questions_attempt: 1,
            questions_solved: 1,
            avgSuccess: 1
        }
    },
    category_stats: [
        {
            category: 0,
            difficulty: 'EASY',
            questions_attempt: 1,
            questions_solved: 1,
            avgSuccess: 1
        },
        {
            category: 0,
            difficulty: 'MEDIUM',
            questions_attempt: 1,
            questions_solved: 1,
            avgSuccess: 1

        },
        {
            category: 0,
            difficulty: 'HARD',
            questions_attempt: 1,
            questions_solved: 1,
            avgSuccess: 1

        },
        {
            category: 0,
            difficulty: 'ALL',
            questions_attempt: 3,
            questions_solved: 3,
            avgSuccess: 1

        },
        {
            category: 1,
            difficulty: 'EASY',
            questions_attempt: 1,
            questions_solved: 1,
            avgSuccess: 1
        },
        {
            category: 1,
            difficulty: 'MEDIUM',
            questions_attempt: 1,
            questions_solved: 1,
            avgSuccess: 1

        },
        {
            category: 1,
            difficulty: 'HARD',
            questions_attempt: 1,
            questions_solved: 1,
            avgSuccess: 1

        },
        {
            category: 1,
            difficulty: 'ALL',
            questions_attempt: 3,
            questions_solved: 3,
            avgSuccess: 1

        }
    ]
}

export const MOCK_GOAL_ITEM_SUBMISSION_STATS: GoalItemSubmissionStats = {
    total: 15,
    correct: 10,
    partially_correct: 2,
    wrong: 3,
    total_questions: 5,
    correct_questions: 4,
    success_rate: 0.66,
    questions_success_rate: 0.66,
    bugs: {
        bugs: [],
        patterns: [],
    }
}

import {Goal, GoalItem} from "@app/_models/goal/goal"
import {GradeBook} from "@app/_models/grade_book";
import {MOCK_USER} from "@test/mock";

export const MOCK_GOAL_ITEM: GoalItem = {
    id: 1,
    category: 0,
    category_name: '',
    difficulty: "EASY",
    number_of_questions: 5,
    progress: 1,
}

export const MOCK_GOAL_ITEM_2: GoalItem = {
    id: 2,
    category: 0,
    category_name: '',
    difficulty: "MEDIUM",
    number_of_questions: 15,
    progress: 10,
}

export const MOCK_GOAL_ITEM_3: GoalItem = {
    id: 3,
    category: 0,
    category_name: '',
    difficulty: "HARD",
    number_of_questions: 20,
    progress: 0,
}

export const MOCK_GOAL_ITEMS: GoalItem[] = [
    MOCK_GOAL_ITEM,
    MOCK_GOAL_ITEM_2,
    MOCK_GOAL_ITEM_3
]

export const MOCK_GOAL: Goal = {
    id: 13,
    course_reg: 1,
    start_date: "2004-09-03T20:50:00-07:00",
    end_date: "2022-11-10T16:40:37.860661-08:00",
    progress: 0,
    is_finished: true,
    number_of_questions: 40,
    goal_items: MOCK_GOAL_ITEMS,
    claimed: false,
}

export const MOCK_GOAL_2: Goal = {
    id: 14,
    course_reg: 1,
    start_date: "2006-03-04T20:50:00-07:00",
    end_date: "2021-21-13T16:40:37.860661-08:00",
    progress: 0,
    is_finished: false,
    number_of_questions: 40,
    goal_items: MOCK_GOAL_ITEMS,
    claimed: false,
}

export const MOCK_GOALS: Goal[] = [MOCK_GOAL, MOCK_GOAL_2]

export const MOCK_GOAL_LIMITS: GoalLimit[] = [
    {
        category: 0,
        difficulty: 'EASY',
        unsolved_questions: 10,
    },
    {
        category: 0,
        difficulty: 'MEDIUM',
        unsolved_questions: 10,
    },
    {
        category: 0,
        difficulty: 'HARD',
        unsolved_questions: 10,
    },
]

export const MOCK_RANKED_LEADERBOARD: LeaderboardElement[] = [
    {
        name: 'name',
        token: 2,
        course_reg_id: 1,
    },
    {
        name: 'name 2',
        token: 5,
        course_reg_id: 0,
    },
]

export const MOCK_GRADE_BOOK: GradeBook = [{
    grade: 3,
    total: 4,
    name: `${MOCK_USER.first_name} ${MOCK_USER.last_name}`,
    event_name: MOCK_COURSE_EVENT.name,
    question_details: [
        {
            title: 'Question 1',
            question_grade: 0,
            attempts: 0,
            max_attempts: 4,
        },
        {
            title: 'Question 2',
            question_grade: 1,
            attempts: 2,
            max_attempts: 4,
        },
    ]
}]
