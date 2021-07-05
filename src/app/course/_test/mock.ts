import {CourseRegistration, TokenUseOption} from "@app/_models";
import {TokenUse} from "@app/_models/token_use";

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
