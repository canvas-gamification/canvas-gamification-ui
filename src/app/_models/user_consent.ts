import {User} from '@app/_models/user';

export interface UserConsent {
    user: User;
    created_at: Date;
    consent: boolean;
    legal_first_name: string;
    legal_last_name: string;
    student_number: string;
    date: string;
}
