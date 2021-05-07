export interface CourseEvent {
    id?: number;
    name: string;
    type: string;
    count_for_tokens: boolean;
    start_date: Date;
    end_date: Date;
    course: number;
    is_allowed_to_open?: boolean;
    has_edit_permission?: boolean;
    is_open?: boolean;
    is_exam?: boolean;
    total_event_grade?: number;
}
