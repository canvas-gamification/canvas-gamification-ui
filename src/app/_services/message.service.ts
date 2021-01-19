import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor() {
  }

  messages: string[] = [];
  successMessages: string[] = [];
  add(message: string) {
    this.messages.push(message);
  }
  addSuccess(message: string) {
    this.successMessages.push(message);
  }

  clear() {
    this.messages = [];
    this.successMessages = [];
  }
}
