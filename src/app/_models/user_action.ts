import { Action } from "./action";

export interface UserAction {
  pk: number;
  recentActions: Action[];
}
