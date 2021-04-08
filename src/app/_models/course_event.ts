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

export const EVENT_TYPES = {
    ASSIGNMENT: {
        name: 'Assignment',
        buttonText: 'Complete Assignment',
        value: 'ASSIGNMENT'
    },
    EXAM: {
        name: 'Exam',
        buttonText: 'Take Exam',
        value: 'EXAM'
    },
    PRACTICE: {
        name: 'Practice',
        buttonText: 'Start Practice',
        value: 'PRACTICE'
    },
};
