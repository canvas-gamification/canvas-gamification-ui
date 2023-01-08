import {CourseEvent} from "@app/_models/index"

export interface Team {
    id: number
    time_created: string
    time_modified: string
    name: string
    is_private: boolean
    who_can_join: number[]
    event: CourseEvent
    course_registrations: number[]
    tokens_received: number
    member_names: string[]
}
