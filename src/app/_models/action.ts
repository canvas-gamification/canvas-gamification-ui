import {SafeHtml} from "@angular/platform-browser"

export enum ActionType {
    BUTTON = 'Button',
    COURSE = 'Course',
    COURSE_REGISTRATION = 'Course Registration',
    EVENT = 'Event',
    QUESTION = 'Question',
    SUBMISSION = 'Submission',
    USER = 'User'
}

export enum ActionVerb {
    CLICKED = 'Clicked',
    CREATED = 'Created',
    COMPLETED = 'Completed',
    DELETED = 'Deleted',
    DELIVERED = 'Delivered',
    EDITED = 'Edited',
    EVALUATED = 'Evaluated',
    LOGGED_IN = 'Logged In',
    LOGGED_OUT = 'Logged Out',
    OPENED = 'Opened',
    READ = 'Read',
    REGISTERED = 'Registered',
    SENT = 'Sent',
    SKIPPED = 'Skipped',
    SOLVED = 'Solved',
    STARTED = 'Started',
    SUBMITTED = 'Submitted',
    UNREAD = 'Unread',
    USED = 'Used',
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
