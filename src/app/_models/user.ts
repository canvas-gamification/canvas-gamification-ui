export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    token?: string;
    tokens: number;
    role: string;
    is_teacher: boolean;
    is_student: boolean;
}
