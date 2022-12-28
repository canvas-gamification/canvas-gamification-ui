import {SafeHtml} from "@angular/platform-browser"

export enum ActionType {
    QUESTION = 'Question',
    USER = 'User',
    SUBMISSION = 'Submission',
    COURSE = 'Course',
    EVENT = 'Event',
    COURSE_REGISTRATION = 'Course Registration'
}

export enum ActionVerb {
    CREATED = 'Created',
    COMPLETED = 'Completed',
    OPENED = 'Opened',
    DELETED = 'Deleted',
    DELIVERED = 'Delivered',
    READ = 'Read',
    SOLVED = 'Solved',
    SUBMITTED = 'Submitted',
    SENT = 'Sent',
    STARTED = 'Started',
    USED = 'Used',
    REGISTERED = 'Registered',
    EDITED = 'Edited',
    UNREAD = 'Unread',
    SKIPPED = 'Skipped',
    LOGGED_IN = 'Logged In',
    LOGGED_OUT = 'Logged Out',
    EVALUATED = 'Evaluated'
}

export enum ActionStatus {
    COMPLETE = 'Complete',
    PENDING = 'Pending'
}

export interface Action {
    id: number;
    description: string;
    safeDescription: SafeHtml;
    token_change: number;
    status: ActionStatus;
    time_created: Date;
    time_modified: Date;
    object_type: ActionType;
    object_id: number;
    verb: ActionVerb;
}
