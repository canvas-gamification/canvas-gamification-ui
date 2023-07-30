export type EventStats = {
    answers: Record<string, number>
    question: {
        title: string
        text: string
    }
    error_messages: Record<string, number>
    status_messages: Record<string, number>
    submissions: Record<string, number>
    has_variables: boolean
    total_submissions
}[]
