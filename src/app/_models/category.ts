import {UserStats} from "@app/_models/user_difficulty_stats"

export interface Category {
    pk: number;
    name: string;
    description: string;
    parent: number;
    question_count: number;
    average_success: number;
    next_category_ids: number[];
    full_name: string;
    average_success_per_difficulty: UserStats[]
}

export interface NestedCategories {
    category: Category;
    children: NestedCategories[]
}
