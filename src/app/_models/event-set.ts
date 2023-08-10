import {CourseEvent} from "@app/_models/course_event"

export interface EventSet {
    id: number
    name: string
    tokens: number
    events: CourseEvent[] //? do i need this as CourseEvent or numbers?
}
