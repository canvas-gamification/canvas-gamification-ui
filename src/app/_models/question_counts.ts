export interface QuestionCount{
    name: string;
    count: number;
    count_per_difficulty: DifficultyCount[];
}
interface DifficultyCount{
    count: number;
    difficulty: string;
}
