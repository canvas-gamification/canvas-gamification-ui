export interface McqSubmissionRequest {
    title: string,
    difficulty: string,
    course: number,
    event: number,
    text: string,
    answer: string,
    category: number,
    variables: JSON[],
    visible_distractor_count: number,
    choices: {[p: string]: string},
}
