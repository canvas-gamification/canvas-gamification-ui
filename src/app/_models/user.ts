export class User {
    id: number;
    username: string;
    // tslint:disable-next-line:variable-name
    first_name: string;
    // tslint:disable-next-line:variable-name
    last_name: string;
    email: string;
    token?: string;
    tokens: number;
    role: string;
    // tslint:disable-next-line:variable-name
    is_teacher: boolean;
    // tslint:disable-next-line:variable-name
    is_student: boolean;

    isAdmin() {
        return this.is_teacher;
    }

    hasCompleteProfile() {
        return !!this.first_name;
    }
}
