export type LeaderboardElement = {
    rank?: number;
    name: string;
    token: number;
    member_names?: string[];
}

export type LeaderBoardPageElement = {
    eventId: number;
    name: string; //course name or challenge name
}
