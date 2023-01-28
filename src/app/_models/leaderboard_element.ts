export type LeaderboardElement = {
    rank?: number;
    name: string;
    token: number;
    member_names?: string[];
    course_reg_id?: number;
}

export type LeaderboardPageElement = {
    name: string;
    eventId: number;
}
