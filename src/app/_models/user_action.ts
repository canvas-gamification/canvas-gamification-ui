export interface UserAction {
  pk: number;
  recentActions: {
    description: String;
    token_change: number;
    status: String;
    time_created: Date;
    time_modified: Date;
  }[];
}
