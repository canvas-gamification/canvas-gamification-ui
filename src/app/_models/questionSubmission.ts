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
}
