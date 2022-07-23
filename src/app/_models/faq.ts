import {SafeHtml} from "@angular/platform-browser"

export interface FAQ {
    question: string;
    answer: string;
    safeAnswer: SafeHtml;
}
