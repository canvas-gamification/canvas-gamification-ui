import {SafeHtml} from "@angular/platform-browser";

export interface Action {
    id: number;
    description: string;
    safeDescription: SafeHtml;
    token_change: number;
    status: string;
    time_created: Date;
    time_modified: Date;
    object_type: string;
    verb: string;
}
