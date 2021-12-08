export interface QuestionReport {
    id?: number;
    question?: number;
    report: reportOptions;
    report_details: string;
}

export enum reportOptions {
    TYPO_TEXT = "TYPO_TEXT",
    TYPO_ANSWER = "TYPO_ANSWER",
    RIGHT_SOLUTION_MARKED_WRONG = "RIGHT_SOLUTION_MARKED_WRONG",
    WRONG_SOLUTION_MARKED_RIGHT = "WRONG_SOLUTION_MARKED_RIGHT",
    OTHER = "OTHER",
};
