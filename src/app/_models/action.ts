import {SafeHtml} from "@angular/platform-browser"

export enum ActionType {
    BUTTON = 'Button',
    COURSE = 'Course',
    COURSE_REGISTRATION = 'Course Registration',
    EVENT = 'Event',
    GOAL = 'Goal',
    GOAL_ITEM = 'Goal Item',
    QUESTION = 'Question',
    SUBMISSION = 'Submission',
    USER = 'User',
    TEAM = 'Team',
}

export enum ActionVerb {
    CLICKED = 'Clicked',
    COMPLETED = 'Completed',
    CREATED = 'Created',
    DELETED = 'Deleted',
    DELIVERED = 'Delivered',
    DUPLICATED = 'Duplicated',
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
    UPDATED = 'Updated',
    USED = 'Used',
    JOINED = 'Joined',
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
