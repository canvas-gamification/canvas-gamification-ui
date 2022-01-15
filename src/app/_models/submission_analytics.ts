import {User} from "@app/_models/user";
import {UQJ} from "@app/_models/uqj";
import {Question} from "@app/_models/question";
import {CourseEvent} from "@app/_models/course_event";

export interface SubmissionAnalytics {
    id: number;
    user_id: User;
    first_name: string;
    last_name : string;
    uqj: UQJ;
    submission: any;
    question: Question;
    event: CourseEvent;
    ans_file : JSON;
    ans: string;
    num_attempts: number;
    is_correct: boolean;
    time_spent: number;
    lines : number;
    blank_lines : number;
    comment_lines : number;
    import_lines : number;
    cc : number;
    method : number;
    operator : number;
    operand : number;
    unique_operator : number;
    unique_operand : number;
    vocab : number;
    size : number;
    vol : number;
    difficulty : number;
    effort : number;
    error : number;
    test_time : number;

}
