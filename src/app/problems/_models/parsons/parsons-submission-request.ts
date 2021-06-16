export interface ParsonsSubmissionRequest {
    title: string,
    difficulty: string,
    course: number,
    event: number,
    text: string,
    category: number,
    variables: JSON[],
    junit_template: string,
    lines: string[],
    additional_file_name: string,
}
