import {Category, NestedCategories, QuestionCount, ViewCourse} from "@app/_models";

export const MOCK_CATEGORY: Category = {
    name: 'Test',
    average_success: 0,
    description: '',
    next_category_ids: [],
    pk: 0,
    full_name: '',
    parent: null,
    question_count: 100,
};

export const MOCK_NESTED_CATEGORY: NestedCategories = {
    category: MOCK_CATEGORY,
    children: []
};

export const MOCK_NESTED_CATEGORY_2: NestedCategories = {
    category: MOCK_CATEGORY,
    children: [MOCK_NESTED_CATEGORY]
};

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
};

export const MOCK_VIEW_COURSE: ViewCourse = {
    course_id: 1,
    name: 'Course',
    url: '',
    canvas_name: 'Canvas Course',
    start_date: '',
    end_date: ''
};
