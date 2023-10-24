import {Action, User} from "@app/_models"

export const MOCK_USER: User = {
    id: 0,
    is_teacher: false,
    email: "mock@mock.com",
    first_name: "mock",
    nickname: 'Nick',
    has_consent: true,
    is_student: true,
    role: 'student',
    last_name: "mock",
    token: "secret_mock_token",
    tokens: 0,
    username: "mock@mock.com",
    community_jwt: ""
}

export const MOCK_USER_ACTION_1: Action = {
    description: "",
    id: 0,
    object_type: undefined,
    object_id: undefined,
    safeDescription: undefined,
    status: undefined,
    time_created: undefined,
    time_modified: undefined,
    token_change: 0,
    verb: undefined
}

export const MOCK_USER_ACTION_2: Action = {
    description: "",
    id: 1,
    object_type: undefined,
    object_id: undefined,
    safeDescription: undefined,
    status: undefined,
    time_created: undefined,
    time_modified: undefined,
    token_change: 0,
    verb: undefined
}

export const MOCK_USER_ACTIONS: Action[] = [MOCK_USER_ACTION_1, MOCK_USER_ACTION_2]
