import {Question} from '@app/_models/question';
import {SafeHtml} from "@angular/platform-browser";

export interface QuestionSubmission {
    pk: number;
    submission_time: Date;
    answer: string;
    grade: number;
    is_correct: boolean;
    is_partially_correct: boolean;
    finalized: boolean;
    status: string;
    tokens_received: number;
    token_value: number;
    answer_files: { [key: string]: string };
    question: Question;
    no_file_answer: boolean;
    get_decoded_stderr: string;
    get_decoded_results: string[];
    get_formatted_test_results: string;
    get_passed_test_results: { name: string; message: string }[];
    get_failed_test_results: { name: string; message: string }[];
    get_num_tests: number;
    formatted_tokens_received: string;
    answer_display: string | string[];
    show_answer: boolean;
    show_detail: boolean;
    status_color: string;
    safeAnswer: SafeHtml;
    safeAnswers: SafeHtml[];
}
