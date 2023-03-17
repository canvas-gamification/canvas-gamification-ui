import {
    Category,
    Course,
    CourseRegistrationMode,
    NestedCategories,
    QuestionCount,
    STATUS
} from "@app/_models"
import {MOCK_COURSE_EVENT} from "@app/problems/_test/mock"

export const MOCK_CATEGORY: Category = {
    name: 'Test',
    description: '',
    next_category_ids: [],
    pk: 0,
    full_name: '',
    parent: null,
    question_count: 100,
}

export const MOCK_NESTED_CATEGORY: NestedCategories = {
    category: MOCK_CATEGORY,
    children: []
}

export const MOCK_NESTED_CATEGORY_2: NestedCategories = {
    category: MOCK_CATEGORY,
    children: [MOCK_NESTED_CATEGORY]
}

export const MOCK_QUESTION_COUNT: QuestionCount = {
    name: 'QUESTION',
    count: 2,
    count_per_difficulty: [
        {
            count: 1,
            difficulty: 'EASY'
        },
        {
            count: 1,
            difficulty: 'MEDIUM'
        }
    ]
}

export const MOCK_VIEW_COURSE: Course = {
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
    course_reg: null,
    leader_board: null,
    has_create_event_permission: false,
    has_create_challenge_permission: false,
    has_view_permission: true,
    description: "",
    registration_mode: CourseRegistrationMode.OPEN,
}
