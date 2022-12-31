export type EventStats = {
    answers: Record<string, number>
    question: {
        title: string
    }
    error_messages: Record<string, number>
    status_messages: Record<string, number>
    submissions: Record<string, number>
}[]
