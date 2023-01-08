export interface CourseEvent {
    id: number
    name: string
    type: string
    challenge_type?: string
    challenge_type_value?: number
    count_for_tokens: boolean
    max_team_size: number
    start_date: Date
    end_date: Date
    course: number
    is_allowed_to_open?: boolean
    has_edit_permission?: boolean
    is_open?: boolean
    is_exam?: boolean
    total_event_grade?: number
    is_not_available_yet: boolean
    is_closed: boolean
    featured: boolean
    // calculate_score?: number
}
