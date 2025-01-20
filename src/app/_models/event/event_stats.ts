import {EventStatsSubmissionDetail} from "@app/_models/event/event_stats_submission_detail"

export type EventStats = {
    answers: Record<string, number>
    question: {
        title: string
        text: string
    }
    error_messages: Record<string, number>
    status_messages: Record<string, number>
    submissions: Record<string, number>
    submission_details: EventStatsSubmissionDetail
    has_variables: boolean
    total_submissions
    num_students_attempted: number
}[]
