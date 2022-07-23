import {User} from "@app/_models"
import {UserConsent} from "@app/_models/user_consent"
import {EmailFormData, PasswordFormData} from "@app/accounts/_forms/reset-password.form"

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
}

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
}

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
}

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
}

export const MOCK_CONSENT_DECLINE: UserConsent = {
    consent: false,
    access_submitted_course_work: false,
    access_course_grades: false,
    legal_first_name: '-',
    legal_last_name: '-',
    student_number: '-',
    date: new Date().toDateString(),
    user: undefined,
    created_at: undefined
}

export const MOCK_PASSWORD_FORM_DATA: PasswordFormData = {
    password: 'password',
    password2: 'password',
    uid: '123',
    token: 'token'
}

export const MOCK_EMAIL_FORM_DATA: EmailFormData = {
    email: 'email@email.com'
}
