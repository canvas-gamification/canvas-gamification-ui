import {Action} from './action';

export interface UserAction {
  pk: number;
  actions: Action[];
}
