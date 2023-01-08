import {CourseEvent} from '@app/_models/course_event'
import {Category} from "@app/_models/category"

export interface Question {
    id: number;
    title: string;
    text: string;
    max_submission_allowed: number;
    author: number;
    category: number;
    category_obj: Category;
    category_name: string;
    difficulty: string;
    is_verified: boolean;
    time_created: Date;
    time_modified: Date;
    token_value: number;
    success_rate: number;
    type_name: string;
    event: number;
    event_obj: CourseEvent;
    is_sample: boolean;
    parent_category_name: string;
    course_name: string;
    author_name: string;
    choices: { [index: string]: string };
    variables: [];
    answer: string;
    junit_template: string;
    input_files: InputFiles,
    status: string;
    is_open: boolean;
    is_exam: boolean;
    is_exam_and_open: boolean;
    visible_distractor_count: number;
    is_checkbox: boolean;
    is_author: boolean;
    is_practice: boolean;
}

export interface InputFiles extends Array<{
    name: string,
    compile: boolean,
    lines?: string[],
    template?: string,
}> {
}

export interface QuestionCount {
    name: string;
    count: number;
    count_per_difficulty: { count: number; difficulty: string; }[];
}
