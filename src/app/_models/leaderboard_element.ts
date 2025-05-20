export type LeaderboardElement = {
    rank?: number;
    name: string;
    token: number;
    member_names?: string[];
    team_id?: number;
    course_reg_id?: number;
}

export type LeaderboardPageElement = {
    name: string;
    eventId: number;
}

export type LeaderboardResult = {
    board: LeaderboardElement[]
    missing: boolean
}
