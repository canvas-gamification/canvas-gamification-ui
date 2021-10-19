import {User} from "@app/_models";
import {UserConsent} from "@app/_models/user_consent";

export const MOCK_ADMIN: User = {
    email: "",
    first_name: "",
    has_consent: false,
    id: 0,
    is_student: false,
    is_teacher: true,
    last_name: "",
    role: "",
    tokens: 0,
    username: ""
};

export const MOCK_STUDENT: User = {
    email: "",
    first_name: "",
    has_consent: false,
    id: 1,
    is_student: true,
    is_teacher: false,
    last_name: "",
    role: "",
    tokens: 0,
    username: ""
};

export const MOCK_STUDENT_HAS_CONSENT: User = {
    email: "",
    first_name: "",
    has_consent: true,
    id: 1,
    is_student: true,
    is_teacher: false,
    last_name: "",
    role: "",
    tokens: 0,
    username: ""
};

export const MOCK_ADMIN_CONSENT: UserConsent = {
    access_course_grades: false,
    access_submitted_course_work: false,
    consent: false,
    created_at: undefined,
    date: "",
    legal_first_name: "",
    legal_last_name: "",
    student_number: "",
    user: MOCK_ADMIN

};
