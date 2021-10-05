import {Question} from '@app/_models/question';
import {SafeHtml} from "@angular/platform-browser";

export enum StatusMessage {
    IN_QUEUE = 'In Queue',
    PROCESSING = 'Processing',
    ACCEPTED = 'Accepted',
    WRONG = 'Wrong Answer',
    TIME_LIMIT_EXCEEDED = 'Time Limit Exceeded',
    COMPILATION_ERROR = 'Compilation Error',
    RUNTIME_ERROR_SIGSEGV = 'Runtime Error (SIGSEGV)',
    RUNTIME_ERROR_SIGXFSZ = 'Runtime Error (SIGXFSZ)',
    RUNTIME_ERROR_SIGFPE = 'Runtime Error (SIGFPE)',
    RUNTIME_ERROR_SIGABRT = 'Runtime Error (SIGABRT)',
    RUNTIME_ERROR_NZEC = 'Runtime Error (NZEC)',
    RUNTIME_ERROR_OTHER = 'Runtime Error (Other)',
    INTERNAL_ERROR = 'Internal Error',
    EXEC_FORMAT_ERROR = 'Exec Format Error',
}

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
    get_status_message: StatusMessage;
    get_formatted_test_results: string;
    get_passed_test_results: { name: string; message: string }[];
    get_failed_test_results: { name: string; message: string }[];
    get_num_tests: number;
    formatted_tokens_received: string;
    answer_display: string[];
    show_answer: boolean;
    show_detail: boolean;
    status_color: string;
    safeAnswer: SafeHtml[];
}
