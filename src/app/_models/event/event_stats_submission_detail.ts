export type EventStatsSubmissionDetail = {
    name: string
    status: string
    grade: number
    answer_files: { [key: string]: string }
    passed_results: { name: string; message: string }[]
    failed_results: { name: string; message: string }[]
    decoded_stderr: string
}[]
